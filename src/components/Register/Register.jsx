import React from 'react';
import {Steps, Card, Row, Col, Spin, Alert} from 'antd';
import {WrappedStepOne} from "./StepOne";
import {WrappedStepTwo} from "./StepTwo";
import {Redirect, withRouter} from "react-router-dom";
import {PostQuery} from "../GetQuery";

const Step = Steps.Step;

const steps = [
    {
        title: 'Credentials'
    },
    {
        title: 'Informations'
    },
    {
        title: 'Done'
    },
];

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            redirect: false,
            flowProps: {}
        };
        this.redirect = this.redirect.bind(this);
        this.next = this.next.bind(this);
        this.firebaseRegistration = this.firebaseRegistration.bind(this);
    }

    next = flowProps => {
        this.setState({ data: Object.assign(this.state.flowProps, flowProps)});
        const current = this.state.current + 1;
        this.setState({ current });
    };

    switcher() {
        switch (this.state.current) {
            case 0:
                return <WrappedStepOne next={this.next} />;
            case 1:
                return <WrappedStepTwo next={this.next} />;
            case 2:

                alert(JSON.stringify(this.state.data));
                this.userRegistration()
                    .then(success => console.log('Réussi'));
                return <h1>Processing..</h1>;
            default:

        }
    }

    redirect() {
        const redirect = true;
        this.setState({redirect});
    }

    async userRegistration() {
        let {firstName, lastName, birthday, address, city, zipCode, email, password} = this.state.data;
        var parsedDate = new Date(birthday);
        birthday = [parsedDate.getDay(),parsedDate.getMonth(),parsedDate.getFullYear()].join('/');
        const body = {
            "firstName": firstName,
            "lastName": lastName,
            "birthday": birthday,
            "address": address,
            "city": city,
            "cityCode": zipCode,
            "email": email,
            "password": password
        };
        PostQuery("/volunteer/user/signUp", JSON.stringify(body));
    }

    async firebaseRegistration() {
        const { email, password } = this.state.data;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                console.log('Registration successful');
            })
            .catch(error => {
                this.setState({ current: 0, error: error });
            });
    }

    render() {
        const current = this.state.current;
        const redirect = this.state.redirect;
        const { error } = this.state;

        if (redirect) {
            return <Redirect to='/'/>
        }
        return (
            <div className="registerContainer">
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={12}>
                        <Card>
                            <Steps current={current}>
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                            <div className="steps-content align-center">{this.switcher()}</div>
                            <div className="steps-action">
                                {current === steps.length - 1 && (
                                    <Spin tip="Wait for redirection..."/>
                                )}
                            </div>
                            {error && <Alert message={error.message} type="error" showIcon/>}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(Register);