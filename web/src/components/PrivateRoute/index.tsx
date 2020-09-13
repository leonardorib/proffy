import React from 'react';
import checksIfTokenIsValid from '../../services/checkIfTokenIsValid';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props: any) => {
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
