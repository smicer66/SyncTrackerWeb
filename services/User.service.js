var http = require('http');
var querystring = require('querystring');
const request = require('request');
//var fetch = require("node-fetch");


exports.postLogin = async function(req, res, next){
	
	console.log(allData);
	var allData = req.body;
	var clientName = allData.clientName;
	var mobileNumber = allData.mobileNumber;
	var emailAddress = allData.emailAddress;
	var password = allData.password;
	var confirmPassword = allData.confirmPassword;
	
	if(password!=confirmPassword)
	{
		//throw error on password
	}
	
	/*const response = await fetch("http://localhost:8080/api/vi/client/create-client", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
		"Authorization": "Bearer YOUR_TOKEN"
	  },
	  body: JSON.stringify({
		clientName: clientName,
		createUserRequest: {
			mobileNumber: mobileNumber,
			emailAddress: emailAddress,
			password: password
		}
	  })
	});
	const response = await fetch('http://localhost:8080/api/vi/client/create-client', {
		method: "POST",
		headers: {
		  "Content-Type": "application/json"
		},
		body: JSON.stringify({
			clientName: clientName,
			createUserRequest: {
				mobileNumber: mobileNumber,
				emailAddress: emailAddress,
				password: password
			}
		})
	});*/
  
	const response = await request({
		url: 'http://localhost:8080/api/vi/client/create-client',
		method: "POST",
		json: {
			clientName: clientName,
			createUserRequest: {
				mobileNumber: mobileNumber,
				emailAddress: emailAddress,
				password: password
			}
		}
	}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(body);
			//return res.json({"status": 0, "message": 'Your new SyncTracker account has been created successfully. We have sent you an email'+ 
			//	'containing a 6-digit code. Enter the code to activate your account.'});
			return res.redirect('/login');
        }
        else {

            console.log("error: " + error)
            //console.log("response.statusCode: " + response.statusCode)
            //console.log("response.statusText: " + response.statusText)
			//return res.json({"status": 1, "message": 'We could not create your new SyncTracker account. Fix the errors before trying again.'});
			return res.redirect('/sign-up');
        }
    });
	
	//console.log(response);
	/*if (!response.ok) {
		const errorBody = await response.text();
		console.log(errorBody);
		return res.json({"status": 1, "message": 'We could not create your new SyncTracker account. Fix the errors before trying again.'});
	}
	else
	{
		console.log(response.status);
		return res.json({"status": 0, "message": 'Your new SyncTracker account has been created successfully. We have sent you an email'+ 
				'containing a 6-digit code. Enter the code to activate your account.'});
		i
	}*/

	return;
	
	
	
}