require("dotenv").config();

const express = require("express");
const session = require("express-session");
const uuid = require("uuid");
const app = express();
const port = process.env.port || 3000;
const flash = require("connect-flash");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		cookie: {
			maxAge: 60000,
		},
		saveUninitialized: false,
		resave: false,
		genid: function (req) {
			return uuid.v4();
		},
	})
);
app.use(flash());
app.use(function (req, res, next) {
	res.locals.errors = req.flash("errors");
	next();
});

app.get(
	"/",
	(req, res, next) => {
		if (req.session.userId) {
			next();
		} else {
			return res.redirect("/accounts/login");
		}
	},
	(req, res) => res.render("home")
);
app.use("/accounts", require("./routes/accounts"));

app.listen(port, () => console.log(`App listening in port ${port}`));
