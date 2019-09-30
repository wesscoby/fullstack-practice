import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import Elipsis from '../components/loaders/Elipsis';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

const EventsPage = ({ data: { loading, events } }: any) => (
    <div>
        <h1>Events Page</h1>
        {(loading) ? (<Elipsis color="#003398" />) : events.map(
            (event: Event) => (<div 
            style={{ border: "1px solid #003398", borderRadius: "15px", marginBottom: "5px" }} 
            key={event.id}>
                <div style={{ padding: "5px" }}>
                    <h3>{event.title}</h3>
                    <strong>{event.description}</strong>
                    <p>{event.date}</p>
                    <strong>¢{event.price}</strong>
                </div>
            </div>)
        )}
    </div>
)


const EventsQuery = gql`{
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
}`

export default graphql(EventsQuery)(EventsPage);