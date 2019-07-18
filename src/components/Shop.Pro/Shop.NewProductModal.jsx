import React from 'react';
import {withUserContext} from "../../App";
import {Button, DatePicker, Form, Input, InputNumber, Modal} from "antd";
import {compose} from "recompose";
import {PostQuery} from "../GetQuery";

class ProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
            price: null
        };
        this.sendProduct = this.sendProduct.bind(this);
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    priceChange = value => {
        this.setState({price: value})
    };

    sendProduct() {
        const product = {
            "name": this.state.name,
            "description": this.state.description,
            "price": this.state.price,
            "association_id": this.props.context.user.id
        };
        PostQuery("/product/register?emailAssociation="+this.props.context.user.email, JSON.stringify(product), this.props.context.user.authToken)
            .then(() => this.props.getProducts())
            .then(() => this.props.close())
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {name, description, price} = this.state;
        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.close}
                title="Event Registration"
                footer={[
                    <Button key="back" onClick={this.props.close}>
                        Cancel
                    </Button>,
                    <Button key="submit" onClick={this.sendProduct} type="primary">
                        Create
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input the name!' }],
                            onChange: (e) => this.onChange(e, 'note'),
                            value: name
                        })(
                            <Input name="name" />
                        )}
                    </Form.Item>
                    <Form.Item label="Description">
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: 'Please input the description!' }],
                            onChange: (e) => this.onChange(e, 'note'),
                            value: description
                        })(
                            <Input name="description" />
                        )}
                    </Form.Item>
                    <Form.Item label="Price">
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: 'Please input the price!' }],
                            onChange: (value) => this.priceChange(value, 'note'),
                            value: price
                        })(
                            <InputNumber step={0.50} min={0} name="price" />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedProductModal = compose(
    Form.create({ name: 'createproduct' }), withUserContext)(ProductModal);
export {WrappedProductModal};