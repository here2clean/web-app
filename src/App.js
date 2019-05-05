import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import LoginContainer from './components/Login/LoginContainer';
import HomeContainer from './components/Home/HomeContainer'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//FFB473
class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Route exact path='/' component={LoginContainer} />
            <Route path='/home' component={HomeContainer} />
          </div>
        </Router>
    );
  }
}

export default App;
