import { v4 as uuidv4 } from 'uuid';

export const Mutation = {
    addClassroom: (parent, { addClassroomInput }, { db, pubsub }, info) => {
        const newClassroom = { id: uuidv4(), ...addClassroomInput };
        db.classroom.push(newClassroom);
        pubsub.publish('newClassroom', { newClassroom })
        return newClassroom;
    },

    addTodo: (parent, { addTodoInput }, { db, pubsub }, infos) => {
        if (!db.students.find(({ id }) => id == addTodoInput.studentId)) {
            //throwing error if id does not exists
            throw new Error(`student with id ${addTodoInput.studentId} does not exist`);
        }
        //creating new todo
        const id = db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1;
        const newTodo = {
            id,
            status: "WAITING",
            ...addTodoInput,
        };
        //push to db 
        db.todos.push(newTodo);
        //publich to subscribers
        pubsub.publish("todo", { todo: { todo: newTodo, mutation: "ADD" } });
        return newTodo;

    },

    updateTodo: (parent, { id, updateTodoInput }, { db, pubsub }, infos) => {

        if (
            updateTodoInput.studentId &&
            !db.students.find(({ id }) => id == updateTodoInput.studentId)
        ) {
            //throw error if trying to update to a student thatdoes not exists
            throw new Error(`Le user d'id ${updateTodoInput.studentId} n'existe pas`);
        }
        //finding old todo
        const todo = db.todos.find((todoItem) => todoItem.id === id);
        if (!todo) {
            //if not found throw error
            throw new Error(`Le todo d'id ${id} n'existe pas`);
        }
        //change values
        for (let key in updateTodoInput) {
            todo[key] = updateTodoInput[key];
        }
        //publishing to subscribers
        pubsub.publish("todo", { todo: { todo, mutation: "UPDATE" } });
        return todo;
    },

    deleteTodo: (parent, { id }, { db, pubsub }, infos) => {
        //finding the todo
        const indexTodo = db.todos.findIndex((todo) => todo.id === id);
        if (indexTodo === -1) {
            //if not found throw error
            throw new Error("Todo innexistant");
        }
        //removing from db
        const [todo] = db.todos.splice(indexTodo, 1);
        //publishing to subscribers
        pubsub.publish("todo", { todo: { todo, mutation: "DELETE" } });
        return todo;
    },
}

