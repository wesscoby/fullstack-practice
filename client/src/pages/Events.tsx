import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import Elipsis from '../components/loaders/Elipsis';
import { MDBRow, MDBCol } from 'mdbreact';

interface Creator {
    name: string;
    email: string;
    id: string;
}

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    price: number;
    creator: Creator;
    createdAt: Date;
    updatedAt: Date;
}

const pageStyle = {
    border: "1px solid #003398", 
    borderRadius: "15px", 
    marginBottom: "10px",
    boxShadow: "2px 2px 5px 4px #eee"
}

const EventsPage = ({ data: { loading, events } }: any) => (
    <div>
        <h1>Events Page</h1>
        <div>
        {
            (loading) ? 
            (<Elipsis color="#003398" />) :
            (<MDBRow className="d-flex flex-row justify-content-around">
                {events.map(
                    (event: Event) => (
                        <MDBCol xs="10" sm="10" md="10" lg="5" xl="5"
                            className="bg-dark text-primary" 
                            style={pageStyle} 
                            key={event.id}
                        >
                            <div style={{ padding: "10px" }}>
                                <h3>{event.title}</h3>
                                <p className="lead">{event.description}</p>
                                <p>{event.date}</p>
                                <strong>¢{event.price}</strong>
                                <p>By {event.creator.name} <span>({event.creator.email})</span></p>
                            </div>
                        </MDBCol>
                    )
                )}
            </MDBRow>)
        }
        </div>
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