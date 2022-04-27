import {GraphQLServer, PubSub} from 'graphql-yoga'
import { Query } from './resolvers/Query.js'
import { Mutation } from './resolvers/Mutation.js'
import { Subscription } from './resolvers/Subscription.js'
import { Student } from './resolvers/Student.js'
import { db } from './data/db.js';
// ... or using "require()"
// const { GraphQLServer } = require('graphql-yoga')
const typeDefs = "schema/schema.graphql";
const resolvers = {
    Query,
    Student,
    Mutation,
    Subscription
};
const pubsub = new PubSub();
const context = {
    db,
    pubsub
}
const server = new GraphQLServer({ typeDefs, resolvers, context })
server.start(() => console.log('Server is running on localhost:4000'))
