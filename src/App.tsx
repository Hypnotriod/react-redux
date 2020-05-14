import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/routing/login/LoginPage';
import Navbar from './components/navbar/Navbar';
import ProductsPage from './components/routing/products/ProductsPage';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from './store/Store';
import { userRefreshTokenAction } from './store/user/UserCredentialsActions';

/**
 *
 * @author Ilya Pikin
 */

const App: React.FunctionComponent = () => {

  const userCredentials = useSelector((state: ApplicationState) => state.userCredentials);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userCredentials.refreshToken && !userCredentials.login) {
      dispatch(userRefreshTokenAction(userCredentials.refreshToken));
    }
  }, [userCredentials, dispatch]);

  return (
    <BrowserRouter basename='/react-redux'>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={ProductsPage} />
          <Route path='/login' component={LoginPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
