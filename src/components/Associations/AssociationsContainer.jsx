import React from 'react';
import {WrappedNavigation} from "../Navigation/Navigation";
import {Card, Col, Row, Input, Drawer} from "antd";
import AssociationsRow from "./AssociationsRow";
import {GetQuery} from "../GetQuery";
import Loading from "../Loading/Loading";
import Error from "../Error";

class AssociationsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            paypalModal: false,
            assosModal: false,
            modalData: {
                name: 'default'
            }
        };
        GetQuery('/association/all')
            .then(associations => this.setState({associations: associations}))
            .catch(error => this.setState({error: true}));
        this.closeInfosModal = this.closeInfosModal.bind(this);
        this.openAssosModal = this.openAssosModal.bind(this);
    }

    openAssosModal(modalData) {
        this.setState({modalData: modalData, assosModal: true});
    }

    closeInfosModal() {
        this.setState({assosModal: false});
    }

    render() {
        if (this.state.associations === undefined) {
            return <Loading/>
        } else {
            return <div>
                <WrappedNavigation selected={this.props.selected}/>
                <div className="main-content">
                    <Row style={{marginTop: 15}}>
                        <Row><Col span={6} offset={9}><Input.Search placeholder="Search by name.."/></Col></Row><br/>
                        <Col span={24}>
                            <Card className="main-content align-center">
                                {this.state.associations === false ? <Error/> : this.state.associations.map(asso => {
                                    return <AssociationsRow key={asso.id} data={asso} openModal={this.openAssosModal}/>;
                                })}
                            </Card>
                        </Col>
                        <Drawer
                            title={this.state.modalData.name}
                            placement="right"
                            closable={false}
                            onClose={this.closeInfosModal}
                            visible={this.state.assosModal}
                        >
                            <h4>Description: </h4><p>{this.state.modalData.description}</p>
                        </Drawer>
                    </Row>
                </div>

            </div>;
        }
    }
}

export default AssociationsContainer;