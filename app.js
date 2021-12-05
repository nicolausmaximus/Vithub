var mysql = require('mysql');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user')
var http = require('http');
var path = require('path');
var session = require('express-session');
var port= process.env.PORT || 8200;
global.bcrypt = require('bcrypt');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'nodelogin'
});
connection.connect();
global.db = connection;
var app = express();
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', routes.index);
app.get('/login', routes.index);
app.get('/register', routes.register);
app.post('/login', routes.index);
app.post('/register', routes.register);
app.get('/dashboard', routes.dashboard);
app.get('/dashboard/cs', routes.cs);
app.get('/logout', routes.logout);
app.get('/profile',routes.profile);

app.listen(port, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      });