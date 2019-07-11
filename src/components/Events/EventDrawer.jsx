import React from 'react';
import {Drawer} from 'antd';
import PropTypes from 'prop-types';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import Geocode from "react-geocode";

class EventDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lng: null
        };
        Geocode.setApiKey("AIzaSyDynLIVjQtqVyT6mIcLw9n54Wa_E6KUDSA");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data.location !== prevProps.data.location) {
            Geocode.fromAddress(this.props.data.location).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    console.log(lat, lng);
                    this.setState({lat: lat, lng: lng});
                },
                error => {
                    console.error(error);
                }
            );
        }
    }

    render() {
        const { lat, lng } =  this.state;
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
                {
                    lat && lng && <Map google={this.props.google} zoom={17} initialCenter={{
                        lat: lat,
                        lng: lng
                    }}>
                        <Marker
                            name={this.props.data.title}
                            position={{lat: lat, lng: lng}}
                        />
                    </Map>
                }
            </Drawer>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDynLIVjQtqVyT6mIcLw9n54Wa_E6KUDSA"
})(EventDrawer);

EventDrawer.propTypes = {
    visible: PropTypes.bool.isRequired
};

