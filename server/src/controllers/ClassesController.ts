import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface IScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(req: Request, res: Response) {
    console.log('\n-------- LIST CLASSES REQUEST RECEIVED --------');
    const filters = req.query;

    console.log('Req query params: \n', req.query);

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: 'Missing filters to search classes',
      });
    }

    const timeInMinutes = convertHourToMinutes(time);
    console.log('\nTime in minutes: ', timeInMinutes, '\n');

    console.log('Searching for classes... \n');
    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select([
        'classes.*',
        'users.id as user_id',
        'users.first_name',
        'users.last_name',
        'users.email',
        'users.whatsapp',
        'users.bio',
        'users.avatar',
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

    console.log('Classes found: \n', classes, '\n');
    console.log('Sending response');
    console.log('--------------------------------------------\n\n');
    return res.json(classes);
  }

  async create(req: Request, res: Response) {
    const { avatar, whatsapp, bio, subject, cost, schedule } = req.body;

    const trx = await db.transaction();

    try {
      await trx('users')
        .where({ id: (<any>req).userId })
        .update({
          avatar,
          whatsapp,
          bio,
        });

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

      return res.status(201).json({ message: 'sucess' });
    } catch (err) {
      await trx.rollback();

      return res.status(400).json({
        error: 'Unexpected error while creating new class',
      });
    }
  }
}
