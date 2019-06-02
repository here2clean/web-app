import React, { Suspense } from 'react';
import loadable from 'react-loadable';
import './App.css';
import 'antd/dist/antd.css';
import LoginContainer from './components/Login/LoginContainer';
import HomeContainer from './components/Home/HomeContainer'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Register from "./components/Register/Register";
import Orders from "./components/Orders/Orders";
import AssociationsContainer from "./components/Associations/AssociationsContainer";
import EventsContainer from "./components/Events/EventsContainer";
import Conditions from "./components/Register/Conditions";
import Loading from "./components/Loading";

const Sandbox = loadable({loader: () => import('./components/Sandbox'), loading: Loading, delay: 10});

//FFB473
const UserContext = React.createContext(null);

class App extends React.Component {

    render() {
    return (
        <Router>
            <Suspense fallback={<div>Loading</div>}>
              <div className="App">
                    <Route exact path='/' component={LoginContainer} />
                    <Route path='/home' component={() => <HomeContainer selected={['home']}/>} />
                    <Route path='/register' component={() => <Register firebase={this.props.firebase}/>} />
                    <Route path='/orders' component={() => <Orders selected={['orders']}/>} />
                    <Route path='/associations' component={() => <AssociationsContainer selected={['associations']}/>} />
                    <Route path='/events' component={() => <EventsContainer selected={['events']}/>} />
                    <Route exact path='/conditions' component={Conditions} />
                    <Route exact path='/sandbox' component={Sandbox}/>
              </div>
            </Suspense>
        </Router>
    );
  }
}

export default App;
