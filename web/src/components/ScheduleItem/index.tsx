import React from 'react';

import './styles.css';

interface ScheduleItemProps {
  day: string;
  from: string;
  to: string;
  available: boolean;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  day,
  from,
  to,
  available,
}) => {
  return (
    <div className='schedule-item' style={available ? {} : { opacity: 0.3 }}>
      <div className='schedule-day'>{day}</div>
      <div className='schedule-time'>
        {available ? `${from}h - ${to}h` : ''}
      </div>
    </div>
  );
};

export default ScheduleItem;
