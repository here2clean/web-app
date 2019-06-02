import React from 'react';
import Navigation from "../Navigation/Navigation";
import {Card, Col, Row, Input, Modal, InputNumber} from "antd";
import AssociationsRow from "./AssociationsRow";
import PaypalExpressBtn from 'react-paypal-express-checkout';

class AssociationsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            paypalModal: false,
            assosModal: false,
            assosModalData: {
                title: 'default'
            }
        };
        this.openPaypalModal = this.openPaypalModal.bind(this);
        this.closeInfosModal = this.closeInfosModal.bind(this);
        this.openAssosModal = this.openAssosModal.bind(this);
    }

    openPaypalModal() {
        const { paypalModal } = this.state;
        if (paypalModal) this.setState({paypalModal: false});
        else this.setState({paypalModal: true});
    }

    openAssosModal(modalData) {
        this.setState({modalData: modalData, assosModal: true});
    }

    closeInfosModal() {
        this.setState({assosModal: false});
    }

    render() {
        return (
            <div>
                <Navigation selected={this.props.selected}/>
                <div class="main-content">
                    <Row style={{marginTop:15}}>
                        <Row><Col span={6} offset={9}><Input.Search placeholder="Search by name.."/></Col></Row><br/>
                        <Col span={24}>
                            <Card className="main-content">
                                <AssociationsRow openPaypalModal={this.openPaypalModal} openInfosModal={this.openAssosModal}/>
                                <AssociationsRow openPaypalModal={this.openPaypalModal} openInfosModal={this.openAssosModal}/>
                                <AssociationsRow openPaypalModal={this.openPaypalModal} openInfosModal={this.openAssosModal}/>
                                <AssociationsRow openPaypalModal={this.openPaypalModal} openInfosModal={this.openAssosModal}/>
                                <AssociationsRow openPaypalModal={this.openPaypalModal} openInfosModal={this.openAssosModal}/>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title="Donation Modal"
                    visible={this.state.paypalModal}
                    /*onOk={this.handleOk}*/
                    onCancel={this.openPaypalModal}
                    footer={[<PaypalExpressBtn/>]}
                >
                    <h4>Street Cleaning Asso</h4>
                    <InputNumber
                        defaultValue={3}
                        formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Modal>
                <Modal
                    title={this.state.assosModalData.title}
                    visible={this.state.assosModal}
                    onCancel={this.closeInfosModal}
                    footer={[]}
                >
                    <p>{this.state.assosModalData.desc}</p>
                    <p>Adresse: 15 rue des chevreuils</p>
                    <p>Gérant: Philippe Tarpin</p>
                </Modal>
            </div>
        );
    }
}

export default AssociationsContainer;