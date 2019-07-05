import React from 'react';
import {WrappedNavigation} from "../Navigation/Navigation";
import {Card, Col, Input, Row} from "antd";
import EventRow from "./EventRow";
import EventDrawer from "./EventDrawer";

class EventsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawer: false,
            drawerData: {}
        };

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    openDrawer(drawerData) {
        this.setState({drawer: true,
                            drawerData: drawerData});
    }

    closeDrawer() {
        this.setState({drawer: false});
    }

    render() {
        return (
            <div>
                <WrappedNavigation selected={this.props.selected}/>
                <div class="main-content">
                    <Row style={{marginTop:15}}>
                        <Row><Col span={6} offset={9}><Input.Search placeholder="Search by name.."/></Col></Row><br/>
                        <Col span={24}>
                            <Card className="main-content">
                                <EventRow open={this.openDrawer}/>
                                <EventRow open={this.openDrawer}/>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <EventDrawer visible={this.state.drawer} data={this.state.drawerData} close={this.closeDrawer}/>
            </div>
        );
    }
}

export default EventsContainer;