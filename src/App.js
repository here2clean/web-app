import React, { Component } from 'react';
import logo from './tenor.gif';
import './App.css';
import 'antd/dist/antd.css';
import Login from './Login.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Here2Clean !
          </p>
          <Login/>
        </header>

      </div>
    );
  }
}

export default App;
