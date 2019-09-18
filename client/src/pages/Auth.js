import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { EVENTS } from '../queries/';

class AuthPage extends Component {
    render() {
        return (
            <div>
                <h1 className="red-text ">Auth Page</h1>
                <Query query={EVENTS}>
                    {({ loading, error, data }) => {
                        if(loading) return (<h4>Loading...</h4>);
                        if(error) console.log(error);

                        console.log(data);
                        return (<p>Finished Loading...</p>)
                    }}
                </Query>
            </div>
        )
    }
}

export default AuthPage;