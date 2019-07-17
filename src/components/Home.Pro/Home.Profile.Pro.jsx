import React from 'react';
import {Card, Col, Input} from "antd";
import {withUserContext} from "../../App";
import {PostQuery} from "../GetQuery";

class ProfilePro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.context.user.urlImage
        }
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
            <div>
                <h2>My Profile</h2>
                <Card style={{ width: 300, height: 300, backgroundImage: 'url("'+this.state.image+'")', backgroundSize: 300 }}/>
                <h4>URL:</h4> <Input.Search
                placeholder="http://www.url.com"
                enterButton="Update"
                size="default"
                onSearch={value => this.updateLogo(value)}
                />
            </div>
        );
    }
}

export default withUserContext(ProfilePro);