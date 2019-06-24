import React from 'react';
import {Icon, Typography} from 'antd';

class Error extends React.Component {

    render() {
        return (
            <div name="error">
                <Icon type="warning" style={{ fontSize: '64px', color: '#FF7373' }}/><Icon type="frown" style={{ fontSize: '64px', color: '#FF7373' }}/>
                <Typography.Title style={{ color: '#FF7373' }} level={3}>Oh no ! It seems like we couldn't fulfill your request.</Typography.Title>
            </div>
        );
    }
}

export default Error;