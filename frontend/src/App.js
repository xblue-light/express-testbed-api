import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ViolationsIndex from './components/ViolationsTable/ViolationsIndex';
//import EditList from './components/EditList';
import EditViolation from './components/ViolationsTable/EditViolation';
import NewList from './components/NewList';
import './App.css';

// Index
import Index from './components/Index';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 5000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
} else {
  console.log("Local storage is empty, no token found!");
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
          <div>
            <div className="container-fluid nav-container">
              <div className="container">
                <Navbar />
              </div>
            </div>
            <Route exact path="/" component={ Home } />
            <div className="container-fluid">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="index" component={Index} />
              <Route exact path="/violations" component={ ViolationsIndex } />
              <Route exact path="/create" component={ NewList } />
              <Route path='/edit/:id' component={ EditViolation } />
            </div>
          </div>
        </Router>
        </Provider>
    );
  }
}

export default App;