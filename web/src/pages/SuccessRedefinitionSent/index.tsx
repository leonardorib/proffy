import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import backgroundImg from '../../assets/images/success-background.svg';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import api from '../../services/api';

import './styles.css';

function SuccessRedefinitionSent() {
  return (
    <div
      id='success-redefinition-sent'
      style={{ backgroundImage: 'url(' + backgroundImg + ')' }}
    >
      <div id='message-container'>
        <img src={successIcon} alt='Sucesso'></img>
        <h1>Redefinição enviada!</h1>
        <p>
          Boa, agora é só checar o e-mail que enviamos para você redefinir sua
          senha e aproveitar os estudos.
        </p>
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <button type='button'>Voltar ao login</button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessRedefinitionSent;
