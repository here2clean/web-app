import React, { Component } from 'react';
import {Card, Input, Button, Divider, Col, Row} from "antd";
import tf1 from "./resources/tf1.png";
import direct from "./resources/direct_matin.png";
import parisien from "./resources/parisien.png";
import logo from "./resources/logo.svg";
import woman from "./resources/woman.png";

class Login extends Component {
    render() {
        return (
            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={4}>
                        <h2 className="white-h1"><i>Vu sur:</i></h2>
                        <img src={tf1} className="brand-image"/>
                        <img src={direct} className="brand-image"/>
                        <img src={parisien} className="brand-image"/>
                    </Col>
                    <Col span={12}>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="white-h1">
                            Welcome to Here2Clean !
                        </h1>
                        <Card title="Login">
                            <Input.Group>
                                <Divider orientation="left">Username</Divider>
                                <Input /><br/><br/>
                                <Divider orientation="left">Password</Divider>
                                <Input /><br/><br/>
                                <Button type="primary" shape="round" size="large">Let's clean !</Button>
                            </Input.Group>
                        </Card><br/><br/>
                        <p>Not a user yet?</p><a><h2 className="white-h1"> Sign up !</h2></a>
                    </Col>
                    <Col span={4}>
                        <div className="polaroids">
                            <div title="'I love to clean the planet with my friends every Sunday !' - Emily, 37 yo">
                                <img src={woman} className="fit-image" alt="Sunrise"/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Login;