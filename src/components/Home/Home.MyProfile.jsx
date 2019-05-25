import React from 'react';
import { Card, Typography } from 'antd';

class MyProfile extends React.Component {

    render() {
        return(
            <Card>
                <h4>First Name:</h4><Typography>Richard</Typography>
                <h4>Last Name:</h4><Typography>Nixon</Typography>
                <h4>Address:</h4><Typography.Paragraph editable>9, rue des écureuils</Typography.Paragraph>
                <h4>City:</h4><Typography.Paragraph editable>Sevran</Typography.Paragraph>
                <h4>ZIP:</h4><Typography.Paragraph editable>93270</Typography.Paragraph>
            </Card>
        );
    }
}

export default MyProfile