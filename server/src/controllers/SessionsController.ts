import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../config/auth';
import * as Yup from 'yup';

export default class SessionsController {
  async create(req: Request, res: Response) {
    console.log('Login request received\n');
    console.log(req.body);
    const { email, password } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      console.log('Validation fails');
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await db('users')
      .select(
        'id',
        'email',
        'password_hash',
        'first_name',
        'last_name',
        'is_teacher',
        'avatar_id',
        'whatsapp',
        'bio'
      )
      .first()
      .where({ email: email });

    if (!user) {
      console.log('User does not exist');
      return res.status(400).json({ error: 'User does not exist' });
    }

    if (!(await bcrypt.compare(password, user.password_hash))) {
      console.log('Incorrect password');
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Original jwt.sign: jwt.sign(payload, secretOrPrivateKey, [options, callback])
    // Promisifying:
    const jwtSignPromisified = promisify(jwt.sign);

    const token = await jwtSignPromisified(
      {
        id: user.id,
        email: user.email,
        whatsapp: user.whatsapp,
        bio: user.bio,
        avatar_id: user.avatar_id,
        is_teacher: user.is_teacher,
        first_name: user.first_name,
        last_name: user.last_name,
      }, // Payload
      authConfig.secret, // Secret
      // Options object
      //Ignoring error: Expected 2 arguments, but got 3. The third argument is optinonal.
      //@ts-ignore
      {
        expiresIn: authConfig.expiresIn,
      }
    );
    console.log('User logged in\n');
    console.log(token);
    return res.status(201).json({ token });
  }
}
