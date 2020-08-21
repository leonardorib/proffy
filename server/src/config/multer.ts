import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

import { Request, Response } from 'express';

const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file: any, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          // @ts-ignore
          cb(err);
        }

        file.key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),

  // S3 instance automatically detects env variables related to the authentication.
  // No need to provide
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'proffy-files',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req: Request, file: Express.Multer.File, cb: any) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          // @ts-ignore
          cb(err);
        }

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
};

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes['s3'],
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
};
