import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SuccessSignUp from './pages/SuccessSignUp';
import SuccessProfileSaved from './pages/SuccessProfileSaved';
import SuccessRedefinitionSent from './pages/SuccessRedefinitionSent';
import PasswordRedefinition from './pages/PasswordRedefinition';
import PageNotFound from './pages/PageNotFound';

import PrivateRoute from './components/PrivateRoute';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path='/' exact component={Landing} />
        <Route path='/login' component={Login} />
        <Route path='/password-redefinition' component={PasswordRedefinition} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/success-sign-up' component={SuccessSignUp} />
        <PrivateRoute
          path='/success-profile-saved'
          component={SuccessProfileSaved}
        />
        <Route
          path='/success-redefinition-sent'
          component={SuccessRedefinitionSent}
        />
        <PrivateRoute path='/study' component={TeacherList} />
        <PrivateRoute path='/give-classes' component={TeacherForm} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
