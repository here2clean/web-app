import React from 'react';
import {Drawer} from 'antd';
import PropTypes from 'prop-types';

class EventDrawer extends React.Component {
    render() {
        return (
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={this.props.close}
                visible={this.props.visible}
            >
                <h3>Title:</h3>{this.props.data.title}
                <h3>Desc:</h3>{this.props.data.desc}
            </Drawer>
        );
    }
}

export default EventDrawer;

EventDrawer.propTypes = {
    visible: PropTypes.bool.isRequired
};

