var session = require('express-session');
var SessionService = require("../services/session.service");


module.exports = function(options) {
	////console.log("<<<<<<");
	/*return function(err, req, res, next){
		//console.log(err);
		
		next();
	}*/
	//console.log(options);
	return function(req, res, next) {
		////console.log('session id created');
		/*app.use(session(
			{ 
				name:'domain',
				genid: function(req) {
					//console.log('session id created');
					return genuuid();
				}, 
				secret: 'Shsh!Secret!',
				resave: true,
				saveUninitialized: true	,
				cookie: { 
					secure: false,
					domain: req.hostname, 
					expires:60000 
				}
			}
		));*/
		//console.log(req.session);
		if(req.hostname==='localhost')
		{
			req.session.client = undefined;
			req.session.save()
			next();
		}
		else
		{
		
		
			if(req.session!=undefined && req.session.domain!=undefined)
			{
				////console.log("Domain session already exists for this domain...");
				////console.log(req.session.domain);
				////console.log(req.session.client);
				//req.session.destroy();
			}
			else
			{
				//console.log(req.url);
				////console.log("Creating domain session for the domain " + req.hostname);
				
				req.session.domain = req.hostname;
				SessionService.getClientData(req, res, next, req.hostname);
				req.session.save()
				return res.redirect('/redirect?url=' + req.url);
				/*.then((bodyJS)=>{
					//console.log("bodyJS...");
					//console.log(bodyJS);
					req.session.client = JSON.stringify(bodyJS);
					req.session.save()
				});*/
				////console.log("bodyJS...");
				////console.log(bodyJS);
				//if(bodyJS!=null)
				//{
				//	//console.log(JSON.stringify(bodyJS));
				//}
				console.log('test');
			}
			next();
		}
	}
}