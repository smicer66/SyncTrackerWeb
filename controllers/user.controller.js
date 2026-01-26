var session = require('express-session');
var UserService = require("../services/user.service");



exports.login = async function(req, res, next) {
    // get required variables from request body
    // using es6 object destructing
    const { username, remember, password } = req.body;
    try {
        // create an instance of a user
		//req, res, next
		/*await RegisterService.postRegisterNewCustomer(req.body).then((data) => {
			console.log("response");
			console.log(data);
			if(data.status==0)
			{
				req.session.redirectData = data;
				res.redirect('/otp');
				//return res.status(200).json(data);
			}
			else
			{
				req.session.redirectData = data;
				res.redirect('back');
			}	
		});*/
		
		try {
			console.log("<<<<<<<<<<<<<<<<<<<<<<<<<");
			//const aa = await 
			//var client = req.session.client;
			//console.log(client.responseObject.client);
			return UserService.postLogin(req, res, next);
			//console.log(">>>>>>d>>>>>>>>>>>>");
			//console.log(res.json());
			//res.status(200).json(result);
		} catch (err) {
			next(err);
		}
		
    } catch (err) {
		console.log(err);
        return res.status(400).json({status: 400, message: "General system error experienced"})
    }
    res.end();
}


exports.postOTP = async function(req, res, next) {
    const { otp1, otp2, otp3, otp4, otp5, otp6, token, clientCode } = req.body;
    try {
        
		
		try {
			return UserService.postOTP(req, res, next);
		} catch (err) {
			next(err);
		}
		
    } catch (err) {
		console.log(err);
        return res.status(400).json({status: 400, message: "General system error experienced"})
    }
    res.end();
}