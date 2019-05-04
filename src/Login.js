import React, { Component } from 'react';
import { Card, Input, Button, Divider } from "antd";

class Login extends Component {
    render() {
        return (
            <div>
                <Card title="Login">
                    <Input.Group>
                        <Divider orientation="left">Username</Divider>
                        <Input /><br/><br/>
                        <Divider orientation="left">Password</Divider>
                        <Input /><br/><br/>
                        <Button type="primary">Let's clean !</Button>
                    </Input.Group>
                </Card>
            </div>
        );
    }
}

export default Login;