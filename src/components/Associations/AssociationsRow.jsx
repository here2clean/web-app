import React from 'react';
import {Row, Col, Icon, Card, Badge, Modal, InputNumber} from 'antd';
import * as PropTypes from 'prop-types';
import PaypalExpressBtn from "react-paypal-express-checkout";

class AssociationsRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paypalModal: false,
            infosModal: false
        };
        this.openPaypalModal = this.openPaypalModal.bind(this);
    }

    openPaypalModal() {
        const { paypalModal } = this.state;
        if (paypalModal) this.setState({paypalModal: false});
        else this.setState({paypalModal: true});
    }

    render() {

        const IconText = ({ type, text, theme, twoToneColor, onClick }) => (
            <span onClick={onClick}>
                <Icon type={type} theme={theme} twoToneColor={twoToneColor} style={{marginRight:8}}/>
                    {text}
            </span>
        );

        return (
            <div>
                  <Col span={8}>
                      <Card
                          //style={{ width: 300 }}
                          title={this.props.data.name}
                          cover={
                              <img
                                  alt="example"
                                  src="https://www.blog.spoongraphics.co.uk/wp-content/uploads/2010/transparency-logos/15.jpg"
                              />
                          }
                          actions={[<IconText type="schedule" theme="twoTone" twoToneColor="#26c281" text="Events"/>
                              ,<IconText type="shop" theme="twoTone" twoToneColor="#26c281" text="Shop"/>
                              ,<IconText type="euro" theme="twoTone" twoToneColor="#fcd670" text="Donate" onClick={this.openPaypalModal}/>]}
                      >
                          <a onClick={() => this.props.openModal(this.props.data)}>
                              <Badge count={<Icon type="info-circle" theme="filled" size="large" style={{ fontSize: 20 }} />}/>
                          </a>
                          <Modal
                              title="Donation Modal"
                              visible={this.state.paypalModal}
                              /*onOk={this.handleOk}*/
                              onCancel={this.openPaypalModal}
                              footer={[<PaypalExpressBtn/>]}
                          >
                              <h4>Street Cleaning Asso</h4>
                              <InputNumber
                                  defaultValue={3}
                                  formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                              />
                          </Modal>
                      </Card>
                  </Col>
            </div>
        );
    }
}

AssociationsRow.propTypes = {
    data: PropTypes.object.isRequired
};

export default AssociationsRow;