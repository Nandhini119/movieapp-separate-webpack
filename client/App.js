import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
//import {browserHistory,Router,Route} from 'react-router';
import Login from'./components/login/Login.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Signup from './components/signup/Signup.js';



class App extends Component {
  render() {
    return (
     <Router>     
     <div>
     <Route exact path = '/' component = {Login}/>
     <Route path = '/home' component = {Home}/>
     <Route path = '/signup' component = {Signup}/>
     </div>
      </Router>
    );
  }
}


export default App;
