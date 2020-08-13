const express = require('express');
// const authController = require('../controller/authController');
const examController = require('../controller/examController');
const qusetionRouter = require('./questionRoutes');

const router = express.Router();

router.use('/:examId/qusetions', qusetionRouter);

router
  .route('/:id')
  .get(examController.getExam)
  .patch(examController.updateExam)
  .delete(examController.deleteExam);

router
  .route('/')
  .get(examController.getAllExam)
  .post(examController.createExam);

module.exports = router;
