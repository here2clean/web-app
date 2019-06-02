import React from 'react';
import {Button, Icon, List} from 'antd';

class MyAssociations extends React.Component {

    render() {
        return (
            <List bordered={true}>
                <List.Item>
                    <img style={{height:50}}src="https://www.blog.spoongraphics.co.uk/wp-content/uploads/2010/transparency-logos/15.jpg"/>
                    <List.Item.Meta
                        title="Street Cleaners"
                    />
                    <Button type="danger" style={{marginRight:8}} ghost>Unregister</Button>
                    <Button type="primary">View association<Icon type="right" /></Button>
                </List.Item>
                <List.Item>
                    <img style={{height:50}}src="https://www.blog.spoongraphics.co.uk/wp-content/uploads/2010/transparency-logos/15.jpg"/>
                    <List.Item.Meta
                        title="Street Cleaners"
                    />
                    <Button type="danger" style={{marginRight:8}} ghost>Unregister</Button>
                    <Button type="primary">View association<Icon type="right" /></Button>
                </List.Item>
            </List>
        );
    }
}

export default MyAssociations;