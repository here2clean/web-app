import React from 'react';
import { Menu, Icon } from 'antd';

class Navigation extends React.Component {
    render() {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="home">
                    <Icon type="home" />Home
                </Menu.Item>
                <Menu.Item key="association">
                    <Icon type="team" />Associations
                </Menu.Item>
                <Menu.Item key="events">
                    <Icon type="pushpin" />Events
                </Menu.Item>
                <Menu.Item key="orders">
                    <Icon type="shopping-cart" />My Orders
                </Menu.Item>
                <Menu.Item className="force-align-right" key="logout">
                    <Icon type="poweroff" />Logout
                </Menu.Item>
            </Menu>
        );
    }
};

export default Navigation;