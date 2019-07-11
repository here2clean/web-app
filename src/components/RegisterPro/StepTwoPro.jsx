import React from 'react';
import {Alert, Button, Divider, Form, Icon, Input} from "antd";
import {compose} from "recompose";

class StepTwoPro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            numberRna: null,
            description: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit() {
        if (this.errorHandling() !== false) {
            this.setState({error: {
                    message: this.errorHandling()
                }});
        } else {
            this.props.next(this.state);
        }
    };

    errorHandling() {
        const rnaReg = /^[0-9]{5}(?:-[0-9]{4})?$/;
        const { numberRna, name, description } = this.state;

        if (numberRna === null || name === null || description === null) {
            return 'Every fields must be filled';
        }

        if (!rnaReg.test(numberRna)) return 'Incorrect ZIP code format';

        return false;
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { numberRna, name, description, error } = this.state;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Divider orientation="left">Name</Divider>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: name
                    })(
                        <Input name="name" prefix={<Icon type="idcard" style={{ color: 'rgba(38, 194, 129, 1)' }} />} placeholder="eg. Planet Lovers, Medicine 4 all etc." />
                    )}
                </Form.Item>
                <Divider orientation="left">RNA Number</Divider>
                <Form.Item>
                    {getFieldDecorator('numberRna', {
                        rules: [{ required: true, message: 'Please input your RNA number!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: numberRna
                    })(
                        <Input name="numberRna" prefix={<Icon type="idcard" style={{ color: 'rgba(38, 194, 129, 1)' }} />} placeholder="eg. 57487721" />
                    )}
                </Form.Item>
                <Divider orientation="left">Description</Divider>
                <Form.Item>
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: 'Please input your description!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: description
                    })(
                        <Input.TextArea name="description" prefix={<Icon type="home" style={{ color: 'rgba(38, 194, 129, 1)' }} />} placeholder="What about telling your story? Explaining your activities?" />
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

const WrappedStepTwoPro = compose(
    Form.create({ name: 'steptwopro' }))(StepTwoPro);
export {WrappedStepTwoPro};