const express = require("express");
const router = express.Router();

const account = require("../controllers/accountController");
const validate = require("../validations/mw");
const accountValidation = require("../validations/account");

router.get("/login", account.getLoginPage);

router.get("/sign-up", account.getSignupPage);

router.post("/login", validate(accountValidation.signin), account.login);

router.post("/sign-up", validate(accountValidation.signup), account.signup);

router.post("/log-out", account.logout);

module.exports = router;
