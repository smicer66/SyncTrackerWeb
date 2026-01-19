var RegisterService = require("../services/register.service");


exports.register = async function(req, res, next) {
    // get required variables from request body
    // using es6 object destructing
    const { clientName, mobileNumber, emailAddress, password, confirmPassword } = req.body;
    try {
        // create an instance of a user
		var data = await RegisterService.postRegisterNewCustomer(req, res, next);
        
    } catch (err) {
		console.log(err);
        return res.status(400).json({status: 400, message: "General system error experienced"})
    }
    res.end();
}