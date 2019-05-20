import React from 'react';
import {Menu, Icon, Modal, Button} from 'antd';

class Navigation extends React.Component {

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
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
            <Menu mode="horizontal" defaultSelectedKeys={this.props.selected}>
                <Menu.Item key="home">
                    <a href="/home"><Icon type="home" />Home</a>
                </Menu.Item>
                <Menu.Item key="associations">
                    <a href="/associations"><Icon type="team" />Associations</a>
                </Menu.Item>
                <Menu.Item key="events">
                    <a href="/events"><Icon type="pushpin" />Events</a>
                </Menu.Item>
                <Menu.Item key="orders">
                    <a href="/orders"><Icon type="shopping-cart" />My Orders</a>
                </Menu.Item>
                <Menu.Item className="force-align-right" key="logout" onClick={this.showModal}>
                    <Icon type="poweroff" />Logout
                </Menu.Item>
                <Modal
                    title="Logout"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="Cancel" onClick={this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="Disconnect" type="primary" onClick={this.handleOk}>
                            Disconnect
                        </Button>,
                    ]}
                >
                    <p>Are you sure ?</p>
                </Modal>
            </Menu>
        );
    }
};

export default Navigation;