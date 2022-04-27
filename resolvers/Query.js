

export const Query = {
    hello: (parent, args, context, info) => {
        console.log('parent : ', parent);
        console.log('context : ', context);
        console.log('info : ', info);
        console.log('args : ', args);
        return `Hello ${args.name || 'World'}`;
    },
    infos: () => {
        return {
            name: 'Sellaouti',
            firstname: 'Aymen'
        }
    },
    getAllStudents: (parent, args, { db }) => {
        return db.students;
    },
    getStudent: (_, { id }, { db }) => {
        return db.students.find(
            (student) => student.id == id
        );
    },
    getAllClassroom: (parent, args, { db }) => {
        return db.classroom;
    },

    getTodos: (parent, args, { db }, info) => {
        return db.todos;
    },
}
