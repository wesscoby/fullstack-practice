import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdbreact';

import { LoginForm, SignUpForm, ResetPasswordForm } from '../components';


class AuthPage extends Component {

    render() {
        return (
            <Router>
                <MDBRow className="auth-page d-flex flex-row justify-content-center align-items-center">
                    <MDBCol 
                        xs="12" sm="11" md="8" lg="6" 
                        className="_col d-flex flex-row justify-content-center align-items-center"
                    >
                        <Switch>
                            <Redirect from="/auth" to="/auth/login" exact />
                            <Route path="/auth/login" component={LoginForm} />
                            <Route path="/auth/signup" component={SignUpForm} />
                            <Route path="/auth/reset-password" component={ResetPasswordForm} />
                        </Switch>
                    </MDBCol>
                </MDBRow>
            </Router>
        )
    }
}

export default AuthPage;