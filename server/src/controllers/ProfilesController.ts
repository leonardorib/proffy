import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

export default class ProfilesController {
  async index(req: Request, res: Response) {
    return res.status(200).json({ message: 'Teste' });
  }

  async update(req: Request, res: Response) {
    return res.status(200).json({ message: 'Teste' });
  }
}
