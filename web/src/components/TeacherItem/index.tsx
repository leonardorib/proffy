import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';
import './styles.css';

import ScheduleItem from '../ScheduleItem';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  first_name: string;
  last_name: string;
  subject: string;
  whatsapp: string;
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

  return (
    <article className='teacher-item'>
      <header>
        <img
          src={teacher.avatar}
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
          <ScheduleItem available={false} day='Domingo' from='8' to='18' />
          <ScheduleItem available={true} day='Segunda' from='8' to='18' />
          <ScheduleItem available={false} day='Terça' from='8' to='18' />
          <ScheduleItem available={true} day='Quarta' from='8' to='18' />
          <ScheduleItem available={false} day='Quinta' from='8' to='18' />
          <ScheduleItem available={true} day='Sexta' from='8' to='18' />
          <ScheduleItem available={false} day='Sábado' from='8' to='18' />
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
