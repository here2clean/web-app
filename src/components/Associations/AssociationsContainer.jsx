import React from 'react';
import Navigation from "../Navigation/Navigation";
import {Card, Col, Row, Input, Modal, InputNumber} from "antd";
import AssociationsRow from "./AssociationsRow";
import PaypalExpressBtn from 'react-paypal-express-checkout';

class AssociationsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.openModal = this.openModal.bind(this);
    }

    openModal() {
        const { modal } = this.state;
        if (modal) this.setState({modal: false});
        else this.setState({modal: true});
    }

    render() {
        return (
            <div>
                <Navigation selected={this.props.selected}/>
                <div class="main-content">
                    <Row style={{marginTop:15}}>
                        <Col span={24}>
                            <Card className="main-content">
                                <Row><Col span={6} offset={9}><Input.Search placeholder="Search by name.."/></Col></Row><br/>
                                <AssociationsRow openModal={this.openModal}/>
                                <AssociationsRow openModal={this.openModal}/>
                                <AssociationsRow openModal={this.openModal}/>
                                <AssociationsRow openModal={this.openModal}/>
                                <AssociationsRow openModal={this.openModal}/>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title="Donation Modal"
                    visible={this.state.modal}
                    /*onOk={this.handleOk}*/
                    onCancel={this.openModal}
                    footer={[<PaypalExpressBtn/>]}
                >
                    <h4>Street Cleaning Asso</h4>
                    <InputNumber
                        defaultValue={3}
                        formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Modal>
            </div>
        );
    }
}

export default AssociationsContainer;