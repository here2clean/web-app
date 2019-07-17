import React from 'react';
import {Alert, Avatar, Button, DatePicker, Icon, Input, List, Modal} from 'antd';
import {GetQuery, PostQuery} from "../GetQuery";
import {withUserContext} from "../../App";
import {NavLink} from "react-router-dom";
import {WrappedCreateEvent} from "./Home.CreateEvent.Pro";

class MyEventsPro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myEvents: [],
            newEventModal: false
        };

        this.getMyEvents = this.getMyEvents.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getMyEvents();

    }

    openModal() {
        this.setState({newEventModal: true})
    }

    closeModal() {
        this.setState({newEventModal: false})
    }

    getMyEvents() {
        GetQuery('/event/allByAssociation?association_id='+this.props.context.user.id,this.props.context.user.authToken)
            .then(result => {
                if (!result || result.status) this.setState({myEvents: [], error:{message:"Error"}});
                else this.setState({myEvents: result})
            });
    }

    render() {
        const inactive = this.state.myEvents.length === 0;
        return (
            <div>
                <Button type="primary" onClick={this.openModal}>New event<Icon type="plus-circle"/></Button>
                {inactive && <Alert message="You created no events yet" type="info" showIcon />}
                <List bordered={true} dataSource={this.state.myEvents}
                      renderItem={item => (
                          <List.Item key="1">
                              <List.Item.Meta
                                  avatar={<Avatar src={item.urlImage} />}
                                  title={item.name}
                                  description={item.beginDate}
                              />
                              <Button type="danger" onClick={() => this.leaveEvent(item.id)} style={{marginRight:8}} ghost>Unregister</Button>
                              <Button type="primary"><NavLink to={'/events/'+item.name}>View event</NavLink><Icon type="right" /></Button>
                          </List.Item>

                      )}
                />
                <WrappedCreateEvent visible={this.state.newEventModal} close={this.closeModal}/>
            </div>
        );
    }
}

export default withUserContext(MyEventsPro);