import React, { useState, FormEvent } from 'react';

import backgroundImg from '../../assets/images/success-background-rotated.svg';
import logoImg from '../../assets/images/logo.svg';

import api from '../../services/api';

import './styles.css';
import LoginInput from '../../components/LoginInput';

function SingUp() {
  function handleLogin() {}

  function goToSignUp() {}

  return (
    <div id='page-sign-up' className='container'>
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
        <form id='form-sign-up' onSubmit={handleLogin}>
          <fieldset>
            <legend>
              <h1>Cadastro</h1>
              <p>Preencha os dados abaixo para começar</p>
            </legend>
            <LoginInput
              className='sign-up-input'
              type='text'
              name='firstName'
              placeholder='Nome'
            />
            <LoginInput
              className='sign-up-input'
              type='text'
              name='lastName'
              placeholder='Sobrenome'
            />
            <LoginInput
              className='sign-up-input'
              type='text'
              name='email'
              placeholder='E-mail'
            />
            <LoginInput
              className='sign-up-input'
              type='password'
              name='password'
              placeholder='Senha'
            />
          </fieldset>

          <button id='submit-sign-up' type='submit'>
            Concluir cadastro
          </button>
        </form>
      </main>
    </div>
  );
}

export default SingUp;
