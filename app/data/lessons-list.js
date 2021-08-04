const pool = require('../config/dbconfig');
const Lesson = require('./lesson');
const { getFilterParams } = require('../helpers/filterParams');

async function lessons(requestParams) {
    const filters = getFilterParams(requestParams)

    const sql = 'select * from lessons';
    const data = await pool.query(sql);
    var lessonArray = [];

    lessonArray = data.rows.map(async (lesson) => {
        // if (filters.status) {
            // if (lesson.status === filters.status) {
                let lessonItem = new Lesson(lesson.id, filters);
                lesson.teachers = await lessonItem.getTeachers();
                lesson.students = await lessonItem.getStudents();
                lesson.visitCount = lessonItem.countVisit;
                return lesson;
            // }
        // } else {
            // return lesson;
        // }
    });

    return lessonArray;
}

module.exports = lessons;