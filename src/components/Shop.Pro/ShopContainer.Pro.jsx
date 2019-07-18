import React from 'react';
import {Alert, Button, Card, Col, Icon, InputNumber, List, Row} from "antd";
import {withUserContext} from "../../App";
import Loading from "../Loading/Loading";
import {withRouter} from "react-router-dom";
import {DeleteQuery, GetQuery} from "../GetQuery";
import {WrappedCreateEvent} from "../Home.Pro/Home.CreateEvent.Pro";
import {WrappedProNavigation} from "../Navigation.Pro/Navigation.Pro";
import {WrappedProductModal} from "./Shop.NewProductModal";



class ShopContainerPro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: null,
            visible: false
        };
        this.getProducts = this.getProducts.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.getProducts();
    }

    openModal() {
        this.setState({visible: true});
    }

    closeModal() {
        this.setState({visible: false});
    }

    getProducts() {
        GetQuery('/product/findByAssociationId?id='+this.props.context.user.id, this.props.context.user.authToken)
            .then(products => {
                if (products.length === 0 || products.status) { this.setState({products: products, error:{message:"No products yet, sorry !"}}) }
                else {
                    this.setState({products: products, error: false})
                }
            })
            .catch(error => this.setState({error: true}));
    }

    delete(name) {
        DeleteQuery('/product/delete/name?name='+name, this.props.context.user.authToken)
            .then(() => this.getProducts());
    };

    render() {
        const {error} = this.state;

        if (this.state.products === null) {
            return <Loading/>
        } else {
            return (
                <div>
                    <WrappedProNavigation selected="associations"/>
                    <div className="main-content">
                        <Row style={{marginTop:15}}>
                            <Col span={24}>
                                <Card className="main-content">
                                    {error && <Alert message={error.message} type="info" showIcon/>}
                                    <List
                                        grid={{ gutter: 16, column: 4 }}
                                        dataSource={this.state.products}
                                        renderItem={item => (
                                            <List.Item>
                                                <Card title={item.name}>
                                                    {item.description}
                                                    <br/><br/>
                                                    <h4>Price: <b>{item.price}</b></h4>
                                                    <Button type="danger" onClick={() => this.delete(item.name)}>Delete</Button>
                                                </Card>
                                            </List.Item>
                                        )}
                                    />
                                    <Button type="primary" onClick={this.openModal}>New product<Icon type="plus-circle"/></Button>
                                    <WrappedProductModal visible={this.state.visible} getProducts={this.getProducts} close={this.closeModal}/>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        }
    }
};

export default withRouter(withUserContext(ShopContainerPro));