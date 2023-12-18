const express = require('express');
const loanController = require('../controllers/loanController');

const router = express.Router();

router.get('/loans', LoanController.getAllLoans);
router.get('/loans/:id', LoanController.getLoanById);
router.post('/loans', LoanController.createLoan);
router.put('/loans/:id', LoanController.updateLoan);
router.delete('/loans/:id', LoanController.deleteLoan);

module.exports = router;
