import React from 'react';

const UserContext = React.createContext();

class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isAuth: false };
    }

    render() {
        return (
            <UserContext.Provider
                value={{ isAuth: this.state.isAuth }}
            >
                {this.props.children}
            </UserContext.Provider>
        )
    }
}
const UserConsumer = UserContext.Consumer;
export { UserProvider, UserConsumer }