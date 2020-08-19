import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props: any) => {
  const isAuthenticated = !!localStorage.getItem('proffy-token');
  return isAuthenticated ? <Route {...props} /> : <Redirect to='/login' />;
};

export default PrivateRoute;
