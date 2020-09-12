import { Request as ExpressRequest, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

interface Request extends ExpressRequest {
  userId: number;
}

export default class ProfilesController {
  // Index method - Returns an array - Useful in the future, if we want to allow multiple classes from the same teacher
  async index(req: Request, res: Response) {
    const { userId } = req;

    console.log('Searching for classes... \n');
    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`');
      })
      .where('classes.user_id', '=', userId)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select([
        'classes.*',
        'users.id as user_id',
        'users.first_name',
        'users.last_name',
        'users.email',
        'users.whatsapp',
        'users.bio',
        'users.avatar_id',
      ]);

    // Creates an array with the ids of the classes found
    const classesIds = classes.map(function (someClass) {
      return someClass.id;
    });

    // Gets schedules from all classes found
    const schedules = await db
      .select('class_id', 'week_day', 'from', 'to')
      .from('class_schedule')
      .whereIn('class_id', classesIds);

    // For each class, adds a property "schedule" (array)
    // Example: someClass.schedule = [{week_day: 1, from: 8, to: 16}, {week_day: 4, from: 7, to: 16}]
    classes.forEach((someClass) => {
      someClass.schedule = [];
      schedules.forEach((schedule) => {
        if (someClass.id === schedule.class_id) {
          someClass.schedule.push({
            week_day: schedule.week_day,
            from: schedule.from,
            to: schedule.to,
          });
        }
      });
    });

    for (const someClass of classes) {
      if (someClass.avatar_id) {
        const avatar = await db('files')
          .select('id', 'url', 'size', 'key', 'user_id')
          .first()
          .where({ id: someClass.avatar_id });

        someClass.avatar_url = avatar.url;
      } else {
        someClass.avatar_url = null;
      }
    }

    return res.json(classes);
  }

  async update(req: Request, res: Response) {
    return res.status(200).json({ message: 'Teste' });
  }
}
