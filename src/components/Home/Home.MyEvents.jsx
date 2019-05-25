import React from 'react';
import {Button, Icon, List} from 'antd';

class MyEvents extends React.Component {

    render() {
        return (
            <List bordered={true}>
                <List.Item>
                    <img style={{height:50}}src="https://www.blog.spoongraphics.co.uk/wp-content/uploads/2010/transparency-logos/15.jpg"/>
                    <List.Item.Meta
                        title="Event"
                        description="Let's clean the streets of Paris all together !"
                    />
                    <Button type="danger" ghost>Unregister</Button>
                    <Button type="primary">View event<Icon type="right" /></Button>
                </List.Item>
                <List.Item>
                    <img style={{height:50}}src="https://www.blog.spoongraphics.co.uk/wp-content/uploads/2010/transparency-logos/15.jpg"/>
                    <List.Item.Meta
                        title="Event"
                        description="Let's clean the streets of Paris all together !"
                    />
                    <Button type="danger" ghost>Unregister</Button>
                    <Button type="primary">View event<Icon type="right" /></Button>
                </List.Item>
                <List.Item>
                    <img style={{height:50}}src="https://www.blog.spoongraphics.co.uk/wp-content/uploads/2010/transparency-logos/15.jpg"/>
                    <List.Item.Meta
                        title="Event"
                        description="Let's clean the streets of Paris all together !"
                    />
                    <Button type="danger" ghost>Unregister</Button>
                    <Button type="primary">View event<Icon type="right" /></Button>
                </List.Item>
                <List.Item>
                    <img style={{height:50}}src="https://www.blog.spoongraphics.co.uk/wp-content/uploads/2010/transparency-logos/15.jpg"/>
                    <List.Item.Meta
                        title="Event"
                        description="Let's clean the streets of Paris all together !"
                    />
                    <Button type="danger" ghost>Unregister</Button>
                    <Button type="primary">View event<Icon type="right" /></Button>
                </List.Item>
            </List>
        );
    }
}

export default MyEvents;