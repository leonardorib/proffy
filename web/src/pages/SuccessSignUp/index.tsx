import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import backgroundImg from '../../assets/images/success-background.svg';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import api from '../../services/api';

import './styles.css';

function SuccessSignUp() {
  return (
    <div
      id='success-sign-up'
      style={{ backgroundImage: 'url(' + backgroundImg + ')' }}
    >
      <div id='message-container'>
        <img src={successIcon} alt='Sucesso'></img>
        <h1>Cadastro concluído</h1>
        <p>Agora você faz parte da plataforma da Proffy.</p>
        <p>Tenha uma ótima experiência.</p>
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <button type='button'>Fazer login</button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessSignUp;
