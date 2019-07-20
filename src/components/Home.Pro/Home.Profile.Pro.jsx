import React from 'react';
import {Card, Col, Icon, Input, Statistic} from "antd";
import {withUserContext} from "../../App";
import {PostQuery} from "../GetQuery";
import Typography from "antd/lib/typography";

class ProfilePro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.context.user.urlImage
        };
        this.updateLogo = this.updateLogo.bind(this);
    }

    updateLogo(url) {
        let asso = this.props.context.user;
        asso.urlImage = url;
        PostQuery("/association/update?email="+this.props.context.user.email, JSON.stringify(asso), asso.authToken)
            .then(() => this.setState({image: url}))
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <h2>My Profile</h2>
                <Typography.Text strong>{this.props.context.user.name}</Typography.Text>
                <Card style={{ width: 300, height: 300, backgroundImage: 'url("'+this.state.image+'")', backgroundSize: 300 }}/>
                <h4>URL:</h4> <Input.Search
                placeholder="http://www.url.com"
                enterButton="Update"
                size="default"
                onSearch={value => this.updateLogo(value)}
                />
                <Statistic style={{marginTop:10}} title="Members" value={this.props.context.user.volunteerDTOs.length} prefix={<Icon type="smile" />} />
            </div>
        );
    }
}

export default withUserContext(ProfilePro);