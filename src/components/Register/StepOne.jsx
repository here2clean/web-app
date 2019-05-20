import React from 'react';
import {Alert, Button, Divider, Form, Icon, Input} from "antd";
import {compose} from "recompose";

class StepOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        this.props.next();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { email, password, error } = this.state;

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