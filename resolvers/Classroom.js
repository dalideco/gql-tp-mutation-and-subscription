export const Classroom = {
    students: ( classroom, _ , { db }  ) => {
        return db.students.filter(
            (student) => student.classroom == classroom.id
        );
    }
}
