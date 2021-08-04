const express = require('express');
const router = express.Router();
const { getLessons } = require('../controllers/lessons.controller');

router.get('/', getLessons)

module.exports = router;