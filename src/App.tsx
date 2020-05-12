import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/routing/login/Login';
import Header from './components/Header/Header';

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;