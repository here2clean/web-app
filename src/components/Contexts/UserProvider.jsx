import React, {createContext} from "react";

class UserProvider extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;

