import React from 'react';
import {Menu, Icon, Modal, Button, Badge} from 'antd';
import {NavLink, withRouter} from "react-router-dom";
import {compose} from "recompose";
import {withUserContext} from "../../App";
import logo_dark from "../../resources/logo_dark.svg";
import CartModal from "../Shop/CartModal";

class NavigationPro extends React.Component {

    constructor(props) {
        super(props);
        this.handleDisconnect = this.handleDisconnect.bind(this);
    }

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
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
            visible: false
        });
    };

    render() {
        return (
            <div name="navigation" className="align-center">
                <Menu mode="horizontal" defaultSelectedKeys={this.props.selected}>
                    <Menu.Item key="logo" className="force-align-left" >
                        <img className="App-logo-dark" src={logo_dark}/>
                    </Menu.Item>
                    <Menu.Item key="home">
                        <NavLink to="/pro/home"><Icon type="home" />Home</NavLink>
                    </Menu.Item>
                    <Menu.Item key="shop">
                        <NavLink to="/pro/shop"><Icon type="shop" />Shop</NavLink>
                    </Menu.Item>
                    <Menu.Item key="orders">
                        <NavLink to="/pro/orders"><Icon type="shopping" />Orders</NavLink>
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

const WrappedProNavigation = compose(withUserContext,withRouter)(NavigationPro);
export {WrappedProNavigation};