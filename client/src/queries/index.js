import { gql } from 'apollo-boost';

export const login = gql`
    query UserLogin {
        login (userInput: {
            email: "",
            password: ""
        }) {
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
`;

export const getCurrentUser = gql`
    {
        currentUser {
            email

        }
    }
`

export const getEvents = gql`
    query getEvents {
        events {
            _id
            title
            description
            creator {
                _id
                email
            }
        }
    }
`;