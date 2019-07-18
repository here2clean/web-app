import React from 'react';
import {Alert, Avatar, Button, DatePicker, Icon, Input, List, Modal} from 'antd';
import {GetQuery, PostQuery} from "../GetQuery";
import {withUserContext} from "../../App";
import {WrappedCreateEvent} from "./Home.CreateEvent.Pro";
import EventDrawerPro from "./EventDrawer.Pro";

class MyEventsPro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myEvents: [],
            newEventModal: false,
            drawerData: []
        };

        this.getMyEvents = this.getMyEvents.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.getMyEvents();

    }

    openModal() {
        this.setState({newEventModal: true})
    }

    closeModal() {
        this.setState({newEventModal: false})
    }

    openDrawer(drawerData) {
        this.setState({drawer: true,
            drawerData: drawerData});
    }

    closeDrawer() {
        this.setState({drawer: false});
    }

    getMyEvents() {
        GetQuery('/event/allByAssociation?association_id='+this.props.context.user.id,this.props.context.user.authToken)
            .then(result => {
                if (!result || result.status) this.setState({myEvents: [], error:{message:"Error"}});
                else this.setState({myEvents: result})
            });
    }

    deleteEvent(id) {
        PostQuery('/event/delete?id='+id, "", this.props.context.user.authToken)
            .then(() => this.getMyEvents())
    }

    render() {
        const inactive = this.state.myEvents.length === 0;
        const IconText = ({ type, style, text }) => (
            <span style={style}>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
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
                                  description={item.beginDate.substring(0,10)}
                              />
                              <IconText type="team" style={{marginRight:8}} text={item.nbVolunteer} />
                              <Button type="danger" onClick={() => this.deleteEvent(item.id)} style={{marginRight:8}}>Delete</Button>
                              <Button type="primary" onClick={() => this.openDrawer(item)}>View event<Icon type="right" /></Button>
                          </List.Item>

                      )}
                />
                <WrappedCreateEvent visible={this.state.newEventModal} close={this.closeModal}/>
                <EventDrawerPro visible={this.state.drawer} close={this.closeDrawer} data={this.state.drawerData}/>
            </div>
        );
    }
}

export default withUserContext(MyEventsPro);