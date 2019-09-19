import React, { Component } from "react";
import { 
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, 
    MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon 
} from "mdbreact";



class MainNavigation extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }

    render() {
        return (
            <header className="main-navigation">
                <MDBNavbar fixed="top" color="unique-color-dark" dark expand="lg">
                    <MDBNavbarBrand href="/" className="brand">
                        <strong className="blue-text">EasyEvents</strong>
                    </MDBNavbarBrand>

                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    
                    <MDBNavbarNav right className="nav-1">
                        <MDBNavItem>
                            <MDBNavLink to="/auth">
                            <MDBIcon icon="sign-in-alt" className="mr-1"/>
                                Login
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/events">
                            <MDBIcon far icon="calendar-alt" className="mr-1"/>
                                Events
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/bookings">
                            <MDBIcon icon="book-open" className="mr-1"/>
                                Bookings
                            </MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>

                    <MDBNavbarNav right className="nav-2">
                    <MDBNavItem>
                        <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                            <MDBIcon icon="user" className="mr-1" />Username
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default">
                            <MDBDropdownItem href="#!">Logout</MDBDropdownItem>
                        </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                    </MDBNavbarNav>

                </MDBCollapse>
                </MDBNavbar>
            </header>
        );
    }
}

export default MainNavigation;