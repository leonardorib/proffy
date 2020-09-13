import { Request as ExpressRequest, Response } from 'express';
import db from '../database/connection';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../config/auth';

interface Request extends ExpressRequest {
  userId: number;
}

export default class TokenController {
  // Generates new token
  async create(req: Request, res: Response) {
    const { userId } = req;

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
      .where({ id: userId });

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

    console.log(token);
    return res.status(200).json({ token });
  }
}
