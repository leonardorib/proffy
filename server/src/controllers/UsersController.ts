import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcryptjs';

export default class UsersController {
  async create(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body;

    const password_hash = await bcrypt.hash(password, 10);

    // To compare later:
    // bcrypt.compare(password, password_hash);

    const trx = await db.transaction();

    try {
      await trx('users').insert({
        first_name,
        last_name,
        email,
        password_hash,
      });

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      console.log('Error inserting data on database');
      return res.status(400).json({
        error: 'Unexpected error while creating new user',
      });
    }

    return res.status(200).json({ message: 'User created' });
  }
}
