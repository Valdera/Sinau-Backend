const express = require('express');
const questionController = require('../controller/questionController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(questionController.getAllQuestion)
  .post(
    questionController.uploadQuestionImage,
    questionController.createQuestion
  );

router
  .route('/:id')
  .get(questionController.getQuestion)
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

module.exports = router;
