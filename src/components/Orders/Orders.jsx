import React from 'react';
import Navigation from "../Navigation/Navigation";
import {Avatar, Card, Col, List, Row, Tag} from "antd";

const data = [
    {
        title: 'Sarouel',
    },
    {
        title: 'Djembé',
    },
    {
        title: 'Savon de Marseille',
    },
    {
        title: 'Serre-tête',
    },
];

class Orders extends React.Component {

    render() {
        return(
            <div>
                <Navigation selected={this.props.selected}/>
                <div className="main-content">
                    <Row style={{marginTop: 15}}>
                        <Col span={24}>
                            <Card className="main-content">
                                <h1>Your orders</h1>
                                <Row>
                                    <Col span={20} offset={2}>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={data}
                                            renderItem={item => (
                                                <List.Item actions={[<a href="/shop/455">View product</a>]}>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                        title={<h4>{item.title}</h4>}
                                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                    />
                                                    <div>9.99$&nbsp;</div>
                                                    <Tag color="green">CONFIRMED</Tag>
                                                </List.Item>
                                            )}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Orders;