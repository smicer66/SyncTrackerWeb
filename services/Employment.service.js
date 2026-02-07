var session = require('express-session');
var http = require('http');
var querystring = require('querystring');
const request = require('request').defaults({jar: true});
const moment = require('moment');
//const handlebars=require('handlebars');
//var fetch = require("node-fetch");




exports.getEmployeeList = async function(req, res, next){
	
	const response = request({
		url: 'http://localhost:8080/api/v1/employment/get-employees/3HGTXNCDD36P0Z7O',
		method: "GET"
	}, function (error, response, body) {
		//console.log("body....");
		//console.log(body);
		//console.log(response.statusCode);
		//console.log(req.session);
		var employeeList = [];
		var bodyJS = JSON.parse(body);
		if(bodyJS.statusCode==0)
		{
			employeeList = bodyJS.responseObject.employeeBioDataList;
			employeeList = employeeList.slice(0, 12);
		}
		else
			employeeList = [];
		
		
		console.log(employeeList);
		
		return res.render('admin/employment/employees', { employeeList: employeeList });
		/*if (!error && response.statusCode === 200) {
			
			return res.redirect('/login');
		}
		else {

			//console.log("error: " + error)
			return res.redirect('back');
		}*/
	});
}



exports.postCreateNewEmployee = async function(req, res, next){
	
	//console.log(allData);
	var allData = req.body;
	var clientName = allData.clientName;
	var mobileNumber = allData.mobileNumber;
	var emailAddress = allData.emailAddress;
	var password = allData.password;
	var confirmPassword = allData.confirmPassword;
	var client = req.session.client;
	console.log(client);
	client = JSON.parse(client);
	console.log(client.responseObject.client.clientId);
	//console.log(client);
	var clientId = client.responseObject.client.clientId;
	
	var employeeNumber= allData.employeeNumber;
	var employeeSocialSecurityNo= allData.employeeSocialSecurityNo;
	var dateOfBirth= allData.dateOfBirth;
	var countryOfOrigin= allData.countryOfOrigin;
	var mobileNumber= allData.mobileNumber;
	var emailAddress= allData.emailAddress;
	var firstName= allData.firstName;
	var lastName= allData.lastName;
	var gender= allData.gender;
	var maritalStatus= maritalStatus;
	
	if(password!=confirmPassword)
	{
		//throw error on password
	}
	
	
  
	const response = await request({
		url: 'http://localhost:8080/api/v1/employment/create-new-employee',
		method: "POST",
		headers: {"Authorization": "Bearer " + req.session.token},
		json: {
			clientId: clientId,
			employeeNumber: employeeNumber,
			employeeNumber: employeeNumber,
			employeeSocialSecurityNo: employeeSocialSecurityNo,
			dateOfBirth: dateOfBirth,
			countryOfOrigin: countryOfOrigin,
			mobileNumber: mobileNumber,
			emailAddress: emailAddress,
			firstName: firstName,
			lastName: lastName,
			//middleName: middleName,
			gender: gender,
			maritalStatus: maritalStatus,
			//title: title
			
		}
	}, function (error, response, body) {
		console.log([error, response, body]);
        if (!error && response.statusCode === 200) {
            console.log(body);
			var bodyJS = body;
			
			//return bodyJS;
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(body));
			res.end();
        }
        else {

            //console.log("error: " + error);
			return;
        }
    });

	return;
}


