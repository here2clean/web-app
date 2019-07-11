import React from 'react';
import {WrappedNavigation} from "../Navigation/Navigation";
import {Card, Col, List, Row} from "antd";
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
        GetQuery('/association/findById?id='+this.props.match.params.shopid, this.props.context.user.authToken)
            .then(association => {
                if (!association.products || association.status) { this.setState({error:{message:"No products yet, sorry !"}}) }
                else {
                    this.setState({products: association.products, error: false})
                }
            })
            .catch(error => this.setState({error: true}));
    }

    render() {
        const data = [
            {
                title: 'Sarouel',
                description: 'Wonderful sarouel pants, used for 7 years straight and never got washed',
                price: "34.99$ pc."
            },
            {
                title: 'Djembe',
                description: 'Wanna make some motherfucking music and annoy all the neighborhood? Get one right now.',
                price: "48.99$ pc."
            },
            {
                title: 'Headband',
                description: 'Too much dread locks? We feel you. Get a headband.',
                price: "9.99$ pc."
            },
            {
                title: 'Used condom',
                description: "Let's recycle together.",
                price: "0.99$ pc."
            },
        ];

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
                                    {this.props.match.params.shopid}
                                    <List
                                        grid={{ gutter: 16, column: 4 }}
                                        dataSource={this.state.products}
                                        renderItem={item => (
                                            <List.Item>
                                                <Card title={item.name}>
                                                    {item.description}
                                                    <br/><br/>
                                                    <h4>Price: <b>{item.price}</b></h4>
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