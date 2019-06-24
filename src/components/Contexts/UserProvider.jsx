import React, {createContext} from "react";

export const UserContext = createContext({
    user: null,
    setUser: () => {}
});

class UserProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            setUser: (user) => this.setState({user: user})
        };
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

export function withUserContext(Component) {
    return function contextComponent(props) {
        return (
            <UserContext.Consumer>
                {context => <Component {...props} context={context}/>}
            </UserContext.Consumer>
        )
    }
}