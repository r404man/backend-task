function getFilterParams(filter = {}) {
    return {
        date: filter.date || null,
        status: filter.status || null,
        teachersIds: filter.teachersIds || null,
        studentsCount: filter.studentsCount || null,
        page: filter.page || 1,
        lessonPerPage: filter.lessonPerPage || 5,
    }
}

module.exports = {
    getFilterParams,
}