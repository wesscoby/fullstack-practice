import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./style/index.css";
import App from './App';

const client = new ApolloClient({ 
    link: new HttpLink({ uri: 'http://localhost:4000/graphql', credentials: 'include' }),
    cache: new InMemoryCache()
});

render(
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);