import React from 'react';
import {Alert, Button, Divider, Form, Icon, Input} from "antd";
import {compose} from "recompose";

class StepOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            confirmPwd: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.errorHandling = this.errorHandling.bind(this);
    }

    handleSubmit() {
        if (this.errorHandling() !== false) {
            this.setState({error: {
                message: this.errorHandling()
                }});
        } else {
            this.props.next(this.state);
        }
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    errorHandling() {
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { email, password, confirmPwd } = this.state;

        if (email === null || password === null || confirmPwd === null) {
            return 'Every fields must be filled';
        }

        if (!emailReg.test(email)) return 'Incorrect e-mail format';

        if (password !== confirmPwd) return 'Passwords must be the same';

        return false;
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const { email, password, confirmPwd, error } = this.state;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Divider orientation="left">E-mail</Divider>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your E-mail!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: email
                    })(
                        <Input name="email" prefix={<Icon type="user" style={{ color: 'rgba(38, 194, 129, 1)' }} />} type="email" placeholder="eg. test@yourdomain.com" />
                    )}
                </Form.Item>
                <Divider orientation="left">Password</Divider>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: password
                    })(
                        <Input name="password" prefix={<Icon type="lock" style={{ color: 'rgba(38, 194, 129, 1)' }} />} type="password" placeholder="Choose wisely" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('confirmPwd', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: confirmPwd
                    })(
                        <Input name="confirmPwd" prefix={<Icon type="lock" style={{ color: 'rgba(38, 194, 129, 1)' }} />} type="password" placeholder="Please Confirm" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={this.handleSubmit}>Next</Button>
                </Form.Item>
                {error && <Alert message={error.message} type="error" showIcon/>}
            </Form>
        );
    }
}

const WrappedStepOne = compose(
    Form.create({ name: 'stepone' }))(StepOne);
export {WrappedStepOne};