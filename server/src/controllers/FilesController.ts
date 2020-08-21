import { Request, Response } from 'express';
import db from '../database/connection';

export default class FilesController {
  async create(req: Request, res: Response) {
    console.log(req.file);
    return res.status(201).json({ message: 'teste' });
  }
}
