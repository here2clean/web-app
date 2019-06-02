import React from 'react';
import {Row, Col, Icon, Card, Badge} from 'antd';

class AssociationsRow extends React.Component {

    render() {

        const IconText = ({ type, text, theme, twoToneColor, onClick }) => (
            <span onClick={onClick}>
                <Icon type={type} theme={theme} twoToneColor={twoToneColor} style={{marginRight:8}}/>
                    {text}
            </span>
        );

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
                          actions={[<IconText type="schedule" theme="twoTone" twoToneColor="#26c281" text="Events"/>
                              ,<IconText type="shop" theme="twoTone" twoToneColor="#26c281" text="Shop"/>
                              ,<IconText type="euro" theme="twoTone" twoToneColor="#fcd670" text="Donate" onClick={this.props.openPaypalModal}/>]}
                      >
                          <a onClick={() => this.props.openInfosModal({title:'Street Cleaners',desc:'We be street cleaning mate ! '})}>
                              <Badge count={<Icon type="info-circle" theme="filled" size="large" style={{ fontSize: 20 }} />}>
                                  <span className="head-example"/>
                              </Badge>
                          </a>
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
                          actions={[<IconText type="schedule" theme="twoTone" twoToneColor="#26c281" text="Events"/>
                              ,<IconText type="shop" theme="twoTone" twoToneColor="#26c281" text="Shop"/>
                              ,<IconText type="euro" theme="twoTone" twoToneColor="#fcd670" text="Donate" onClick={this.props.openPaypalModal}/>]}
                      >
                          <a onClick={() => this.props.openInfosModal({title:'Street Cleaners',desc:'We be street cleaning mate ! '})}>
                              <Badge count={<Icon type="info-circle" theme="filled" size="large" style={{ fontSize: 20 }} />}>
                                  <span className="head-example"/>
                              </Badge>
                          </a>
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
                          actions={[<IconText type="schedule" theme="twoTone" twoToneColor="#26c281" text="Events"/>
                              ,<IconText type="shop" theme="twoTone" twoToneColor="#26c281" text="Shop"/>
                              ,<IconText type="euro" theme="twoTone" twoToneColor="#fcd670" text="Donate" onClick={this.props.openPaypalModal}/>]}
                      >
                          <a onClick={() => this.props.openInfosModal({title:'Street Cleaners',desc:'We be street cleaning mate ! '})}>
                              <Badge count={<Icon type="info-circle" theme="filled" size="large" style={{ fontSize: 20 }} />}>
                                  <span className="head-example"/>
                              </Badge>
                          </a>
                      </Card>
                  </Col>
              </Row>
            <br/>
            </div>
        );
    }
}

export default AssociationsRow;