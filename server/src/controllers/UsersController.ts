import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

export default class UsersController {
  async create(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body;

    const schema = Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(5),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await db('users')
      .select('id', 'email')
      .first()
      .where({ email: email });

    if (user) {
      return res.status(400).json({ error: 'Email already in use' });
    }

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
      return res.status(500).json({
        error: 'Unexpected error while creating new user',
      });
    }

    return res.status(200).json({ message: 'User created' });
  }
}
