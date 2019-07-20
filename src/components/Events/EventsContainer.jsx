import React from 'react';
import {WrappedNavigation} from "../Navigation/Navigation";
import {Alert, Card, Col, Input, Row} from "antd";
import EventRow from "./EventRow";
import EventDrawer from "./EventDrawer";
import {GetQuery} from "../GetQuery";
import {withUserContext} from "../../App";
import Loading from "../Loading/Loading";
import Error from "../Error";
import {withRouter} from "react-router-dom";

class EventsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawer: false,
            drawerData: {},
        };
        if (Object.entries(this.props.match.params).length === 0) {
            GetQuery('/event/all', this.props.context.user.authToken)
                .then(events => this.setState({events: events}))
                .catch(error => this.setState({error: true}));
        } else {
            if (this.props.match.params.eventname) this.search(this.props.match.params.eventname);
            else if (this.props.match.params.associationId) this.findByAssociation(this.props.match.params.associationId);

        }

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.search = this.search.bind(this);
        this.findByAssociation = this.findByAssociation.bind(this);
    }

    openDrawer(drawerData) {
        this.setState({drawer: true,
                            drawerData: drawerData});
    }

    closeDrawer() {
        this.setState({drawer: false});
    }

    findByAssociation(id) {
        GetQuery('/event/allByAssociation?association_id='+id,this.props.context.user.authToken)
            .then(result => {
                this.setState({events: result})
            });
    }

    search(name) {
        if (name === "") {
            GetQuery('/event/all', this.props.context.user.authToken)
                .then(events => this.setState({events: events, error: false}))
                .catch(error => this.setState({error: error}));
        } else {
            GetQuery('/event/research/name?name='+name, this.props.context.user.authToken)
                .then(events => {
                            if (!events) { this.setState({error:{message:"Couldn't find any results for '"+name+"', sorry !"}}) }
                            else {
                                this.setState({events: events, error: false})
                            }
                        }
                )
                .catch(() => this.setState({error:{message:"Couldn't find any results, sorry !"}}));
        }
    }

    render() {
        const {error} = this.state;
        if (this.state.events === undefined) {
            return <Loading/>
        } else {
            return (
                <div>
                    <WrappedNavigation selected={this.props.selected}/>
                    <div class="main-content">
                        <Row style={{marginTop:15}}>
                            <Row><Col span={6} offset={9}><Input.Search onSearch={value => this.search(value)} placeholder="Search by name.."/></Col></Row><br/>
                            <Col span={24}>
                                <Card className="main-content">
                                    {error && <Alert message={error.message} type="error" showIcon/>}
                                    {this.state.events.status || this.state.events === false ? <Error result={0}/> : this.state.events.map(event => {
                                        return <EventRow open={this.openDrawer} search={this.search} key={event.id} data={event}/>;
                                    })}
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <EventDrawer visible={this.state.drawer} data={this.state.drawerData} close={this.closeDrawer}/>
                </div>
            );
        }
    }
}

export default withRouter(withUserContext(EventsContainer));