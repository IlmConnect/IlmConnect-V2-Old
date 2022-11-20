import express, { Express, Request, Response } from 'express';
import config from "../config"
import jwt from "jsonwebtoken"
const bcrypt = require('bcrypt');


const app = express()
app.use(express.json())

// function to validate token between client and server


app.get('/accessResource', (req, res)=>{  
    const token = req.headers.authorization.split(' ')[1]; 
    if(!token)
    {
        res.status(200).json({success:false, message: "Error! Token was not provided."});
    }
    const decodedToken = jwt.verify(token,process.env.POSTMARK_API_KEY );
    res.status(200).json({success:true, data:{
        userId:decodedToken.userId,
        email:decodedToken.email
    });   
})