import { Resolver, Query } from 'type-graphql';

import { Event, EventModel } from '../entities/event';

@Resolver()
export class EventResolver {
    // Get all Events
    @Query(() => [Event])
    async events(): Promise<Event[]> {
        return await EventModel.find({}).populate({ path: "creator" });
    }
}