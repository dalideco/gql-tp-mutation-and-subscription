

export const Student = {
    classroom: ( student, _ , { db }  ) => {
        return db.classroom.find(
            (classroom) => classroom.id == student.classroom
        );
    }
}
