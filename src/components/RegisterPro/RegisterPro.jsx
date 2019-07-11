import React from 'react';
import {Steps, Card, Row, Col, Spin, Alert} from 'antd';
import {WrappedStepOnePro} from "./StepOnePro";
import {WrappedStepTwoPro} from "./StepTwoPro";
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

class RegisterPro extends React.Component {
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
                return <WrappedStepOnePro next={this.next} />;
            case 1:
                return <WrappedStepTwoPro next={this.next} />;
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
        let {name, numberRna, description, email, password} = this.state.data;
        const body = {
            "name": name,
            "email": email,
            "numberRna": numberRna,
            "password": password,
            "description": description
        };
        PostQuery("/association/register", JSON.stringify(body));
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

export default withRouter(RegisterPro);