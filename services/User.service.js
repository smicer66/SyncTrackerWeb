var session = require('express-session');
var http = require('http');
var querystring = require('querystring');
const request = require('request').defaults({jar: true});
//var fetch = require("node-fetch");


exports.postLogin = async function(req, res, next){
	
	//console.log(allData);
	var allData = req.body;
	var username = allData.username;
	var password = allData.password;
	var remember = allData.remember;
	//client = JSON.parse(client);
	client= req.session.client;
	//console.log(client);
  
	const response = await request({
		url: 'http://localhost:8080/api/v1/user/login',
		method: "POST",
		json: {
			username: username,
			password: password,
			clientCode: client.clientCode
		}
	}, function (error, response, body) {
		console.log(body);
        if (!error && response.statusCode === 200) {
			req.session.token = body.token;
			req.session.save();
			return res.redirect('/dashboard');
        }
        else {

            console.log("error: " + error)
			return res.redirect('/login');
        }
    });
	

	return;
	
	
	
}




exports.postOTP = async function(req, res, next){
	
	//console.log(allData);
	var allData = req.body;
	var otp1 = allData.otp1;
	var otp2 = allData.otp2;
	var otp3 = allData.otp3;
	var otp4 = allData.otp4;
	var otp5 = allData.otp5;
	var otp6 = allData.otp6;
	var clientCode = allData.clientCode;
	var token = allData.token;
	
	var otp = otp1.substring(0, 1) + "" + otp2.substring(0, 1) + "" + otp3.substring(0, 1)
		+ "" + otp4.substring(0, 1) + "" + otp5.substring(0, 1) + "" + otp6.substring(0, 1);
		
	var data = {
		token: otp,
		data: token,
		clientCode: clientCode,
		tokenType: "SIGNUP"
	};
	console.log("data");
	console.log(data);
  
	const response = await request({
		url: 'http://localhost:8080/api/v1/user/validate-token',
		method: "POST",
		json: data
	}, function (error, response, body) {
		console.log("response....");
		console.log(response.statusCode);
        if (!error && response.statusCode === 200) {
			
			return res.redirect('/login');
        }
        else {

            console.log("error: " + error)
			return res.redirect('back');
        }
    });
	

	return;
	
	
	
}