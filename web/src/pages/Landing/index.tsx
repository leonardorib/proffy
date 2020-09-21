import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LogoutButton from '../../components/LogoutButton';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import api from '../../services/api';

import './styles.css';
import { useUser } from '../../hooks/user';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  const { userData } = useUser();

  // 1st arg: function to be executed
  // 2nd arg: array with infos that trigger the function when modified
  // 2nd arg: when empty, the function is executed whenever the page is loaded

  useEffect(() => {
    api
      .get('connections', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('proffy-token')}`,
        },
      })
      .then((res) => {
        const { total } = res.data;

        setTotalConnections(total);
      });
  }, []);

  return (
    <div id='landing-page-container'>
      <header>
        <div id='user-data'>
          {userData.avatar_url && (
            <img
              id='landing-avatar'
              src={userData.avatar_url}
              alt={userData.first_name}
            />
          )}
          <span>{userData.first_name + ' ' + userData.last_name}</span>
        </div>
        <LogoutButton />
      </header>
      <div id='page-landing'>
        <div id='page-landing-content' className='container'>
          <div className='logo-container'>
            <img src={logoImg} alt='Proffy'></img>
            <h2>Sua plataforma de estudos online</h2>
          </div>

          <img
            src={landingImg}
            alt='Plataforma de estudos'
            className='hero-image'
          />

          <div className='buttons-container'>
            <Link to='/study' className='study'>
              <img src={studyIcon} alt='Estudar' />
              Estudar
            </Link>
            <Link
              to={userData.is_teacher ? '/update-profile' : '/give-classes'}
              className='give-classes'
            >
              <img src={giveClassesIcon} alt='Dar aulas' />
              {userData.is_teacher ? 'Editar perfil' : 'Dar aulas'}
            </Link>
          </div>

          <span className='total-connections'>
            Total de {totalConnections} conexões já realizadas{' '}
            <img src={purpleHeartIcon} alt='Coração roxo' />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Landing;
