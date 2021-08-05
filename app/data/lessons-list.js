const pool = require('../config/dbconfig');
const Lesson = require('./lesson');
const { getFilterParams } = require('../helpers/filterParams');

async function lessons(requestParams) {
    const filters = getFilterParams(requestParams);
    var lessonArray = await getLessonArray();
    
    if (filters.status != null) {
        lessonArray = await getStatusArray(lessonArray, filters);
    } else {
        lessonArray = await getLessonDetails(lessonArray, filters);
    }

    return lessonArray;
}

async function getLessonArray() {
    const sql = 'select * from lessons';
    const data = await pool.query(sql);

    return data.rows;
}

function getLessonDetails(lessonArray, filters = {}) {
    return lessonArray.map(async (lesson) => {
        let lessonItem = new Lesson(lesson.id, filters);
        
        lesson.teachers = await lessonItem.getTeachers();
        lesson.students = await lessonItem.getStudents();
        lesson.visitCount = lessonItem.countVisit;
        
        return lesson;
    });
}

async function getStatusArray(lessonArray, filters = {}) {
    return await getLessonDetails(
        lessonArray.filter((item) => (Number(filters.status) === item.status)),
        filters
    );
}

module.exports = lessons;