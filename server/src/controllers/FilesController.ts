import { Request as ExpressResquest, Response } from 'express';
import db from '../database/connection';

interface IFile extends Express.Multer.File {
  key: string;
  location: string;
}

interface Request extends ExpressResquest {
  file: IFile;
  userId: number;
}

export default class FilesController {
  async create(req: Request, res: Response, file: Express.Multer.File) {
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

    const avatar = await db('files')
      .select('id', 'url', 'size', 'key', 'user_id')
      .first()
      .where({ url: req.file.location, user_id: req.userId });

    try {
      await db('users').where({ id: req.userId }).update({
        avatar_id: avatar.id,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Error updating user avatar', errorData: err });
    }

    return res.status(200).json(avatar);
  }
}
