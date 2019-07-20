import React from 'react';
import {Alert, Avatar, Button, Icon, List} from 'antd';
import {GetQuery, PostQuery} from "../GetQuery";
import {NavLink} from "react-router-dom";
import {withUserContext} from "../../App";

class MyAssociations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myAssociations: []
        };
        this.getMyAssociations = this.getMyAssociations.bind(this);
        this.leaveAsso = this.leaveAsso.bind(this);
        this.getMyAssociations();
    }

    getMyAssociations() {
        GetQuery('/volunteer/allAssocaition?email='+this.props.context.user.email,this.props.context.user.authToken)
            .then(result => {
                if (!result || result.status) this.setState({myAssociations: [], error:{message:"Error"}});
                else this.setState({myAssociations: result})
            });
    }

    leaveAsso(assoId) {
        let route = "/association/removeVolunteer?association_id="+assoId+"&volunteer_id="+this.props.context.user.id;
        PostQuery(route,"", this.props.context.user.authToken)
            .then(() => this.getMyAssociations())

    }

    render() {
        const inactive = this.state.myAssociations.length === 0;
        return (
            <div>
                {inactive && <Alert message="You're not registered to any associations yet" type="info" showIcon />}
                <List bordered={true} dataSource={this.state.myAssociations}
                      renderItem={item => (
                          <List.Item key="1">
                              <List.Item.Meta
                                  title={item.name}
                                  description={item.description}
                              />
                              <Button type="danger" style={{marginRight:8}} onClick={() => this.leaveAsso(item.id)} ghost>Unregister</Button>
                              <Button type="primary"><NavLink style={{color:'#fff'}} to={'/associations/'+item.name}>View association</NavLink><Icon type="right" /></Button>
                          </List.Item>

                      )}
                />
            </div>
        );
    }
}

export default withUserContext(MyAssociations);