import React, { Component } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBCardHeader } from 'mdbreact';
import Elipsis from '../loaders/Elipsis';
import { Link } from 'react-router-dom';

class LoginForm extends Component {

    state = {
        emailInput: '',
        passwordInput: '',
        elipsisToggle: false
    };

    toggleElipsis = () => {
        this.setState(prevState => ({
            elipsisToggle: !prevState.elipsisToggle
        }))
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    

    handleSubmit = (event) => {
        event.preventDefault();
        this.toggleElipsis();

        // Submit Data
    }

    render() {
        return (
            <MDBCard>
    
                <MDBCardHeader  color="unique-color-dark">
                    <p className="pt-3 blue-text text-center">LOGIN</p>
                </MDBCardHeader>
    
                <MDBCardBody className="mx-1">
    
                    <form onSubmit={this.handleSubmit}>
                        <MDBInput 
                        label="Email address" 
                        group
                        icon="envelope" 
                        type="email"
                        name="emailInput"
                        value={this.state.emailInput}
                        onInput={this.handleChange}
                        validate 
                        />
                        
                        <MDBInput
                            label="Password"
                            group
                            icon="lock"
                            type="password"
                            name="passwordInput"
                            onInput={this.handleChange}
                            value={this.state.passwordInput}
                            validate
                            containerClass="mb-0"
                        />
        
                        <p className="font-small grey-text d-flex justify-content-end">
                            Forgot
                            <Link
                                to="/auth/reset-password" className="dark-grey-text font-weight-bold ml-1"
                            >
                                Password?
                            </Link>
                        </p>
        
                        <div className="mb-4 mt-5 text-center">
                        { this.state.elipsisToggle ? (<Elipsis color="#007bff" />) :
                            (<MDBBtn
                                color="blue"
                                type="submit"
                                className="btn-block z-depth-2"
                            >
                                Login
                            </MDBBtn>)
                        }
                        </div>
                    </form>
    
                    <p className="font-small grey-text d-flex justify-content-center">
                        Don't have an account?
                        <Link
                            to="/auth/signup"
                            className="dark-grey-text font-weight-bold ml-1"
                        >
                            Sign up
                        </Link>
                    </p>
                    
                </MDBCardBody>
            </MDBCard>
        );
    }
};

export default LoginForm;