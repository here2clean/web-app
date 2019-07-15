import React from 'react';
import {Row, Col, List, Icon, Button} from 'antd';
import {withUserContext} from "../../App";
import {PostQuery} from "../GetQuery";

class EventRow extends React.Component {
    constructor(props) {
        super(props);
        this.populateEvent = this.populateEvent.bind(this);
    }

    participationSwitch() {
        if (this.props.data.numberOfParticipant === 0) {
            return <Button type="primary" onClick={() => this.populateEvent(this.props.data.id,this.props.context.user.id, true)} size="small">Join</Button>
        } else {
            if (this.props.data.volunteers.filter(item => item.id === this.props.context.user.id).length > 0) {
                return <Button type="danger" onClick={() => this.populateEvent(this.props.data.id,this.props.context.user.id, false)} size="small">Leave</Button>
            } else {
                return <Button type="primary" onClick={() => this.populateEvent(this.props.data.id,this.props.context.user.id, true)} size="small">Join</Button>
            }
        }
    }

    populateEvent(eventId, volunteerId,join) {
        let route;
        if (join === true) route = "/event/addVolunteer?event_id="+eventId+"&volunteer_id="+volunteerId;
        else if (join === false) route = "/event/removeVolunteer?event_id="+eventId+"&volunteer_id="+volunteerId;
        PostQuery(route,"", this.props.context.user.authToken)
            .then(() => this.props.search(""));
    }

    leaveEvent(eventId, volunteerId) {

    }

    render() {

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                 {text}
            </span>
        );

        return (

            <Row>
                <Col span={20} offset={2}>
                    <List
                        itemLayout="vertical"
                        size="large">
                        <List.Item
                            key="key"
                            actions={[
                                <IconText type="team" text={this.props.data.numberOfParticipant} />,
                                <Button type="primary" shape="round" icon="info-circle" size="small" onClick={() => this.props.open({title:this.props.data.name, desc: this.props.data.description, location:this.props.data.location})}>More</Button>,
                                this.participationSwitch()
                            ]}
                            extra={
                                <img
                                    height={150}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            }
                        >
                            <List.Item.Meta
                                title={this.props.data.name}
                            />
                            <p>{this.props.data.description}</p>
                        </List.Item>

                    </List>
                </Col>
            </Row>
        );
    }
}

export default withUserContext(EventRow);