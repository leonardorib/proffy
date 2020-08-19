import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import backgroundImg from '../../assets/images/success-background-rotated.svg';
import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import api from '../../services/api';

import './styles.css';
import LoginInput from '../../components/LoginInput';

function SingUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  function handleSignUp(e: FormEvent) {
    e.preventDefault();

    api
      .post('users', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      })
      .then(() => {
        history.push('/success-sign-up');
      })
      .catch(() => {
        alert('Erro no cadastro');
      });
  }

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
        <div className='top-bar-container'>
          <Link to='/login'>
            <img src={backIcon} alt='Voltar' />
          </Link>
        </div>
        <form id='form-sign-up' onSubmit={handleSignUp}>
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
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <LoginInput
              className='sign-up-input'
              type='text'
              name='lastName'
              placeholder='Sobrenome'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <LoginInput
              className='sign-up-input'
              type='text'
              name='email'
              placeholder='E-mail'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <LoginInput
              className='sign-up-input'
              type='password'
              name='password'
              placeholder='Senha'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
