import React from 'react';
import {Alert, Button, DatePicker, Divider, Form, Icon, Input} from "antd";
import {compose} from "recompose";
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

class StepTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            birthday: null,
            address: null,
            city: null,
            zipCode: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    dateChange = event => {
        this.setState({ birthday: moment(event).format(dateFormat) });
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
        const zipCodeReg = /^[0-9]{5}(?:-[0-9]{4})?$/;
        const { firstName, lastName, birthday, address, city, zipCode } = this.state;

        if (firstName === null || lastName === null || birthday === null || address === null || city === null || zipCode === null) {
            return 'Every fields must be filled';
        }

        if (!zipCodeReg.test(zipCode)) return 'Incorrect ZIP code format';

        return false;
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { firstName, lastName, birthday, address, city, zipCode, error } = this.state;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Divider orientation="left">First Name</Divider>
                <Form.Item>
                    {getFieldDecorator('firstName', {
                        rules: [{ required: true, message: 'Please input your first name!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: firstName
                    })(
                        <Input name="firstName" prefix={<Icon type="idcard" style={{ color: 'rgba(38, 194, 129, 1)' }} />} placeholder="eg. Paul, Thomas, Terry" />
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
                <Divider orientation="left">Birth date</Divider>
                <Form.Item>
                    {getFieldDecorator('birthday', {
                        rules: [{ required: true, message: 'Please input your birth date!' }],
                        onChange: (e) => this.dateChange(e, 'note'),
                        value: birthday
                    })(
                        <DatePicker name="birthday" prefix={<Icon type="gift" style={{ color: 'rgba(38, 194, 129, 1)' }} />}/>
                    )}
                </Form.Item>
                <Divider orientation="left">Address</Divider>
                <Form.Item>
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Please input your address!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: address
                    })(
                        <Input name="address" prefix={<Icon type="home" style={{ color: 'rgba(38, 194, 129, 1)' }} />} placeholder="eg. 5 rue des Dozos" />
                    )}
                </Form.Item>
                <Divider orientation="left">City</Divider>
                <Form.Item>
                    {getFieldDecorator('city', {
                        rules: [{ required: true, message: 'Please input your city!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: city
                    })(
                        <Input name="city" prefix={<Icon type="home" style={{ color: 'rgba(38, 194, 129, 1)' }} />} placeholder="eg. Sevran" />
                    )}
                </Form.Item>
                <Divider orientation="left">Zip Code</Divider>
                <Form.Item>
                    {getFieldDecorator('zipCode', {
                        rules: [{ required: true, message: 'Please input your ZIP Code!' }],
                        onChange: (e) => this.onChange(e, 'note'),
                        value: zipCode
                    })(
                        <Input name="zipCode" prefix={<Icon type="home" style={{ color: 'rgba(38, 194, 129, 1)' }} />} placeholder="eg. 93270" />
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

const WrappedStepTwo = compose(
    Form.create({ name: 'steptwo' }))(StepTwo);
export {WrappedStepTwo};