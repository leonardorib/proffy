import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import backgroundImg from '../../assets/images/success-background.svg';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import api from '../../services/api';

import './styles.css';

function SuccessProfileSaved() {
  return (
    <div
      id='success-profile-saved'
      style={{ backgroundImage: 'url(' + backgroundImg + ')' }}
    >
      <div id='message-container'>
        <img src={successIcon} alt='Sucesso'></img>
        <h1>Cadastro salvo</h1>
        <p>Tudo certo, seu cadastro está na nossa lista de professores.</p>
        <p>Agora é só ficar de olho no seu WhatsApp.</p>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <button type='button'>Ir para Home</button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessProfileSaved;
