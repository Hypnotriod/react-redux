import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/routing/login/Login';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/routing/landing/Landing';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from './store/Store';
import { userRefreshTokenAction } from './store/user/UserCredentialsActions';

const App: React.FunctionComponent = () => {

  const userState = useSelector((state: ApplicationState) => state.userCredentials);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userState.refreshToken && !userState.login) {
      dispatch(userRefreshTokenAction(userState.refreshToken));
    }
  }, [userState, dispatch]);

  return (
    <BrowserRouter basename='/react-redux'>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
