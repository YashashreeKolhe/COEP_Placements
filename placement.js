var express = require('express');
const querystring = require('querystring');
var bodyParser = require('body-parser');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var router = express.Router();
var mysql = require('mysql');
var path = __dirname + '/views/';

var c_name = "";

var conn = mysql.createConnection({
	host: "localhost",
	user: "root",
  	password: "root",
  	database: "Placement_data"
});

conn.connect(function(err) {
	if (err) console.log(err);
});

app.use(express.static('public'));
app.use('/',router);
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
  
router.get('/',function(req, res){
  res.sendFile(path + 'index.html');
});

router.get('/login_intermediate',function(req, res){
	var data = {msg: ""};
	const query = querystring.stringify(data);
	res.redirect('/login?'+query);
});

router.get('/login',function(req, res){
  var delivered_msg = req.query.msg;
  res.render('login', {
  	msg: delivered_msg
  });
});


router.get('/company_list',function(req, res){
  var con = mysql.createConnection({
		host: "localhost",
  		user: "root",
  		password: "root",
  		database: "Placement_data"
	});
	  con.connect(function(err) {
	  		if (err) console.log(err);
	  		
	  		con.query("select name, logo_link from company_profile", function(err, result, fields) {
	  			if (err) throw err;
	    			res.render('company_list', {
	  				posts: result
	  			}); 
	  		});
	});
});

router.get('/company_profile', function(req, res){
	var con = mysql.createConnection({
		host: "localhost",
  		user: "root",
  		password: "root",
  		database: "Placement_data"
	});
	  con.connect(function(err) {
	  		if (err) console.log(err);
	  		var branch_names = "";
	  		var no_of_interns_selected;
	  		var no_of_fulltime_employees;
	  		var interns_selected;
	  		var fulltime_employees;
	  		
	  		con.query("select branch_name from company_eligible_branches where name = '"+req.query.srch+"'", function(err, result_branches, fields) {
	  			if(err) throw err;
	  			for(i=0; i<result_branches.length; i++) {
	  				if(branch_names == "") 
	  					branch_names = result_branches[i].branch_name;
	  				else
	  					branch_names = branch_names+", "+result_branches[i].branch_name;
	  			}
	  			console.log(branch_names);
 	  		});
 	  		
 	  		con.query("select count(student_name) as no_of_interns from company_interns where name = '"+req.query.srch+"' group by name", function(err, result_intern_count, fields) {
 	  			if(err) throw err;
 	  			no_of_interns_selected = result_intern_count[0].no_of_interns;
 	  			console.log(result_intern_count[0].no_of_interns);
 	  		});
 	  		
 	  		con.query("select * from company_interns where name = '"+req.query.srch+"'", function(err, result, fields) {
 	  			if(err) throw err;
 	  			interns_selected = result;
 	  		});
 	  		
 	  		con.query("select * from company_fulltime_employees where name = '"+req.query.srch+"'", function(err, result, fields) {
 	  			if(err) throw err;
 	  			fulltime_employees = result;
 	  		});
 	  		
 	  		con.query("select count(student_name) as no_of_fulltime from company_fulltime_employees where name = '"+req.query.srch+"' group by name", function(err, result_fulltime_count, fields) {
 	  			if(err) throw err;
 	  			no_of_fulltime_employees = result_fulltime_count[0].no_of_fulltime;
 	  			console.log(result_fulltime_count[0].no_of_fulltime);
 	  		}); 
	  		
	  		con.query("select * from company_profile, company_criteria, company_interview_process where company_profile.name = '"+req.query.srch+"' && company_criteria.name = '"+req.query.srch+"' && company_interview_process.name = '"+req.query.srch+"'", function(err, result, fields) {
	  			if (err) throw err;
	    			res.render('company_profile', {
	  				company_name: result[0].name,
	  				type_of_company: result[0].type,
	  				headquarters: result[0].headquarters,
	  				industry: result[0].industry,
	  				services: result[0].services,
	  				link: 'https://'+result[0].link,
	  				cgpa: result[0].cgpa,
	  				technologies: result[0].technologies,
	  				job_profile: result[0].job_profile,
	  				tentative_month: result[0].tentative_coming_month,
	  				fulltime_package: result[0].fulltime_package,
	  				internship_stipend: result[0].internship_stipend,
	  				job_location: result[0].job_location,
	  				aptitude_test_info: result[0].aptitude_test_info,
	  				aptitude_test_timing: result[0].aptitude_test_timing,
	  				interview_location: result[0].interview_location,
	  				interview_rounds: result[0].interview_rounds,
	  				offers_internship: result[0].offers_internship,
	  				eligible_branches: branch_names,
	  				logo_link: result[0].logo_link,
	  				no_of_interns: no_of_interns_selected,
	  				no_of_fulltime: no_of_fulltime_employees,
	  				posts: interns_selected,
	  				fulltime: fulltime_employees
	  			}); 
	  		});
	});
});
  
router.get('/data_manage', function(req, res){
  res.sendFile(path + 'data_manage.html');
});

router.get('/company_profile_for_company', function(req, res){
  var con = mysql.createConnection({
		host: "localhost",
  		user: "root",
  		password: "root",
  		database: "Placement_data"
	});
	  con.connect(function(err) {
	  		if (err) console.log(err);
	  		var branch_names = "";
	  		var no_of_interns_selected = "";
	  		var no_of_fulltime_employees = "";
	  		var interns_selected = "";
	  		var fulltime_employees = "";
	  		
	  		con.query("select branch_name from company_eligible_branches where name = '"+c_name+"'", function(err, result_branches, fields) {
	  			if(err) throw err;
	  			for(i=0; i<result_branches.length; i++) {
	  				if(branch_names == "") 
	  					branch_names = result_branches[i].branch_name;
	  				else
	  					branch_names = branch_names+", "+result_branches[i].branch_name;
	  			}
	  			console.log(branch_names);
 	  		});
 	  		
 	  		con.query("select count(student_name) as no_of_interns from company_interns where name = '"+c_name+"' group by name", function(err, result_intern_count, fields) {
 	  			if(err) throw err;
 	  			no_of_interns_selected = result_intern_count[0].no_of_interns;
 	  			console.log(result_intern_count[0].no_of_interns);
 	  		});
 	  		
 	  		con.query("select * from company_interns where name = '"+c_name+"'", function(err, result, fields) {
 	  			if(err) throw err;
 	  			interns_selected = result;
 	  		});
 	  		
 	  		con.query("select * from company_fulltime_employees where name = '"+c_name+"'", function(err, result, fields) {
 	  			if(err) throw err;
 	  			fulltime_employees = result;
 	  		});
 	  		
 	  		con.query("select count(student_name) as no_of_fulltime from company_fulltime_employees where name = '"+c_name+"' group by name", function(err, result_fulltime_count, fields) {
 	  			if(err) throw err;
 	  			no_of_fulltime_employees = result_fulltime_count[0].no_of_fulltime;
 	  			console.log(result_fulltime_count[0].no_of_fulltime);
 	  		}); 
	  		
	  		con.query("select * from company_profile, company_criteria, company_interview_process where company_profile.name = '"+c_name+"' && company_criteria.name = '"+c_name+"' && company_interview_process.name = '"+c_name+"'", function(err, result, fields) {
	  			if (err) throw err;
	    			res.render('company_profile', {
	  				company_name: result[0].name,
	  				type_of_company: result[0].type,
	  				headquarters: result[0].headquarters,
	  				industry: result[0].industry,
	  				services: result[0].services,
	  				link: 'https://'+result[0].link,
	  				cgpa: result[0].cgpa,
	  				technologies: result[0].technologies,
	  				job_profile: result[0].job_profile,
	  				tentative_month: result[0].tentative_coming_month,
	  				fulltime_package: result[0].fulltime_package,
	  				internship_stipend: result[0].internship_stipend,
	  				job_location: result[0].job_location,
	  				aptitude_test_info: result[0].aptitude_test_info,
	  				aptitude_test_timing: result[0].aptitude_test_timing,
	  				interview_location: result[0].interview_location,
	  				interview_rounds: result[0].interview_rounds,
	  				offers_internship: result[0].offers_internship,
	  				eligible_branches: branch_names,
	  				logo_link: result[0].logo_link,
	  				no_of_interns: no_of_interns_selected,
	  				no_of_fulltime: no_of_fulltime_employees,
	  				posts: interns_selected,
	  				fulltime: fulltime_employees
	  			}); 
	  		});
	});
	//con.end();
});

var prev_name = "";

router.get('/company_home', function(req, res) {
	var conn = mysql.createConnection({
		host: "localhost",
		user: "root",
	  	password: "root",
	  	database: "Placement_data"
	});

	console.log("inside company_home"+req.query.name);
	var comp_name = req.query.name;
	if(comp_name == undefined) {
		comp_name = prev_name;
	}else {
		prev_name = comp_name;
	}
	var n;
	
	conn.connect(function(err) {
		if(err) throw err;
		var fulltime_emp = 0;
		var intern_emp = 0;
		var branch_names = "";
		var aptitude_test_var = "", aptitude_test_timing_var = "", rounds_var = "", location_of_interview_var = "";
		
		conn.query("select name, count(student_name) fulltime from company_fulltime_employees where name='"+comp_name+"' group by name", function(err, result) {
			fulltime_emp = result[0].fulltime;
			c_name = result[0].name;
		});
		
		conn.query("select name, count(student_name) interns from company_interns where name='"+comp_name+"' group by name", function(err, r) {
			intern_emp = r[0].interns;
		});
		
		conn.query("select branch_name from company_eligible_branches where name ='"+comp_name+"'", function(err, result_branches, fields) {
	  			if(err) throw err;
	  			for(var i=0; i<result_branches.length; i++) {
	  				if(branch_names == "") 
	  					branch_names = result_branches[i].branch_name;
	  				else
	  					branch_names = branch_names+", "+result_branches[i].branch_name;
	  			}
 	  		});
 	  		
 	  	conn.query("select * from company_interview_process where name ='"+comp_name+"'", function(err, reslt, fields) {
 	  			aptitude_test_var = reslt[0].aptitude_test_info,
				aptitude_test_timing_var = reslt[0].aptitude_test_timing,
				rounds_var = reslt[0].interview_rounds,
				location_of_interview_var = reslt[0].interview_location
 	  	});
		
		conn.query("select * from company_profile inner join company_criteria on company_profile.name = company_criteria.name where company_profile.name = '"+comp_name+"'", function(err, result1) {
			res.render('company_home', {
				company_name: result1[0].name,
				type: result1[0].type,
				headquarter: result1[0].headquarters,
				industry: result1[0].industry,
				services: result1[0].services,
				link: result1[0].link,
				no_of_fulltime: fulltime_emp,
				no_of_interns: intern_emp,
				company_name: result1[0].name,
				offers_internship: result1[0].offers_internship,
				cgpa: result1[0].cgpa,
				technologies: result1[0].technologies,
				job_profile: result1[0].job_profile,
				tentative_month_for_interview: result1[0].tentative_coming_month,
				branches: branch_names,
				fulltime_package: result1[0].fulltime_package,
				intern_stipend: result1[0].internship_stipend,
				address: result1[0].job_location,
				city: result1[0].city,
				aptitude_test: aptitude_test_var,
				aptitude_test_timing: aptitude_test_timing_var,
				rounds: rounds_var,
				location_of_interview: location_of_interview_var
			});
		});
	});
});

router.post('/update_feedback_data', urlencodedParser, function(req, res) {
	var conn = mysql.createConnection({
		host: "localhost",
	  	user: "root",
	  	password: "root",
	  	database: "Placement_data"
	});
	console.log("Inside update data!");
	conn.connect(function(err) {
		if(err) throw err;
		var data;
		
		conn.query("select * from company_feedback_form where name = '"+req.body.comp_name+"' and form_filling_year = '"+((new Date()).getFullYear())+"'", function(err, result, fields) {
			if(err) throw err;
			if(result.length == 0) {
				data = {name:req.body.comp_name, form_filling_date: (new Date()), form_filling_year: ((new Date()).getFullYear()), name_of_company_representative: req.body.name_of_comp_representative, performance_apply_engg_fundamentals: parseInt(req.body.apply_engg_fund), performance_professional_ethics: parseInt(req.body.professional_ethics), performance_comm_skills: parseInt(req.body.comm_skills), performance_knowledge_of_contemporary_issues: parseInt(req.body.know_of_contem_issues), performance_logical_and_quant_ability: parseInt(req.body.logical_quant_ability), facilities_infra: parseInt(req.body.infra), facilities_time_management: parseInt(req.body.time_management), facilities_value_addition: parseInt(req.body.value_addition), facilities_support: parseInt(req.body.support), facilities_hospitality: parseInt(req.body.hospitality), quality_verbal: req.body.verbal, quality_analytical: req.body.analytical, quality_intrapersonal: req.body.intrapersonal, quality_interpersonal: req.body.interpersonal, quality_tech_knowledge: req.body.tech_knowledge, suggestion: req.body.suggestion};				
		
				conn.query("insert into company_feedback_form set ?", data, function(err, result1) {
					if(err) throw err;
				});
				
			}else {
				console.log("inserted");
			}
		});
		data = {name:req.body.comp_name};
		res.writeHead(200, { 'Content-Type': 'application/json' }); 
      		res.end(JSON.stringify(data));
	});
});

router.post('/update_company_info', urlencodedParser, function(req, res) {
	var con = mysql.createConnection({
		host: "localhost",
	  	user: "root",
	  	password: "root",
	  	database: "Placement_data"
	});
	console.log("Inside update data!");
	var data;
	con.connect(function(err) {
		if(err) throw err;

	//conn.query("select * from company_profile where name = '"+req.body.comp_name+"'", function(err, result, fields) {
		//if(err) throw err;
		//if(result.length == 0) {
			data = {type: req.body.type, headquarters:req.body.headquarters, industry: req.body.industry, services: req.body.services, link: req.body.link, offers_internship: req.body.offers_internship};				
		
			con.query("update company_profile set ? where name = '"+req.body.company_name+"'", data, function(err, result1) {
				if(err) throw err;
			});
			
		//}else {
		//	console.log("inserted");
		//}
		
	data = {name: req.body.company_name, cgpa: req.body.cgpa, technologies: req.body.technologies, job_profile: req.body.job_profile, tentative_coming_month: req.body.tentative_mon, fulltime_package: req.body.fulltime_package, internship_stipend: req.body.internship_stipend,  job_location: req.body.address, city: req.body.city};
		
	con.query("update company_criteria set ? where name = '"+req.body.company_name+"'", data, function(err, result1) {
		if(err) throw err;
	});

	data = {name: req.body.company_name, aptitude_test_info: req.body.aptitude_info, aptitude_test_timing: req.body.aptitude_timing, interview_location: req.body.location_of_interview, interview_rounds: req.body.rounds};
		
	con.query("update company_interview_process set ? where name = '"+req.body.company_name+"'", data, function(err, result1) {
		if(err) throw err;
	});
	
	var branches = req.body.branches;
	var arr = branches.split(", ");
	for(var i=0; i<arr.length; i++) {
		con.query("select * from company_eligible_branches where name = '"+req.body.company_name+"' and branch_name = '"+arr[i]+"'", function(err, result1) {
			if(err) throw err;
			if(result1.length == 0) {
				con.query("insert into company_eligible_branches(name, branch_name) values('"+req.body.company_name+"', '"+arr[i]+"')", function(err, result2) {
					if(err) throw err;
				});
			}
		});
	};
	
	data = {name:req.body.comp_name};
	res.writeHead(200, { 'Content-Type': 'application/json' }); 
      	res.end(JSON.stringify(data));
	});
});


router.post('/change_company_password', urlencodedParser, function(req, res) {
	var conn = mysql.createConnection({
		host: "localhost",
	  	user: "root",
	  	password: "root",
	  	database: "Placement_data"
	});
	console.log("Inside update data!");
	conn.connect(function(err) {
		if(err) throw err;
		var data;
		var msg = "default msg";
		
		conn.query("select * from company_login_passwords where name = '"+c_name+"'", function(err, result) {
			if(err) throw err;
			
			if(result[0].password === req.body.current_pass) {
				if(req.body.new_pass === req.body.confirm_new_pass) {
					data = {password: req.body.new_pass};
					conn.query("update company_login_passwords set ? where name = '"+c_name+"'", data, function(err, result1) {
						if(err) throw err;
						msg = "Password changed successfully!";
						data = {name: msg};
						res.writeHead(200, { 'Content-Type': 'application/json' }); 
						res.end(JSON.stringify(data));
					}); 
				}
				else {
					msg = "New Passwords do not match!";
					data = {name: msg};
					res.writeHead(200, { 'Content-Type': 'application/json' }); 
					res.end(JSON.stringify(data));
				}	
			}else {
				msg = "Incorrect Current Password!";
				data = {name: msg};
				res.writeHead(200, { 'Content-Type': 'application/json' }); 
				res.end(JSON.stringify(data));
			}
		});
	});
});

router.post('/authenticate', urlencodedParser, function(req, res) {
	var conn = mysql.createConnection({
		host: "localhost",
	  	user: "root",
	  	password: "root",
	  	database: "Placement_data"
	});
	conn.connect(function(err) {
		if(err) throw err;
		
		var msg = "Invalid Password";
		var name = "none";
		var category = "none";
		var data;
		
		if(req.body.username === "admin") {
			conn.query("select admin_password from administrator_login_passwords", function(err, result) {
				if(err) throw err;
				
				for(var i = 0; i<result.length; i++) {
					if(result[i].admin_password === req.body.password) {
						msg = "Correct Password";
						category = "Admin";
						data = {name : name, msg : msg, category : category};
						/*res.writeHead(200, {'Content-Type' : 'application/json'});
						res.end(JSON.stringify(data));*/
						res.redirect('/admin_home');
						break;
					}
				}
				if(msg === "Invalid Password") {
					msg = "Incorrect Password";
					data = {msg : msg};
					const query = querystring.stringify(data);
					/*res.writeHead(200, {'Content-Type' : 'application/json'});
					res.end(JSON.stringify(data));*/
					res.redirect('/login?'+query);
				}
				
			});
		}else if(req.body.username === "company"){
			conn.query("select * from company_login_passwords where password = '"+req.body.password+"'", function(err, result) {
				if(err) throw err;
				
				if(result.length == 0) {
					msg = "Incorrect Password";
					data = {msg : msg};
					const query = querystring.stringify(data);
					/*res.writeHead(200, {'Content-Type' : 'application/json'});
					res.end(JSON.stringify(data));*/
					res.redirect('/login?'+query);
				}else {
					msg = "Correct Password";
					category = "Company";
					data = {name : result[0].name, msg : msg, category : category};
					/*res.writeHead(200, {'Content-Type' : 'application/json'});
					res.end(JSON.stringify(data));*/
					const query = querystring.stringify(data);
					res.redirect('/company_home?' + query);
				}
			});
		}else {
			msg = "Incorrect Username";
			data = {msg : msg};
			/*res.writeHead(200, {'Content-Type' : 'application/json'});
			res.end(JSON.stringify(data));*/
			const query = querystring.stringify(data);
			res.redirect('/login?'+query);
		}
	});
});

router.get('/admin_home', function(req, res) {

	var conn = mysql.createConnection({
		host: "localhost",
	  	user: "root",
	  	password: "root",
	  	database: "Placement_data"
	});
	conn.connect(function(err) {
		if(err) throw err;
		
		
		conn.query("select name from company_profile", function(err, result) {
			if(err) throw err;
			
			res.render('admin_home', {
				options: result
			});
		}); 
	});
});

  
app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});
  
app.listen(3000,function(){
  console.log("Server running at Port 3000");
});
