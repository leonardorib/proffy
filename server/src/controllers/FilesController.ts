import { Request, Response } from 'express';
import db from '../database/connection';

export default class FilesController {
  async create(req: Request, res: Response, file) {
    console.log(req.file);
    // id size key url
    try {
      console.log(req);
      await db('files').insert({
        size: req.file.size,
        key: req.file.key,
        url: req.file.location,
        user_id: req.userId,
      });
    } catch (err) {
      console.log(`Error inserting file in database:\n ${err}`);
      return res
        .status(500)
        .json({ error: 'Error inserting file in database', errorData: err });
    }
    return res.status(200).json({ message: 'File inserted in database' });
  }
}
