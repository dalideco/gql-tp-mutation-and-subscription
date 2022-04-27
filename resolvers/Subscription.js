export const Subscription = {
    newClassroom: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('newClassroom');
        }
    }
}
