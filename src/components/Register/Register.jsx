import React from 'react';
import {Button, Steps, message, Card, Row, Col, Spin} from 'antd';
import {WrappedStepOne} from "./StepOne";
import {WrappedStepTwo} from "./StepTwo";
import {Redirect, withRouter} from "react-router-dom";

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
                //setTimeout(this.redirect,3000);
                alert(JSON.stringify(this.state.data));
                return <h1>Thanks for joining us !</h1>;
            default:

        }
    }

    redirect() {
        const redirect = true;
        this.setState({redirect});
    }

    userRegistration() {
        //TODO
    }

    firebaseRegistration(email,password) {
        //TODO
    }

    render() {
        const current = this.state.current;
        const redirect = this.state.redirect;

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
                            <div className="steps-content">{this.switcher()}</div>
                            <div className="steps-action">
                                {current === steps.length - 1 && (
                                    <Spin tip="Wait for redirection..."/>
                                )}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(Register);