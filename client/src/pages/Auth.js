import React, { Component } from 'react';
// import { Query } from 'react-apollo';
    import { MDBRow, MDBCol } from 'mdbreact';
// import { getEvents } from '../queries/';
// import Spinner from '../components/loaders/Spinner';
// import Elipsis from '../components/loaders/Elipsis';
import AuthForm from '../components/forms/AuthForm';

class AuthPage extends Component {

    state = {

    }

    render() {
        return (
            <MDBRow className="auth-page d-flex flex-row justify-content-center align-items-center">
                <MDBCol 
                    xs="12" sm="11" md="8" lg="6" 
                    className="_col d-flex flex-row justify-content-center align-items-center"
                >
                    <AuthForm />
                </MDBCol>
            </MDBRow>
        )
    }
}

export default AuthPage;