import React from 'react';
import {Alert, Icon, Typography} from 'antd';

class Error extends React.Component {
    constructor(props) {
        super(props);
        this.switch = this.switch.bind(this);
    }


    switch() {
        if (this.props.result === 0) {
            return <Alert message="No events yet for this association !" type="error" showIcon/>
        } else {
            return (
                <div>
                    <Icon type="warning" style={{ fontSize: '64px', color: '#FF7373' }}/><Icon type="frown" style={{ fontSize: '64px', color: '#FF7373' }}/>
                    <Typography.Title style={{ color: '#FF7373' }} level={3}>Oh no ! It seems like we couldn't fulfill your request.</Typography.Title>
                </div>
            );
        }
    }

    render() {
        return (
            <div name="error">
                {this.switch()}
            </div>
        );
    }
}

export default Error;