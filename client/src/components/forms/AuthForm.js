import React, { Component } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBCardHeader } from 'mdbreact';
import Elipsis from '../loaders/Elipsis';

class AuthForm extends Component {

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

        const requestBody = {
            query: `
                query {
                    login(userInput: { 
                        email: "${this.state.emailInput}", 
                        password: "${this.state.passwordInput}"}
                    ) {
                        status
                        ... on LoginSuccess {
                            _id
                            email
                        }
                        ... on LoginFailure {
                            message
                        }
                    }
                }
            `
        }
        console.log(requestBody)
        console.log(this.state)

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.toggleElipsis();
            console.log(data);
        })
        .catch(console.log);
    }

    render() {
        return (
            <MDBCard>
    
                <MDBCardHeader  color="unique-color-dark">
                    <h3 className="p-2">Login</h3>
                </MDBCardHeader>
    
                <MDBCardBody className="mx-1">
    
                    <form onSubmit={this.handleSubmit}>
                        <MDBInput 
                        label="Your email" 
                        group 
                        type="text"
                        name="emailInput"
                        value={this.state.emailInput}
                        onInput={this.handleChange}
                        validate 
                        />
                        
                        <MDBInput
                            label="Your password"
                            group
                            type="password"
                            name="passwordInput"
                            onInput={this.handleChange}
                            value={this.state.passwordInput}
                            validate
                            containerClass="mb-0"
                        />
        
                        <p className="font-small grey-text d-flex justify-content-end">
                            Forgot
                            <a
                                href="#!" className="dark-grey-text font-weight-bold ml-1"
                            >
                                Password?
                            </a>
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
                        <a
                            href="#!"
                            className="dark-grey-text font-weight-bold ml-1"
                        >
                            Sign up
                        </a>
                    </p>
                    
                </MDBCardBody>
            </MDBCard>
        );
    }
};

export default AuthForm;