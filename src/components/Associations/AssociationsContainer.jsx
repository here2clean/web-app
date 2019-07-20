import React from 'react';
import {WrappedNavigation} from "../Navigation/Navigation";
import {Card, Col, Row, Input, Drawer, Alert, Button} from "antd";
import AssociationsRow from "./AssociationsRow";
import {GetQuery, PostQuery} from "../GetQuery";
import Loading from "../Loading/Loading";
import Error from "../Error";
import {withUserContext} from "../../App";
import {withRouter} from "react-router-dom";

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
        if (Object.entries(this.props.match.params).length === 0) {
            GetQuery('/association/all', this.props.context.user.authToken)
                .then(associations => this.setState({associations: associations}))
                .catch(error => this.setState({error: true}));
        } else {
            this.search(this.props.match.params.assoname);
        }
        this.closeInfosModal = this.closeInfosModal.bind(this);
        this.openAssosModal = this.openAssosModal.bind(this);
        this.search = this.search.bind(this);
        this.joinAssociation = this.joinAssociation.bind(this);
    }

    openAssosModal(modalData) {
        let join = true;
        if (modalData.volunteerDTOs.length !== 0) {
            let result = modalData.volunteerDTOs.filter(item => item.id === this.props.context.user.id);
            if (result === undefined || result === null || result.length === 0) join = true;
            else join = false
        }
        modalData.join = join;
        this.setState({modalData: modalData, assosModal: true});
    }

    closeInfosModal() {
        this.setState({assosModal: false});
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    search(name) {
        if (name === "") {
            GetQuery('/association/all', this.props.context.user.authToken)
                .then(associations => this.setState({associations: associations, error: false}))
                .catch(error => this.setState({error: error}));
        } else {
            GetQuery('/association/research/name?name='+name, this.props.context.user.authToken)
                .then(associations => {
                        if (!associations || associations.status) { this.setState({error:{message:"Couldn't find any results for '"+name+"', sorry !"}}) }
                        else {
                            this.setState({associations: associations, error: false})
                        }
                    }
                )
                .catch(() => this.setState({error:{message:"Couldn't find any results, sorry !"}}));
        }
    }

    joinAssociation(join) {
        let action = 'addVolunteer';
        if (join === false) action = 'removeVolunteer';
        const builtRoute = "/association/"+action+"?association_id="+this.state.modalData.id+"&volunteer_id="+this.props.context.user.id;
        PostQuery(builtRoute,"",this.props.context.user.authToken)
            .then(() => {
                if (join) {
                    this.setState(prevState => ({
                        ...prevState,
                        modalData: {
                            ...this.state.modalData,
                            join: false
                        }
                    }))
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        modalData: {
                            ...this.state.modalData,
                            join: true
                        }
                    }))
                }
            });
    }

    render() {
        const { error } = this.state;
        let {style, label} = "";
        if (this.state.modalData.join === false) {
            style = 'danger';
            label = 'Leave';
        } else {
            style = 'primary';
            label = 'Join';
        }
        if (this.state.associations === undefined) {
            return <Loading/>
        } else {
            return <div>
                <WrappedNavigation selected={this.props.selected}/>
                <div className="main-content">
                    <Row style={{marginTop: 15}}>
                        <Row><Col span={6} offset={9}><Input.Search onSearch={value => this.search(value)} name="search" placeholder="Search by name.."/></Col></Row><br/>
                        <Col span={24}>
                            <Card className="main-content align-center">
                                {error && <Alert message={error.message} type="error" showIcon/>}
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
                            <Button type={style} onClick={() => this.joinAssociation(this.state.modalData.join)}>{label}</Button>
                        </Drawer>
                    </Row>
                </div>

            </div>;
        }
    }
}

export default withRouter(withUserContext(AssociationsContainer));