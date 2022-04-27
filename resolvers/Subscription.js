export const Subscription = {
    newClassroom: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('newClassroom');
        }
    },
    todo: {
        subscribe(_,_args,{pubsub},_info){
            return pubsub.asyncIterator('todo')
        }
    }
}
