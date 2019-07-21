import React from 'react';
import Loading from "../Loading/Loading";
import {WrappedNavigation} from "../Navigation/Navigation";
import {Avatar, Card, Col, List, Row} from "antd";
import {GetQuery} from "../GetQuery";
import {withUserContext} from "../../App";

class OrdersContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myOrders: undefined
        };
        this.getMyOrders = this.getMyOrders.bind(this);
        this.getMyOrders();
    }

    getMyOrders() {
        GetQuery("/volunteer/getCommand?id="+this.props.context.user.id,this.props.context.user.authToken)
            .then(result => {
                if (result.status) this.setState({myOrders: []});
                else this.setState({myOrders: result})
            })
            .catch(() => this.setState({myOrders: []}))
    }

    amount(order) {
        let price = order.product.price;
        price = price * order.quantity;
        return price;
    }

    render() {
        if (this.state.myOrders === undefined || this.state.myOrders === null) {
            return <Loading/>
        } else {
            return <div>
                <WrappedNavigation selected={this.props.selected}/>
                <div className="main-content">
                    <Row style={{marginTop: 15}}>
                        <Col span={24}>
                            <Card className="main-content">
                                <h3>My orders</h3>
                                <List bordered={true} dataSource={this.state.myOrders} renderItem={item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            title={item.product.name}
                                            description={item.quantity}
                                        />
                                        <div style={{marginRight:30}}><h4>{item.command.dateCommand.substring(0,10)}</h4></div>
                                        <div><h4>{this.amount(item)}$</h4></div>
                                    </List.Item>
                                )}>
                                </List>
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>;
        }
    }
}

export default withUserContext(OrdersContainer);