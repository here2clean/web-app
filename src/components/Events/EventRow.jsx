import React from 'react';
import {Row, Col, List, Icon, Button} from 'antd';

class EventRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                 {text}
            </span>
        );

        return (
            <Row>
                <Col span={20} offset={2}>
                    <List
                        itemLayout="vertical"
                        size="large">
                        <List.Item
                            key="key"
                            actions={[
                                <IconText type="team" text={this.props.data.numberOfParticipant} />,
                                <Button type="primary" shape="round" icon="info-circle" size="small" onClick={() => this.props.open({title:this.props.data.name, desc: this.props.data.description, location:this.props.data.location})}>More</Button>,
                                <Button type="primary" size="small">Join</Button>
                            ]}
                            extra={
                                <img
                                    height={150}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            }
                        >
                            <List.Item.Meta
                                title={this.props.data.name}
                            />
                            <p>{this.props.data.description}</p>
                        </List.Item>

                    </List>
                </Col>
            </Row>
        );
    }
}

export default EventRow;