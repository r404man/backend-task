function getFilterParams(filter = {}) {
    return {
        date: filter.date,
        status: Number(filter.status),
        teachersIds: filter.teachersIds,
        studentsCount: filter.studentsCount,
        page: filter.page || 1,
        lessonPerPage: filter.lessonPerPage || 5,
    }
}

module.exports = {
    getFilterParams,
}