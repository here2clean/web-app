import React, { Suspense } from 'react';
import loadable from 'react-loadable';
import './App.css';
import 'antd/dist/antd.css';
import LoginContainer from './components/Login/LoginContainer';
import HomeContainer from './components/Home/HomeContainer'
import {
    BrowserRouter as Router, Redirect,
    Route
} from 'react-router-dom';
import Register from "./components/Register/Register";
import Orders from "./components/Orders/Orders";
import AssociationsContainer from "./components/Associations/AssociationsContainer";
import EventsContainer from "./components/Events/EventsContainer";
import Conditions from "./components/Register/Conditions";
import Loading from "./components/Loading/Loading";
import {UserContext} from "./components/Contexts/UserProvider";

const Sandbox = loadable({loader: () => import('./components/Sandbox'), loading: Loading, delay: 10});

//FFB473


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: true
        };
        this.updateUserContext = this.updateUserContext.bind(this);
    }

    componentDidMount() {
        this.updateUserContext();
    }

    updateUserContext() {
        return (
          <UserContext.Consumer>
              {user => {
                  user !== null ? this.setState({auth: true}) : this.setState({auth: false})
              }}
          </UserContext.Consumer>
        );
    }



    render() {
        const PrivateRoute = ({component: Component, user, ...rest}) => (
            <Route {...rest} render={(props) => (
                this.state.auth
                    ? <Component {...props} />
                    : <Redirect to='/'/>
            )} />
        );
        return (
            <Router>
                <Suspense fallback={<div>Loading</div>}>
                    <div className="App">
                        <Route exact path='/' component={LoginContainer} />
                        <PrivateRoute path='/home' component={() => <HomeContainer selected={['home']}/>} />
                        <PrivateRoute path='/register' component={() => <Register firebase={this.props.firebase}/>} />
                        <PrivateRoute path='/orders' component={() => <Orders selected={['orders']}/>} />
                        <PrivateRoute path='/associations' component={() => <AssociationsContainer
                            selected={['associations']}/>} />
                        <PrivateRoute path='/events' component={() => <EventsContainer selected={['events']}/>} />
                        <PrivateRoute exact path='/conditions' component={Conditions} />
                        <PrivateRoute exact path='/sandbox' component={Sandbox}/>
                        <PrivateRoute exact path='/loading' component={Loading}/>
                    </div>
                </Suspense>
            </Router>
        );
    }
}

export default App;
