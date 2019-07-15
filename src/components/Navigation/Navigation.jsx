import React from 'react';
import {Menu, Icon, Modal, Button, Badge} from 'antd';
import {NavLink, withRouter} from "react-router-dom";
import {compose} from "recompose";
import {withUserContext} from "../../App";
import logo_dark from "../../resources/logo_dark.svg";
import CartModal from "../Shop/CartModal";

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.handleDisconnect = this.handleDisconnect.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    state = { visible: false, cartModal: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    showCart = () => {
        this.setState({
            cartModal: true,
        });
    };

    handleDisconnect = e => {
        console.log(e);
        this.props.context.setUser(null);
        this.props.context.disconnect();
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            cartModal: false
        });
    };

    render() {
        const badgeCount =  this.props.context.shop ? this.props.context.shop.length : 0;
        return (
            <div name="navigation" className="align-center">
                <Menu mode="horizontal" defaultSelectedKeys={this.props.selected}>
                    <Menu.Item key="logo" className="force-align-left" >
                        <img className="App-logo-dark" src={logo_dark}/>
                    </Menu.Item>
                    <Menu.Item key="home">
                        <NavLink to="/home"><Icon type="home" />Home</NavLink>
                    </Menu.Item>
                    <Menu.Item key="associations">
                        <NavLink to="/associations"><Icon type="team" />Associations</NavLink>
                    </Menu.Item>
                    <Menu.Item key="events">
                        <NavLink to="/events"><Icon type="pushpin" />Events</NavLink>
                    </Menu.Item>
                    <Menu.Item key="orders">
                        <NavLink to="/orders"><Icon type="shopping" />My Orders</NavLink>
                    </Menu.Item>
                    <Menu.Item className="force-align-right" onClick={this.showCart}>
                        <Badge count={badgeCount} showZero>
                            <Icon type="shopping-cart" />
                        </Badge>
                    </Menu.Item>
                    <Menu.Item className="force-align-right" key="logout" onClick={this.showModal}>
                        <Icon type="poweroff" />Logout
                    </Menu.Item>
                    <Modal
                        title="Logout"
                        visible={this.state.visible}
                        onOk={this.handleDisconnect}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="Cancel" onClick={this.handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="Disconnect" type="primary" onClick={this.handleDisconnect}>
                                Disconnect
                            </Button>,
                        ]}
                    >
                        <p>Are you sure ?</p>
                    </Modal>
                    <CartModal visible={this.state.cartModal} cancel={this.handleCancel}/>
                </Menu>
            </div>
        );
    }
};

const WrappedNavigation = compose(withUserContext,withRouter)(Navigation);
export {WrappedNavigation};