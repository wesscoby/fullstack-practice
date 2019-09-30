import { gql } from 'apollo-boost';

//! Event Mutations
export const newEventMutation = gql`
mutation newEventMutation(
    $title: String!, 
    $description: String!, 
    $price: Float!, 
    $date: DateTime!
) {
    createEvent(newEventInput: {
        title: $title,
        description: $description,
        price: $price,
        date: $date 
    }) {
        id
        title
        description
        price
        date
        creator {
            name
            email
        }
        createdAt
        updatedAt
    }
}`;

//! User Mutations
export const newUserMutation = gql`
mutation newUserMutation(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!
) {
    register(newUserInput: {
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password
    }) {
        id
        name
        email
        createdAt
        updatedAt
    }
}`; 

//! Booking Mutations
export const bookEventMutation = gql`
mutation bookEventMutation($eventId: String!) {
    bookEvent(eventId: $eventId) {
        id
        createdAt
        updatedAt
        user {
            name
        }
        event {
            title
        }
    }
}`;