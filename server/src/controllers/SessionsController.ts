import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../config/auth';
import * as Yup from 'yup';

export default class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await db('users')
      .select('id', 'email', 'first_name', 'last_name')
      .first()
      .where({ email: email });

    // Original jwt.sign: jwt.sign(payload, secretOrPrivateKey, [options, callback])
    // Promisifying:
    const jwtSignPromisified = promisify(jwt.sign);

    const token = await jwtSignPromisified(
      { id: user.id, email: user.email }, // Payload
      authConfig.secret, // Secret
      // Options object
      //Ignoring error: Expected 2 arguments, but got 3. The third argument is optinonal.
      //@ts-ignore
      {
        expiresIn: authConfig.expiresIn,
      }
    );

    return res.status(201).json({ token });
  }
}
