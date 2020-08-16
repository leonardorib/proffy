import React, { useState, FormEvent } from 'react';

import backgroundImg from '../../assets/images/success-background-rotated.svg';
import logoImg from '../../assets/images/logo.svg';

import api from '../../services/api';

import './styles.css';
import LoginInput from '../../components/LoginInput';

function Login() {
  function handleLogin() {}

  function goToSignUp() {}

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
        <form id='form-login' onSubmit={handleLogin}>
          <fieldset>
            <legend>
              <h1>Fazer login</h1>
              <button type='button' onClick={goToSignUp}>
                Criar uma conta
              </button>
            </legend>
            <LoginInput
              className='login-input'
              type='text'
              name='email'
              placeholder='E-mail'
            />
            <LoginInput
              className='login-input'
              type='password'
              name='password'
              placeholder='Senha'
            />
          </fieldset>

          <div id='password-container'>
            <div id='remember-div'>
              <input type='checkbox' id='remeber-box' name='remember' />
              <label htmlFor='remeber-box'> Lembrar-me</label>
            </div>
            <button type='button' onClick={goToSignUp}>
              Esqueci minha senha
            </button>
          </div>

          <button id='submit-login' type='submit'>
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
