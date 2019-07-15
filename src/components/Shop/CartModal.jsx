import React from 'react';
import {Button, List, Modal} from "antd";
import {withUserContext} from "../../App";

class CartModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finalPrice: null,
            order: []
        }
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
                footer={[<Button type="primary" disabled={disabled}>Order</Button>]}
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