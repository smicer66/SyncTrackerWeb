var session = require('express-session');
var express = require('express');
var router = express.Router();

var RegisterController = require("../controllers/register.controller");
var UserController = require("../controllers/user.controller");
var EmploymentController = require("../controllers/employment.controller");

function isAuthenticated (req, res, next) {
  if (req.session.token)
  {
	  next();
  }
  else{
	  console.log("Redirect to login page");
	  return res.redirect('/login');
  }
}
/* GET home page. */
router.get('/login', function(req, res, next) {
	//console.log(req.session.client);
	if(req.session.client!=null)
	{
		res.render('index', { title: 'Express' });
	}
	else
	{
		res.render('signup', { title: 'Express' });
	}
});

router.get("/redirect", EmploymentController.getRedirect);

/*router.get("/login", function(req, res) {
  res.render('index', { title: 'Express' });
});*/

router.post("/login", UserController.login);


router.get("/sign-up", function(req, res) {
  res.render('signup', { title: 'Express' });
});

router.get("/admin/employees", isAuthenticated, EmploymentController.getEmployeeList);
router.post("/admin/create-new-employee", EmploymentController.postCreateNewEmployee);
router.get("/admin/employee-leave-request", isAuthenticated, EmploymentController.getEmployeeLeaveRequest);
router.post("/admin/create-new-employee-leave-request", EmploymentController.postEmployeeLeaveRequest);
router.post("/admin/update-employee-leave-request-status", EmploymentController.postUpdateEmployeeLeaveRequestStatus);
router.delete("/admin/delete-employee-leave-request/:id", EmploymentController.deleteUpdateEmployeeLeaveRequest);

router.post("/sign-up", RegisterController.register);
/*router.get("/sign-up", function(req, res) {
  const { email, password } = req.body;

  // TODO: authenticate user
  //console.log(email, password);

  res.send("Login submitted");
});*/


router.get("/otp/:token/:clientCode", session, function(req, res) {
	var token = req.params.token;
	var clientCode = req.params.clientCode;
	res.render('otp', { token: token, clientCode: clientCode });
});


router.post("/otp/:token/:clientCode", UserController.postOTP);


router.get("/dashboard", function(req, res) {
	//console.log(req.session);
  res.render('dashboard', { title: 'Express' });
});

module.exports = router;
