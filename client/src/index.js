import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import App from './App';

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' })

render(
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);