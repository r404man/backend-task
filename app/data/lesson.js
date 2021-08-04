const pool = require('../config/dbconfig');

class Lesson {
    teachers = [];
    students = [];
    countVisit = 0;
    filterParams = {}

    constructor(id, filterParams) {
        this.id = id;
        this.filterParams = filterParams;

        this.getStudents()
            .then((data) => {
                this.students = data;
            })
            .finally(() => {
                this.visitCounter();
            })

        this.getTeachers()
            .then((data) => {
                this.teachers = data;
            })
    }

    async getTeachers() {
        const sql = "select t.id, t.name from lesson_teachers lt right join teachers t on lt.teacher_id = t.id where lt.lesson_id = $1;";
        const data = await pool.query(sql, [this.id]);
        // console.log("teachers", data.rows)
        return data.rows;
    }

    async getStudents() {
        const sql = `select s.id, ls.visit, s.name from lesson_students ls right join students s on ls.student_id = s.id where ls.lesson_id = $1;`;
        const data = await pool.query(sql, [this.id])

        // console.log("students", data.rows)
        return data.rows;
    }

    visitCounter() {
        this.students.map((student) => {
            if (student.visit === true) {
                this.countVisit++;
                // console.log("counter", this.countVisit);
            }
            return
        })
    }
}

module.exports = Lesson;