const express = require('express');
// const authController = require('../controller/authController');
const examController = require('../controller/examController');
const questionRouter = require('./questionRoutes');

const router = express.Router();

router.use('/:examId/questions', questionRouter);

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
