import React, {createContext, Suspense} from 'react';
import loadable from 'react-loadable';
import './App.css';
import 'antd/dist/antd.css';
import LoginContainer from './components/Login/LoginContainer';
import HomeContainer from './components/Home/HomeContainer';
import HomeContainerPro from './components/Home.Pro/HomeContainer.Pro';
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
    disconnect: () => {},
    shop: [],
    changeCart: () => {},
    addProducts: () => {},
    deleteProduct: () => {},
    clearCart: () => {}
});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: !!localStorage.getItem('user'),
            userContext: {
                user: JSON.parse(localStorage.getItem('user')) || null,
                setUser: (user) => {
                    this.setState({auth:true, userContext:{user:user, setUser: this.state.userContext.setUser, disconnect: this.state.userContext.disconnect, changeCart: this.state.userContext.changeCart, addProducts: this.state.userContext.addProducts, shop: this.state.shop}});
                },
                disconnect: () => {
                    this.setState({auth:false});
                    localStorage.clear();
                },
                shop: [],
                changeCart: (cart) => {
                    this.setState(prevState => ({
                        userContext: {
                            ...prevState.userContext,
                            [prevState.userContext.shop]: cart,
                        },
                    }));
                },
                addProducts: this.addProducts.bind(this),
                deleteProduct: this.deleteProduct.bind(this),
                clearCart: this.clearCart.bind(this)
            }
        };
    }

    addProducts(product, quantity) {
        if (quantity === null || quantity === undefined) quantity = 1;
        const row = {product: [product], quantity: quantity};
        this.setState(prevState => ({
            ...prevState,
            userContext: {
                ...this.state.userContext,
                shop: [...prevState.userContext.shop, row]
            }
        }))
    };

    deleteProduct(product) {
        let cart = this.state.userContext.shop;
        cart = cart.filter(item => item.name !== product.product[0].name && item.quantity !== product.quantity);
        this.setState(prevState => ({
            ...prevState,
            userContext: {
                ...this.state.userContext,
                shop: cart
            }
        }))
    }

    clearCart() {
        this.setState(prevState => ({
            ...prevState,
            userContext: {
                ...this.state.userContext,
                shop: []
            }
        }))
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
                            <PrivateRoute path='/events/:eventname' component={() => <EventsContainer selected={['events']}/>} />
                            <PrivateRoute exact path='/events' component={() => <EventsContainer selected={['events']}/>} />
                            <PrivateRoute exact path='/conditions' component={Conditions} />
                            <PrivateRoute exact path='/sandbox' component={Sandbox}/>
                            <PrivateRoute exact path='/loading' component={Loading}/>
                            <PrivateRoute path='/shop/:shopid' component={ShopContainer}/>
                            <PrivateRoute path='/pro/home' component={HomeContainerPro}/>
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