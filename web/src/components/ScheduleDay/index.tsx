import React from 'react';

import './styles.css';

import { Redirect } from 'react-router-dom';

interface ScheduleDayProps {
  day: string;
  from: string;
  to: string;
  available: boolean;
}

const ScheduleDay: React.FC<ScheduleDayProps> = ({
  day,
  from,
  to,
  available,
}) => {
  return (
    <div className='schedule-day' style={available ? {} : { opacity: 0.3 }}>
      <div>{day}</div>

      <div className='schedule-time'>
        {available ? `${from}h - ${to}h` : ''}
      </div>
    </div>
  );
};

export default ScheduleDay;
