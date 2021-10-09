const { body } = require("express-validator");

const signup = [
	body("username")
		.trim()
		.isLength({ min: 2, max: 20 })
		.withMessage("Username must have 2-20 characters"),
	body("password")
		.isStrongPassword()
		.withMessage(
			"Password must be minimum of 8 characters and contain an upppercase, lowercase, number, and a symbol."
		),
	body("confirmPassword")
		.custom((value, { req }) => {
			return value === req.body.password;
		})
		.withMessage("Passwords do not match"),
];

const signin = [
	body("username")
		.trim()
		.isLength({ min: 2, max: 20 })
		.withMessage("Username must have 2-20 characters"),
	body("password")
		.not()
		.isEmpty()
		.withMessage("Password field must not be empty"),
];

module.exports = {
	signup,
	signin,
};
