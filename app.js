var mysql = require('mysql');
mysql: //b9dff8be487326:a7ac0c49@eu-cdbr-west-02.cleardb.net/heroku_c6ea23498e43ba4?reconnect=true
    var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
const fs = require('fs');
var session = require('express-session');
const sessionstore = new session.MemoryStore();
var port = process.env.PORT || 9999;
global.bcrypt = require('bcrypt');
var connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b9dff8be487326',
    password: 'a7ac0c49',
    database: 'heroku_c6ea23498e43ba4'
});
connection.connect();
global.db = connection;



var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    sessionstore,
    cookie: { maxAge: 1000 * 60 * 60 },
}));

function sessionCleanup() {
    sessionstore.all(function(err, sessions) {
        for (var i = 0; i < sessions.length; i++) {
            sessionstore.get(sessions[i], function() {});
        }
    });
}

setInterval(sessionCleanup, 5 * 60 * 60 * 1000);
app.use(express.urlencoded({ extended: true }));
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
app.get('/profile', routes.profile);
app.get('/dashboard/cs/dbms', routes.uploadFile);
app.post('/dashboard/cs/dbms', routes.uploadFile);

app.get('/dashboard/cs/dbms/view', routes.downloadFile);
app.post('/dashboard/cs/dbms/view', routes.downloadFile);

app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});