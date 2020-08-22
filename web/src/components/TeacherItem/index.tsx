import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';
import './styles.css';

import ScheduleDay from '../ScheduleDay';

export interface Teacher {
  id: number;
  avatar_url: string;
  bio: string;
  cost: number;
  first_name: string;
  last_name: string;
  subject: string;
  whatsapp: string;
  schedule: any;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id,
    });
  }

  // Defining the array to store the schedule
  const schedule: {
    available: boolean;
    from: any;
    to: any;
  }[] = [];

  // Converting the schedule array returned by the api into an array more convenient to use
  for (let i = 0; i < 7; i++) {
    schedule.push({ available: false, from: '', to: '' });
    teacher.schedule.forEach(
      (teacherSchedule: { week_day: number; from: any; to: any }) => {
        if (i === teacherSchedule.week_day) {
          schedule[i] = {
            available: true,
            from: teacherSchedule.from / 60,
            to: teacherSchedule.to / 60,
          };
        }
      }
    );
  }

  // Week days in an array for conviniency
  const weekDays = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  return (
    <article className='teacher-item'>
      <header>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.first_name} ${teacher.last_name}`}
        />
        <div>
          <strong>{`${teacher.first_name} ${teacher.last_name}`}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <main>
        <p>{teacher.bio}</p>
        <div className='schedule-container'>
          {/* Iterates trough weekDays, to create the schedule in screen */}
          {weekDays.map((dayName, index) => {
            return (
              <ScheduleDay
                available={schedule[index].available}
                day={dayName}
                from={schedule[index].from}
                to={schedule[index].to}
              />
            );
          })}
        </div>
      </main>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={whatsappIcon} alt='Whatsapp' />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
