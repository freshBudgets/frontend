import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './Public/App.css';
import { isAuthenticated } from './Functions/UserManagement';
import AuthenticatedRoute from './AuthenticatedRoute';
import NotAuthenticatedRoute from './NotAuthenticatedRoute';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

class App extends Component {
  render() {
    return (
      <div>
        Above router
        <BrowserRouter>
          <div>
            <Route exact path="/" component={ Home } />

            <NotAuthenticatedRoute authed={ isAuthenticated() } path="/login" component={ Login } />
            <AuthenticatedRoute authed={ isAuthenticated() } path='/dashboard' component={ Dashboard } />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
