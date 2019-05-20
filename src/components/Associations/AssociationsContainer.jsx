import React from 'react';
import Navigation from "../Navigation/Navigation";
import {Card, Col, Row} from "antd";

class AssociationsContainer extends React.Component {

    render() {
        return (
            <div>
                <Navigation selected={this.props.selected}/>
                <div class="main-content">
                    <Row style={{marginTop:15}}>
                        <Col span={24}>
                            <Card className="main-content">

                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default AssociationsContainer;