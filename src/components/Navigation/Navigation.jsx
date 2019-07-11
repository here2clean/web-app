import React from 'react';
import {Menu, Icon, Modal, Button} from 'antd';
import {NavLink, withRouter} from "react-router-dom";
import {compose} from "recompose";
import {withUserContext} from "../../App";
import logo_dark from "../../resources/logo_dark.svg";

class Navigation extends React.Component {

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
            visible: false,
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
                        <NavLink to="/home"><Icon type="home" />Home</NavLink>
                    </Menu.Item>
                    <Menu.Item key="associations">
                        <NavLink to="/associations"><Icon type="team" />Associations</NavLink>
                    </Menu.Item>
                    <Menu.Item key="events">
                        <NavLink to="/events"><Icon type="pushpin" />Events</NavLink>
                    </Menu.Item>
                    <Menu.Item key="orders">
                        <NavLink to="/orders"><Icon type="shopping-cart" />My Orders</NavLink>
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
                </Menu>
            </div>
        );
    }
};

const WrappedNavigation = compose(withUserContext,withRouter)(Navigation);
export {WrappedNavigation};