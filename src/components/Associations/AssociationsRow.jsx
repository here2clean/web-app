import React from 'react';
import {Row, Col, Icon, Card} from 'antd';

class AssociationsRow extends React.Component {
    render() {
        return (
            <div>
              <Row>
                  <Col span={8}>
                      <Card
                          //style={{ width: 300 }}
                          cover={
                              <img
                                  alt="example"
                                  src="https://www.blog.spoongraphics.co.uk/wp-content/uploads/2010/transparency-logos/15.jpg"
                              />
                          }
                          actions={[<Icon type="schedule" theme="twoTone" twoToneColor="#26c281"/>
                              ,<Icon type="shop" theme="twoTone" twoToneColor="#26c281"/>
                              ,<Icon type="euro" theme="twoTone" twoToneColor="#fcd670" onClick={this.props.openModal}/>]}
                      >
                      </Card>
                  </Col>
                  <Col span={8}>
                      <Card
                          //style={{ width: 300 }}
                          cover={
                              <img
                                  alt="example"
                                  src="https://www.blog.spoongraphics.co.uk/wp-content/uploads/2010/transparency-logos/15.jpg"
                              />
                          }
                          actions={[<Icon type="schedule" theme="twoTone" twoToneColor="#26c281"/>
                              ,<Icon type="shop" theme="twoTone" twoToneColor="#26c281"/>
                              ,<Icon type="euro" theme="twoTone" twoToneColor="#fcd670" onClick={this.props.openModal}/>]}
                      >
                      </Card>
                  </Col>
                  <Col span={8}>
                      <Card
                          //style={{ width: 300 }}
                          cover={
                              <img
                                  alt="example"
                                  src="https://www.blog.spoongraphics.co.uk/wp-content/uploads/2010/transparency-logos/15.jpg"
                              />
                          }
                          actions={[<Icon type="schedule" theme="twoTone" twoToneColor="#26c281"/>
                              ,<Icon type="shop" theme="twoTone" twoToneColor="#26c281"/>
                              ,<Icon type="euro" theme="twoTone" twoToneColor="#fcd670" onClick={this.props.openModal}/>]}
                      >
                      </Card>
                  </Col>
              </Row>
            <br/>
            </div>
        );
    }
}

export default AssociationsRow;