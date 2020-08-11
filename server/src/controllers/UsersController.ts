import { Request, Response } from 'express';
import db from '../database/connection';

export default class UsersController {
  async create(req: Request, res: Response) {
    return res.status(200).json({ message: 'Test' });
  }
}
