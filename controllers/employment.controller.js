var EmploymentService = require("../services/employment.service");


exports.getEmployeeList = function(req, res, next) {
	try {
		
		var client = req.session.client;
		console.log(client);
		client = JSON.parse(client);
		console.log(client.responseObject.client.clientId);
	
		return EmploymentService.getEmployeeList(req, res, next);
	} catch (err) {
		next(err);
	}
	
}

exports.postCreateNewEmployee = function(req, res, next) {
	try {
		return EmploymentService.postCreateNewEmployee(req, res, next);
	} catch (err) {
		next(err);
	}
	
}