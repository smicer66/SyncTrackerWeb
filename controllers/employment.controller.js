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
		await EmploymentService.getEmployeeLeaveDashboardData(req, res, next, (err, leaveData)=>{
			
			console.log("leaveData...");
			console.log(leaveData);
			return res.render('admin/employment/leave', leaveData);
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


exports.postUpdateEmployeeLeaveRequestStatus = async function(req, res, next) {
	try {
		return EmploymentService.postUpdateEmployeeLeaveRequestStatus(req, res, next);
	} catch (err) {
		
		console.log(err);
		next(err);
	}
	
}


exports.deleteUpdateEmployeeLeaveRequest = async function(req, res, next) {
	try {
		return EmploymentService.deleteUpdateEmployeeLeaveRequest(req, res, next);
	} catch (err) {
		
		console.log(err);
		next(err);
	}
	
}


