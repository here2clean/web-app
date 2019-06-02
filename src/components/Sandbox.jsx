import React from 'react';
import {GetQuery} from './GetQuery';

class Sandbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        GetQuery("/association/all").then(data =>
            this.setState({data: data})
        )
    }


    render() {
        if (this.state.data !== null) {
            return (
                <span>{this.state.data.map(item => <span>{item.description}</span>)}

                </span>
            );
        } else {
            return null;
        }
    }
}

export default Sandbox;