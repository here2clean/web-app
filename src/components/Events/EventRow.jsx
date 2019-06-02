import React from 'react';
import {Row, Col, List, Icon, Button} from 'antd';

class EventRow extends React.Component {
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
                                <IconText type="team" text="12" />,
                                <Button type="primary" shape="round" icon="info-circle" size="small" onClick={() => this.props.open({title:"Nom de l'event", desc: "This event is based on street cleaning"})}>More</Button>,
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
                                title="Street Cleaning in Paris"
                            />
                            <p>Description de l'événement Description de l'événement Description de l'événement Description de l'événement Description de l'événement</p>
                        </List.Item>

                    </List>
                </Col>
            </Row>
        );
    }
}

export default EventRow;