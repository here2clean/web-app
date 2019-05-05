import React, {Component} from 'react';
import Navigation from "../Navigation/Navigation";
import {Card, Col, Row} from "antd";


class HomeContainer extends React.Component {

    render() {
        return (
            <div>
                <Navigation/>
                <div class="main-content">
                    <Row style={{marginTop:15}}>
                        <Col span={24}><Card className="main-content"/></Col>
                    </Row>
                </div>
            </div>
        );
    }
};

export default HomeContainer;