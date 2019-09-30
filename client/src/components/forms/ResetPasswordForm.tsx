import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBCardHeader } from 'mdbreact';

import { Elipsis } from '../';
import { FormState } from "../../interface/state";

class ResetPasswordForm extends Component<any> {

    state: FormState = {
        emailInput: '',
        elipsisToggle: false
    };

    toggleElipsis = () => {
        this.setState((prevState: FormState) => ({
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
                    <p className="pt-3 blue-text text-center">PASSWORD RESET</p>
                </MDBCardHeader>
    
                <MDBCardBody className="mx-1">
    
                    <form onSubmit={this.handleSubmit}>
                        <MDBInput 
                            label="Email Address"
                            group
                            icon="envelope" 
                            type="email"
                            name="emailInput"
                            value={this.state.emailInput}
                            onInput={this.handleChange}
                            validate 
                        />
        
                        <p className="font-small grey-text d-flex justify-content-end">
                            Don't have an account?
                            <Link
                                to="/auth/signup" 
                                className="dark-grey-text font-weight-bold ml-1"
                            >
                                Sign Up
                            </Link>
                        </p>
        
                        <div className="mb-4 mt-5 text-center">
                        { this.state.elipsisToggle ? 
                            (<Elipsis color="#007bff" />) :
                            (<MDBBtn
                                color="red"
                                type="submit"
                                className="btn-block z-depth-2"
                            >
                                Reset Password
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

export default ResetPasswordForm;