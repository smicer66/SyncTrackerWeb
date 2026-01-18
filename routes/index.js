var express = require('express');
var router = express.Router();

import { Register } from "../controllers/register.js";

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/login1", function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post("/logi1n", function(req, res) {
  const { email, password } = req.body;

  // TODO: authenticate user
  console.log(email, password);

  res.send("Login submitted");
});


router.get("/sign-up", function(req, res) {
  res.render('signup', { title: 'Express' });
});


router.post("/sign-up", Register);
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
