import React from 'react';
import {WrappedProNavigation} from "../Navigation.Pro/Navigation.Pro";
import {Button, Card, Col, Divider, Icon, Input, Row, Search} from "antd";
import {withUserContext} from "../../App";
import Loading from "../Loading/Loading";
import {withRouter} from "react-router-dom";
import Typography from "antd/lib/typography";
import MyEventsPro from "./Home.MyEvents.Pro";
import ProfilePro from "./Home.Profile.Pro";


class HomeContainerPro extends React.Component {

    render() {
        if (this.props.context.user === null) {
            return <Loading/>
        } else {
            return (
                <div>
                    <WrappedProNavigation selected={this.props.selected}/>
                    <div className="main-content">
                        <Row style={{marginTop:15}}>
                            <Col span={24}>
                                <Card className="main-content">
                                    <Row>
                                        <Col span={24} style={{textAlign: 'center'}}>
                                            <Typography.Text strong>{this.props.context.user.name}</Typography.Text>
                                        </Col>
                                        <Col span={5}>
                                            <ProfilePro/>
                                        </Col>
                                        <Col span={13} offset={1}>

                                        </Col>
                                    </Row>
                                    <Divider/>
                                    <h2>My Incoming Events</h2>
                                    <MyEventsPro/>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        }
    }
};

export default withRouter(withUserContext(HomeContainerPro));