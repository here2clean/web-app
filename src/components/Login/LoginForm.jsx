import {Button, Divider, Form, Icon, Input, Alert} from "antd";
import React from "react";
import {Redirect} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    redirect: false
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE};
    }

    handleSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ redirect: true });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { email, password, error, redirect } = this.state;

        if (redirect) {
            return <Redirect to='/home'/>
        }
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
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
    Form.create({ name: 'login_form' }), withRouter)(LoginForm);
export {WrappedLoginForm};