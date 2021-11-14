var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var path = require('path');
const bcrypt = require('bcrypt');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'nodelogin'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/login', function (request, response) {
	response.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get('/register', function (request, response) {
	response.sendFile(path.join(__dirname + '/public/registration.html'));
});

app.post('/login', async (request, response) => {
	var email = request.body.email;
	var username = request.body.username;
	var password = request.body.password;
	if (username && password && email) {
		connection.query('SELECT password FROM accounts WHERE username = ? AND email=?', [username, email], async (error, results, fields) => {
			if (error) throw error;
			if (results.length > 0) {
				const res = await bcrypt.compare(password, results[0].password);
				console.log(res);
				if (res) {
					request.session.loggedin = true;
					request.session.username = username;
					response.redirect('/home');
					response.end();
				}
				else {
					response.send('Please enter valid Details!');
					response.end();
				}
				response.end();
			}
			else {
				response.send('Incorrect Username and/or Password!');
				response.end();
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/register', async (request, response) => {
	var emailid = request.body.email;
	var un = request.body.username;
	const pwd = await bcrypt.hash(request.body.password, 10);
	if (un && pwd && emailid) {
		var values = { username: un, password: pwd, email: emailid };
		connection.query("INSERT INTO accounts SET ?", values, function (error, results, fields) {
			if (error) {

				response.send('Please enter valid Details!');
				response.end();
			}
			else {
				request.session.loggedin = true;
				request.session.username = un;
				response.redirect('/home');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
app.get('/home', function (request, response) {
	if (request.session.loggedin) {
		let usrname = request.session.username;
		response.redirect('/index.html');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(8200, function () {
	console.log('Node app is running on port 8200');
});