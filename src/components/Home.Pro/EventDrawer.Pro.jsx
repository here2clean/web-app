import React from 'react';
import {Drawer, List} from 'antd';
import PropTypes from 'prop-types';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import Geocode from "react-geocode";

class EventDrawerPro extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={this.props.close}
                visible={this.props.visible}
            >
                <h3>Title:</h3>{this.props.data.name}
                <h3>Description:</h3>{this.props.data.description}
                <h3>Location:</h3>{this.props.data.location}
                <h3>Participants:</h3>
                <List
                    size="small"
                    bordered
                    dataSource={this.props.data.volunteerDTOs}
                    renderItem={item => <List.Item>{item.firstName}&nbsp;{item.lastName}</List.Item>}
                />
            </Drawer>
        );
    }
}

export default EventDrawerPro;

EventDrawerPro.propTypes = {
    visible: PropTypes.bool.isRequired
};

