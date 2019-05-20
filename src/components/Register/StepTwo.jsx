import React from 'react';
import {Alert, Button, Divider, Form, Icon, Input} from "antd";
import {compose} from "recompose";

class StepTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: ''
        }

    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { firstName, lastName, error } = this.state;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Divider orientation="left">First Name</Divider>
                <Form.Item>
                    {getFieldDecorator('firstName', {
                        rules: [{ required: true, message: 'Please input your first name!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: firstName
                    })(
                        <Input name="email" prefix={<Icon type="idcard" style={{ color: 'rgba(38, 194, 129, 1)' }} />} placeholder="eg. Paul, Thomas, Terry" />
                    )}
                </Form.Item>
                <Divider orientation="left">Last Name</Divider>
                <Form.Item>
                    {getFieldDecorator('lastName', {
                        rules: [{ required: true, message: 'Please input your last name!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: lastName
                    })(
                        <Input name="lastName" prefix={<Icon type="idcard" style={{ color: 'rgba(38, 194, 129, 1)' }} />} placeholder="eg. Dupont, Smith, Bouteflika" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Next</Button>
                </Form.Item>
                {error && <Alert message={error.message} type="error" showIcon/>}
            </Form>
        );
    }
}

const WrappedStepTwo = compose(
    Form.create({ name: 'steptwo' }))(StepTwo);
export {WrappedStepTwo};