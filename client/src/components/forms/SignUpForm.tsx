import React, { Component } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBCardHeader } from 'mdbreact';
import Elipsis from '../loaders/Elipsis';
import { Link } from 'react-router-dom';
import { FormState } from "../../interface/state";

interface SignupFormState extends FormState {
    fullNameInput: string;
    passwordInput: string;
}

class SignUpForm extends Component {

    state: SignupFormState = {
        fullNameInput: '',
        emailInput: '',
        passwordInput: '',
        elipsisToggle: false
    };

    toggleElipsis = () => {
        this.setState((prevState: SignupFormState) => ({
            elipsisToggle: !prevState.elipsisToggle
        }))
    }

    handleChange = (event: any) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.toggleElipsis();

        // Submit Data
    }

    render() {
        return (
            <MDBCard>
    
                <MDBCardHeader  color="unique-color-dark">
                    <p className="pt-3 blue-text text-center">SIGN UP</p>
                </MDBCardHeader>
    
                <MDBCardBody className="mx-1">
    
                    <form onSubmit={this.handleSubmit}>

                        <MDBInput 
                            label="Full name"
                            group
                            icon="user" 
                            type="text"
                            name="fullNameInput"
                            value={this.state.fullNameInput}
                            onInput={this.handleChange}
                            validate 
                        />

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
                                Register
                            </MDBBtn>)
                        }
                        </div>
                    </form>
    
                    <p className="font-small grey-text d-flex justify-content-center">
                        Already have an account?
                        <Link
                            to="/auth/login"
                            className="dark-grey-text font-weight-bold ml-1"
                        >
                            Login
                        </Link>
                    </p>
                    
                </MDBCardBody>
            </MDBCard>
        );
    }
};

export default SignUpForm;