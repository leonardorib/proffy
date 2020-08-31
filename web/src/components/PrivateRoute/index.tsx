import React from 'react';
import api from '../../services/api';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props: any) => {
  async function checksIfTokenIsValid() {
    api
      .get('authcheck', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('proffy-token')}`,
        },
      })
      .then((res) => {
        console.log('caiu no then');
        return true;
      })
      .catch((err) => {
        console.log('caiu no catch');
        return false;
      });
  }

  const isAuthenticated = !!localStorage.getItem('proffy-token');

  const tokenIsValid = checksIfTokenIsValid();

  console.log(tokenIsValid);
  return isAuthenticated && tokenIsValid ? (
    <Route {...props} />
  ) : (
    <Redirect to='/login' />
  );
};

export default PrivateRoute;
