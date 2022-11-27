import express, { Request, Response, NextFunction, Express } from "express";
import config from "../config";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { Prisma, PrismaClient, User } from "@prisma/client";

export default (app: Express, prisma: PrismaClient) => {
  function createUserJWT(user: User): string {
    return jwt.sign(
      { userId: user.id, email: user.email },
      config.auth.jwt.key,
      { expiresIn: config.auth.jwt.expiration }
    );
  }

  async function getUser(email: string) {
    try {
      return prisma.user.findFirst({ where: { email: email } });
    } catch {
      const error = new Error("Error! Couldn't find User.");
    }
  }

  // user logs in
  app.post("/login", async (req: Request, res: Response) => {
    let { email, password } = req.body;

    const user = await getUser(email);

    if (!user) {
      return res.status(404).send("Can't find User");
    }

    let token;
    token = createUserJWT(user);

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      res.status(200).json({
        success: true,
        data: {
          userId: user.id,
          email: user.email,
          token: token,
        },
      });
    } else {
      res.status(403).send("Invalid Password");
    }
  });

  // create user on signup
  app.post("/signup", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const newUser: Prisma.UserCreateInput = {
      firstName: "",
      lastName: "",
      email,
      password: await hash(password, 12),
    };

    let user = await prisma.user.create({ data: newUser });

    let token;

    token = createUserJWT(user);

    res.status(201).json({
      success: true,
      data: { userId: newUser.id, email: newUser.email, token: token },
    });
  });
};
