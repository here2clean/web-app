import React from 'react';
import {WrappedNavigation} from "../Navigation/Navigation";
import {Alert, Button, Card, Col, InputNumber, List, Row} from "antd";
import {withUserContext} from "../../App";
import Loading from "../Loading/Loading";
import {withRouter} from "react-router-dom";
import {GetQuery} from "../GetQuery";


class ShopContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: null
        };
        GetQuery('/product/findByAssociationId?id='+this.props.match.params.shopid, this.props.context.user.authToken)
            .then(products => {
                if (products.length === 0 || products.status) { this.setState({products: products, error:{message:"No products yet, sorry !"}}) }
                else {
                    this.setState({products: products, error: false})
                }
            })
            .catch(error => this.setState({error: true}));
    }

    onChange(value, id) {
        this.setState({ [id]: value });
    };

    render() {
        const {error} = this.state;

        if (this.state.products === null) {
            return <Loading/>
        } else {
            return (
                <div>
                    <WrappedNavigation selected="associations"/>
                    <div className="main-content">
                        <Row style={{marginTop:15}}>
                            <Col span={24}>
                                <Card className="main-content">
                                    {error && <Alert message={error.message} type="error" showIcon/>}
                                    <List
                                        grid={{ gutter: 16, column: 4 }}
                                        dataSource={this.state.products}
                                        renderItem={item => (
                                            <List.Item>
                                                <Card title={item.name}>
                                                    {item.description}
                                                    <br/><br/>
                                                    <h4>Price: <b>{item.price}</b></h4>
                                                    <InputNumber min={1} defaultValue={1} onChange={(value) => this.onChange(value,item.name)}/>
                                                    <Button onClick={() => this.props.context.addProducts(item, this.state[item.name])}>Add to cart</Button>
                                                </Card>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        }
    }
};

export default withRouter(withUserContext(ShopContainer));