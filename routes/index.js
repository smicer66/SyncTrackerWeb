var express = require('express');
var router = express.Router();

var RegisterController = require("../controllers/register.controller");
var UserController = require("../controllers/user.controller");

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/login1", function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post("/login", UserController.login);


router.get("/sign-up", function(req, res) {
  res.render('signup', { title: 'Express' });
});


router.post("/sign-up", RegisterController.register);
/*router.get("/sign-up", function(req, res) {
  const { email, password } = req.body;

  // TODO: authenticate user
  console.log(email, password);

  res.send("Login submitted");
});*/


router.get("/otp", function(req, res) {
  res.render('otp', { title: 'Express' });
});


router.get("/dashboard", function(req, res) {
  res.render('dashboard', { title: 'Express' });
});

module.exports = router;
