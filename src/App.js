import React, {createContext, Suspense} from 'react';
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
import { createBrowserHistory } from "history";
import ShopContainer from "./components/Shop/ShopContainer";
import RegisterPro from "./components/RegisterPro/RegisterPro";

const customHistory = createBrowserHistory();

const Sandbox = loadable({loader: () => import('./components/Sandbox'), loading: Loading, delay: 10});

//FFB473
const UserContext = createContext({
    user: null,
    setUser: () => {},
    disconnect: () => {}
});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: !!localStorage.getItem('user'),
            userContext: {
                user: JSON.parse(localStorage.getItem('user')) || null,
                setUser: (user) => {
                    this.setState({auth:true, userContext:{user:user, setUser: this.state.userContext.setUser, disconnect: this.state.userContext.disconnect}});
                },
                disconnect: () => {
                    this.setState({auth:false});
                    localStorage.clear();
                }
            }
        };
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
            <UserContext.Provider value={this.state.userContext}>
                <Router history={customHistory}>
                    <Suspense fallback={<div>Loading</div>}>
                        <div className="App">
                            <Route exact path='/' component={LoginContainer} />
                            <PrivateRoute path='/home' component={() => <HomeContainer selected={['home']}/>} />
                            <Route path='/register' component={() => <Register firebase={this.props.firebase}/>} />
                            <Route path='/associationRegistration' component={() => <RegisterPro firebase={this.props.firebase}/>} />
                            <PrivateRoute exact path='/orders' component={() => <Orders selected={['orders']}/>} />
                            <PrivateRoute exact path='/associations' component={() => <AssociationsContainer
                                selected={['associations']}/>} />
                            <PrivateRoute exact path='/events' component={() => <EventsContainer selected={['events']}/>} />
                            <PrivateRoute exact path='/conditions' component={Conditions} />
                            <PrivateRoute exact path='/sandbox' component={Sandbox}/>
                            <PrivateRoute exact path='/loading' component={Loading}/>
                            <PrivateRoute path='/shop/:shopid' component={ShopContainer}/>
                        </div>
                    </Suspense>
                </Router>
            </UserContext.Provider>
        );
    }
}

export default App;

export function withUserContext(Component) {
    return function contextComponent(props) {
        return (
            <UserContext.Consumer>
                {context => <Component {...props} context={context}/>}
            </UserContext.Consumer>
        )
    }
}