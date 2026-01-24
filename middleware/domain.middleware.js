var session = require('express-session')

module.exports = function(options) {
	console.log("<<<<<<");
	return function(err, req, res, next){
		console.log(err);
		/*if(req.session!=undefined && req.session.domain!=undefined)
		{
			console.log(req.hostname);
		}
		else
		{
			//console.log(req);
			console.log(">>>>");
			var app = options.app;
			req.session.domain = req.hostname;
			req.session.save()
		}*/
		next();
	}
}