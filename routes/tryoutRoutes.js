const express = require('express');
const tryoutController = require('../controller/tryoutController');

const router = express.Router();

router
  .route('/')
  .get(tryoutController.getAllTryout)
  .post(tryoutController.createTryout);

router
  .route('/:id')
  .get(tryoutController.getTryout)
  .patch(tryoutController.updateTryout)
  .delete(tryoutController.deleteTryout);

module.exports = router;
