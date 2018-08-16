import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';

import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../redux/actions/authActions';
import { clearCurrentProfile } from '../redux/actions/profileActions';
import store from '../redux/store/store';

import PrivateRoute from './common/PrivateRoute';

import Register from './Signup/Register';
import LoginPage from './Login/LoginPage';
import Dashboard from './Dashboard/Dashboard';

// history
export const history = createHistory();

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/';
  }
}

/*
  / [login]
  /dashboard [it means profile page]
    /profile
    /portfolio
    /blog
*/

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
