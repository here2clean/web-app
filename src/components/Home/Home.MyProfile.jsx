import React from 'react';
import { Card, Typography } from 'antd';
import {withUserContext} from "../../App";

class MyProfile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Card>
                <div>
                    <h4>First Name:</h4><Typography>{this.props.context.user.firstName}</Typography>
                    <h4>Last Name:</h4><Typography>{this.props.context.user.lastName}</Typography>
                    <h4>Address:</h4><Typography.Paragraph editable>{this.props.context.user.address}</Typography.Paragraph>
                    <h4>City:</h4><Typography.Paragraph editable>{this.props.context.user.city}</Typography.Paragraph>
                    <h4>ZIP:</h4><Typography.Paragraph editable>{this.props.context.user.cityCode}</Typography.Paragraph>
                </div>
            </Card>
        );
    }
}

export default withUserContext(MyProfile);