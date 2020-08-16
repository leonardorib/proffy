import React, { useState, FormEvent } from 'react';

import backgroundImg from '../../assets/images/success-background-rotated.svg';
import logoImg from '../../assets/images/logo.svg';

import api from '../../services/api';

import './styles.css';
import LoginInput from '../../components/LoginInput';

function Login() {
  function handleLogin() {}

  return (
    <div id='page-login' className='container'>
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
        <form id='login' onSubmit={handleLogin}>
          <h1>Fazer login</h1>
          <LoginInput type='text' name='email' placeholder='E-mail' />
          <LoginInput type='text' name='password' placeholder='Senha' />
          <button type='submit'>Entrar</button>
        </form>
      </main>
    </div>
  );
}

export default Login;
