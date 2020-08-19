import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import backgroundImg from '../../assets/images/success-background.svg';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import api from '../../services/api';

import './styles.css';

function PageNotFound() {
  return (
    <div
      id='not-found'
      style={{ backgroundImage: 'url(' + backgroundImg + ')' }}
    >
      <div id='message-container'>
        <h1>Ops... Algo deu errado!</h1>
        <p>Não conseguimos encontrar a página que você está procurando.</p>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <button type='button'>Voltar</button>
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
