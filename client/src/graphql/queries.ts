import { gql } from 'apollo-boost';

//! Event Queries
export const getEventQuery = gql`
query getEventQuery($eventId: String!) {
    event(eventId: $eventId) {
        id
        title
        description
        price
        date
        creator {
            name
            email
        }
    }
}`;

export const getAllEventsQuery = gql`
query getAllEventsQuery {
    events {
        id
        title
        description
        price
        date
        creator {
            name
            email
        }
    }
}`;

//! User Queries
export const userLoginQuery = gql`
query userLoginQuery($email: String!, $password: String!) {
    login(loginInput: {
        email: $email,
        password: $password
    }) {
        id
        name
        email
        updatedAt
    }
}`;

export const getCurrentUserQuery = gql`
query getCurrentUserQuery {
    currentUser {
        id
        name
        email
    }
}`;

export const getAllUsersQuery = gql`
query getAllUsersQuery {
    users {
        id
        email
        name
        createdEvents {
        title
        }
    }
}`;

export const userLogoutQuery = gql`
query userLogoutQuery {
    {
        logout
    }
}`;

//! Booking Queries
export const getBookingQuery = gql`
query getBookingQuery($bookingId: String!) {
    booking(bookingId: $bookingId) {
        id
        user {
            id
            name
            email
        }
        event {
            id
            title
            date
        }
}
}`;

export const getAllBookingsQuery = gql`
query getAllBookingsQuery {
    bookings {
        id
        user {
            id
            name
            email
        }
        event {
            id
            title
            date
        }
    }
}`;