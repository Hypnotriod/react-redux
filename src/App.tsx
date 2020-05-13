import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/routing/login/Login';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/routing/landing/Landing';
import './App.css';
import { UserState } from './store/user/UserState';
import { useSelector } from 'react-redux';
import { ApplicationState } from './store/Store';

const App: React.FunctionComponent = () => {
  const userState: UserState = useSelector((state: ApplicationState) => state.userState);

  return (
    <BrowserRouter>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={userState.authorizationGranted ? Landing : Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
