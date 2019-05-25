import React from 'react';
import Navigation from "../Navigation/Navigation";
import {Card, Col, Divider, Row} from "antd";
import MyEvents from "./Home.MyEvents";
import MyAssociations from "./Home.MyAssociations";
import MyProfile from "./Home.MyProfile";
import Conditions from "../Register/Conditions";


class HomeContainer extends React.Component {

    render() {
        return (
            <div>
                <Navigation selected={this.props.selected}/>
                <div class="main-content">
                    <Row style={{marginTop:15}}>
                        <Col span={24}>
                            <Card className="main-content">
                                <h2>My Incoming Events</h2>
                                <MyEvents/>
                                <Row>
                                    <Divider/>
                                    <Col span={10}>
                                        <h2>My Profile</h2>
                                        <MyProfile/>
                                    </Col>
                                    <Col span={13} offset={1}>
                                        <h2>My Associations</h2>
                                        <MyAssociations/>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
};

export default HomeContainer;