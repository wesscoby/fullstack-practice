import gql from 'graphql-tag';

export const LOGIN = gql`
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

export const EVENTS = gql`
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