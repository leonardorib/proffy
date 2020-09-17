import { Request as ExpressRequest, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface Request extends ExpressRequest {
  userId: number;
}

interface IScheduleItem {
  week_day: number;
  from: string;
  to: string;
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
    const {
      first_name,
      last_name,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = req.body;

    const trx = await db.transaction();

    try {
      await trx('users')
        .where({ id: (<any>req).userId })
        .update({
          first_name,
          last_name,
          whatsapp,
          bio,
        });

      // Getting class id
      const { id: classId } = await trx('classes')
        .select('id')
        .first()
        .where({ user_id: (<any>req).userId });

      console.log(classId);

      // Deleting schedule
      await trx('class_schedule').where('class_id', classId).del();

      // Deleting current classes
      await trx('classes')
        .where('user_id', (<any>req).userId)
        .del();

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id: (<any>req).userId,
      });

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: IScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return res.status(200).json({ message: 'sucess' });
    } catch (err) {
      await trx.rollback();

      return res.status(400).json({
        error: 'Unexpected error while creating new class',
      });
    }
  }
}
