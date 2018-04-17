/*create table company_profile (
	name varchar(255),
	type varchar(255),
	headquarters varchar(255),
	industry varchar(255),
	services varchar(255),
	link varchar(255),
	primary key(name)	
);

create table company_criteria (
	name varchar(255),
	cgpa numeric(2,1),
	technologies varchar(255),
	job_profile varchar(255),
	tentative_coming_month varchar(255),
	fulltime_package numeric(10,2),
	internship_stipend numeric(10,2),
	job_location varchar(255),
	city varchar(255),
	primary key(name),
	foreign key(name) references company_profile(name)
		on delete cascade
);

create table company_eligible_branches (
	name varchar(255),
	branch_name enum('Computer Science', 'Civil Engineering', 'Mechanical Engineering', 'Metallurgy', 'Information Technology', 'Electrical Engineering', 'Electronics and Telecommunication', 'Instrumentation and Control', 'Production Engineering'),
	primary key(name, branch_name),
	foreign key(name) references company_profile(name)
		on delete cascade
);

create table company_interview_process (
	name varchar(255),
	aptitude_test_info varchar(255),
	aptitude_test_timing varchar(255),
	interview_location varchar(255),
	interview_rounds varchar(255),
	primary key(name),
	foreign key(name) references company_profile(name)
		on delete cascade
);

create table company_interns (
	name varchar(255),
	student_name varchar(255),
	branch_name varchar(255),
	foreign key(name) references company_profile(name)
		on delete cascade
);

create table company_fulltime_employees (
	name varchar(255),
	student_name varchar(255),
	branch_name varchar(255),
	foreign key(name) references company_profile(name)
		on delete cascade
);*/

create table company_login_passwords (
	name varchar(255),
	password varchar(255),
	primary key(name)
);

/*create table company_feedback_form (
	name varchar(255),
	form_filling_date varchar(255),
	form_filling_year int,
	name_of_company_representative TEXT,
	performance_apply_engg_fundamentals int,
	performance_professional_ethics int,
	performance_comm_skills int,
	performance_knowledge_of_contemporary_issues int,
	performance_logical_and_quant_ability int,
	facilities_infra int,
	facilities_time_management int,
	facilities_value_addition int,
	facilities_support int,
	facilities_hospitality int,
	quality_verbal TEXT,
	quality_analytical TEXT,
	quality_intrapersonal TEXT,
	quality_interpersonal TEXT,
	quality_tech_knowledge TEXT,
	suggestion TEXT,
	primary key(name),
	foreign key(name) references company_profile(name) 
		on delete cascade
);

create table administrator_login_passwords (
	admin_username varchar(255),
	admin_password varchar(255),
	primary key(admin_username)
);*/
