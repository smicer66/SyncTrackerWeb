var http = require('http');
var querystring = require('querystring');
const request = require('request');
//var fetch = require("node-fetch");


exports.getClientData = async function(req, res, next, domainName){
	//var allData = req.body;
	//var domainName = allData.domainName;
	var url = 'http://localhost:8080/api/vi/client/get-client-by-domain/' + domainName;
	console.log(url);
	
	const result = await request({
		url: url,
		method: "GET"
	}, function (error, response, body) {
		//console.log(body);
		//console.log({body, error, response, req});
        if (!error && response.statusCode === 200) {
			var bodyJS = JSON.parse(body);
            //console.log(bodyJS);
			//return res.json({"status": 0, "message": 'Your new SyncTracker account has been created successfully. We have sent you an email'+ 
			////	'containing a 6-digit code. Enter the code to activate your account.'});
			//return bodyJS;
			req.session.client = JSON.stringify(bodyJS);
			req.session.save();
			
        }
        else {

            //console.log("error: " + error)
            //console.log("response.statusCode: " + response.statusCode)
            //console.log("response.statusText: " + response.statusText)
			//return res.json({"status": 1, "message": 'We could not create your new SyncTracker account. Fix the errors before trying again.'});
			//return null;
        }
    });
	
	//return result;
}