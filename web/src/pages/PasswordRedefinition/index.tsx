import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import backgroundImg from '../../assets/images/success-background-rotated.svg';
import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import api from '../../services/api';

import './styles.css';
import LoginInput from '../../components/LoginInput';

function PasswordRedefinition() {
  function handleRedefinition() {}

  return (
    <div id='password-redefinition' className='container'>
      <div
        className='purple-container'
        style={{ backgroundImage: 'url(' + backgroundImg + ')' }}
      >
        <div id='logo-container'>
          <img src={logoImg} alt='Proffy'></img>
          <p>Sua plataforma de estudos online</p>
        </div>
      </div>

      <main>
        <div className='top-bar-container'>
          <Link to='/login'>
            <img src={backIcon} alt='Voltar' />
          </Link>
        </div>
        <form id='form-redefinition' onSubmit={handleRedefinition}>
          <fieldset>
            <legend>
              <h1>Eita, esqueceu sua senha?</h1>
              <p>Não esquenta, vamos dar um jeito nisso.</p>
            </legend>
            <LoginInput
              className='redefinition-input'
              type='text'
              name='email'
              placeholder='Digite o seu e-mail'
            />
          </fieldset>

          <button id='submit-redefinition' type='submit'>
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}

export default PasswordRedefinition;
