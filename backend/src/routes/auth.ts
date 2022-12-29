import express, { Request, Response, NextFunction, Express } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import { Prisma, PrismaClient, User } from '@prisma/client';

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
			const error = new Error('Error! Couldn\'t find User.');
		}
	}

	// user logs in
	app.post('/login', async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const user = await getUser(email);

		if (!user) {
			return res.status(404).send('Can\'t find User');
		}

		const token = createUserJWT(user);

		// If invalid password, throw error
		if (!await bcrypt.compare(password, user.password)) {
			return res.status(400).send('Invalid Password');
		}

		res.status(200).json({
			user: { ... user, password: undefined },
			token,
		});
	});

	// create user on signup
	app.post('/signup', async (req: Request, res: Response) => {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).send('Bad Request');
		}

		// TODO: verify email/password


		const newUser: Prisma.UserCreateInput = {
			firstName: '',
			lastName: '',
			email,
			password: await hash(password, 12),
		};

		const user = await prisma.user.create({ data: newUser });

		const token = createUserJWT(user);
		
		// TODO: figure out a way to always block password from being sent
		res.status(201).json({ 
			user: { ...user, password: undefined }, 
			token 
		});
	});
};
