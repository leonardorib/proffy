import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SuccessSignUp from './pages/SuccessSignUp';
import SuccessProfileSaved from './pages/SuccessProfileSaved';
import SuccessRedefinitionSent from './pages/SuccessRedefinitionSent';
import PasswordRedefinition from './pages/PasswordRedefinition';

function Routes() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Landing} />
      <Route path='/login' component={Login} />
      <Route path='/password-redefinition' component={PasswordRedefinition} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/success-sign-up' component={SuccessSignUp} />
      <Route path='/success-profile-saved' component={SuccessProfileSaved} />
      <Route
        path='/success-redefinition-sent'
        component={SuccessRedefinitionSent}
      />
      <Route path='/study' component={TeacherList} />
      <Route path='/give-classes' component={TeacherForm} />
    </BrowserRouter>
  );
}

export default Routes;
