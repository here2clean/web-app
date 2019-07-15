import {Button, Divider, Form, Icon, Input, Alert, Switch} from "antd";
import React from "react";
import {Redirect} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {withUserContext} from "../../App";
import {GetQuery} from "../GetQuery";

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    pro: false,
    redirect: false,
    redirectPro: false
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE};
        this.getUser = this.getUser.bind(this);
        this.storeUser = this.storeUser.bind(this);
        this.switch = this.switch.bind(this);
    }

    handleSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(response => {
                response.user.getIdToken()
                    .then(token => {
                        this.getUser(token)
                            .then(() => {
                                if (this.props.context.user !== null) {
                                    if (!this.state.pro) this.setState({redirect: true});
                                    else this.setState({redirectPro: true});
                                }
                            })
                            .catch(error => {this.setState({error})})
                    })
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    switch = (checked) => {
        this.setState({pro: checked});
    };

    async getUser(token) {
        let userType = "volunteer/findByEmail";
        const { email, pro } = this.state;
        if (pro) userType = "association/research/email";
        const user = await GetQuery("/"+userType+"?email="+email,token);
        user.authToken = token;
        user.pro = pro;
        this.setState({user: user});
        this.storeUser(this.props);
    }

    storeUser(props) {
        const setUser = props.context.setUser;
        setUser(this.state.user);
        localStorage.setItem("user",JSON.stringify(this.state.user));
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { email, password, error, pro, redirect, redirectPro } = this.state;

        if (redirect) {
            return <Redirect to='/home'/>
        } else if (redirectPro) {
            return <Redirect to='/pro/home'/>
        }
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <h3>Association:</h3>
                <Form.Item>
                    {getFieldDecorator('pro', {
                        rules: [{ required: true, message: 'Indicate your role !' }],
                        onChange: (e) => this.switch(e, 'note'),
                        value: pro
                    })(
                        <Switch/>
                    )}
                </Form.Item>
                <Divider orientation="left">E-mail</Divider>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your E-mail!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: email
                    })(
                        <Input name="email" prefix={<Icon type="user" style={{ color: 'rgba(38, 194, 129, 1)' }} />} placeholder="E-mail" />
                    )}
                </Form.Item>
                <Divider orientation="left">Password</Divider>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: password
                    })(
                        <Input name="password" prefix={<Icon type="lock" style={{ color: 'rgba(38, 194, 129, 1)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" shape="round" size="large" htmlType="submit">Let's clean !</Button>
                </Form.Item>
                {error && <Alert message={error.message} type="error" showIcon/>}
            </Form>
        );
    }
}

const WrappedLoginForm = compose(
    Form.create({ name: 'login_form' }), withRouter, withUserContext)(LoginForm);
export {WrappedLoginForm};