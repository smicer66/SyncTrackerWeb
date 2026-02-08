var EmploymentService = require("../services/employment.service");


exports.getEmployeeList = async function(req, res, next) {
	try {
		var client = req.session.client;
		//console.log(client);
		client = JSON.parse(client);
		//console.log(client.responseObject.client.clientId);
	
		await EmploymentService.getEmployeeList(req, res, next, (err, employeeList)=>{
			
			console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
			console.log(employeeList);
			
			return res.render('admin/employment/employees', { employeeList: employeeList });
		})
		
		
		
		
		/*.then((employeeList) => {
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log(employeeList);
			return res.render('admin/employment/employees', { employeeList });
		});*/
		
	} catch (err) {
		next(err);
	}
	
}

exports.postCreateNewEmployee = async function(req, res, next) {
	try {
		return EmploymentService.postCreateNewEmployee(req, res, next);
	} catch (err) {
		
		console.log(err);
		next(err);
	}
	
}


exports.getEmployeeLeaveRequest = async function(req, res, next) {
	try {
		
		var client = req.session.client;
		//console.log(client);
		client = JSON.parse(client);
		//console.log(client.responseObject.client.clientId);
		await EmploymentService.getEmployeeList(req, res, next, (err, employeeList)=>{
			
			
			return res.render('admin/employment/leave', { employeeList: employeeList });
		});
		//return res.render('admin/employment/leave', {  });
	} catch (err) {
		next(err);
	}
	
}

exports.postEmployeeLeaveRequest = async function(req, res, next) {
	try {
		return EmploymentService.postEmployeeLeaveRequest(req, res, next);
	} catch (err) {
		
		console.log(err);
		next(err);
	}
	
}
