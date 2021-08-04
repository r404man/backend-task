const { getRequestParams } = require('../helpers/requestParams');
const lessons = require('../data/lessons-list');

async function getLessons(req, res) {
    const reqParams = getRequestParams(req);

    const data = await lessons(reqParams.queryParams);
    var lessonArray = await Promise.all(
        data.map(async (lesson) => (lesson))
    );
    console.log(lessonArray);
    res.send(lessonArray);
}



module.exports = {
    getLessons,
}
