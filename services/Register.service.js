var http = require('http');
var querystring = require('querystring');


exports.postRegisterNewCustomer = async function(req, res, next){
	
	console.log(req.body);
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
	*/
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
	
	var post_data = querystring.stringify({
		clientName: clientName,
		createUserRequest: {
			mobileNumber: mobileNumber,
			emailAddress: emailAddress,
			password: password
		}
	});

	  // An object of options to indicate where to post to
	var post_options = {
		  host: 'localhost',
		  port: '80',
		  path: '/api/vi/client/create-client',
		  method: 'POST',
		  headers: {
			  'Content-Type': 'application/json',
			  'Content-Length': Buffer.byteLength(post_data)
		  }
	};

	  // Set up the request
	var post_req = http.request(post_options, function(res) {
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
			  console.log('Response: ' + chunk);
		  });
	});

	  // post the data
	post_req.write(post_data);
	post_req.end();

	/*if (!response.ok) {
	  throw new Error(`HTTP error! Status: ${response.status}`);
	}

	const data = await response.json();
	console.log(data);*/
	
}