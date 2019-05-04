import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Login from './Login.js';
//FFB473
class App extends Component {
  render() {
    return (
      <div className="App">
            <Login/>
      </div>
    );
  }
}

export default App;
