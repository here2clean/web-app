import React from 'react';
import {Button, List, Modal} from "antd";
import {withUserContext} from "../../App";
import {PostQuery} from "../GetQuery";

class CartModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finalPrice: null
        };
        this.order = this.order.bind(this);
    }

    order() {
        let order = [];
        this.props.context.shop.map(item => {
            let itemConcat = {
                "idProduct": item.product[0].id,
                "quantity": item.quantity
            };
            order.push(itemConcat);
        });
        PostQuery("/command/newCommand?volunteer_id="+this.props.context.user.id, JSON.stringify(order),this.props.context.user.authToken)
            .then(() => this.props.context.clearCart())
    }


    render() {
        let disabled;
        if (!this.props.context.shop) disabled = true;
        else disabled = this.props.context.shop.length === 0;
        return (
            <Modal
                title="Your cart"
                visible={this.props.visible}
                onCancel={this.props.cancel}
                footer={[<Button type="primary" onClick={() => this.order()} disabled={disabled}>Order</Button>]}
            >
                <List
                    dataSource={this.props.context.shop}
                    itemLayout="horizontal"
                    renderItem={item => (
                            <List.Item key={item.product[0].id} actions={[<Button onClick={() => this.props.context.deleteProduct(item)} type="danger">Delete</Button>]}>
                                <List.Item.Meta
                                    title={item.product[0].name}
                                />
                                <div><b>{(item.product[0].price*item.quantity).toFixed(2)+"$"}</b>&nbsp;&nbsp;Quantity: x{item.quantity}</div>
                            </List.Item>

                        )}
                />
            </Modal>
        );
    }
}

export default withUserContext(CartModal);