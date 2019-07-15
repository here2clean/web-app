import React from 'react';
import {WrappedProNavigation} from "../Navigation.Pro/Navigation.Pro";
import {Card, Col, Divider, Input, Row} from "antd";
import {withUserContext} from "../../App";
import Loading from "../Loading/Loading";
import {withRouter} from "react-router-dom";


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
                                        <Col span={5}>
                                            <h2>My Profile</h2>
                                            <Card style={{ width: 300, height: 300, backgroundImage: 'url("'+this.props.context.user.urlImage+'")', backgroundSize: 300 }}/>
                                            <h4>URL:</h4> <Input/>
                                        </Col>
                                        <Col span={13} offset={1}>

                                        </Col>
                                    </Row>
                                    <Divider/>
                                    <h2>My Incoming Events</h2>
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