import express, { Express, Request, Response } from 'express';
import config from "../config"
const dotenv = require("dotenv")
import jwt from "jsonwebtoken"
import { User } from "../auth/authUser"

const app = express()
app.use(express.json())
// make jwt function
// bcrypt token

app.post("/login", async (req, res, next) => {
    let { email, password } = req.body;
   
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch {
      const error = new Error("Error! Couldn't find User.");
      return next(error);
    }
    if (!existingUser || existingUser.password != password) {
      const error = Error("Wrong credentials");
      return next(error);
    }


    let token;

    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        config.auth.jwt.key,
        { expiresIn: config.auth.jwt.expiration }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong with token auth.");
      return next(error);
    }
   
    res
      .status(200)
      .json({
        success: true,
        data: {
          userId: existingUser.id,
          email: existingUser.email,
          token: token,
        },
      });
  });

  // creating User
  app.post("/signup", async (req, res, next) => {
    const { name, email, password } = req.body;
    // shouldn't this be imported from my prisma schema?
    const newUser = User({
      name,
      email,
      password,
    });
   
    try {
      await newUser.save();
    } catch {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    let token;
    try {
      token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.POSTMARK_API_KEY,
        { expiresIn: "7d" }
      );
    } catch (err) {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    res
      .status(201)
      .json({
        success: true,
        data: { userId: newUser.id,
            email: newUser.email, token: token },
      });
  });