import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

const PrivateRoute = (props: any) => {
  // check if user is logged in
  
  const isLoggedIn = Boolean(localStorage.getItem('_id'));
// console.log(localStorage.getItem('_id'));
  if (!isLoggedIn) 
    return <Redirect to="/login" />;
  else 
     return <Route {...props} />;
};

export default PrivateRoute;
