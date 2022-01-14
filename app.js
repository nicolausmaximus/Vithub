var mysql = require('mysql');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var multer = require('multer');
const fs = require('fs');
var session = require('express-session');
var port = process.env.PORT || 3000;
global.bcrypt = require('bcrypt');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_portal'
});
connection.connect();
global.db = connection;


//api


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

var upload = multer({ storage: storage });


var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
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
app.get('/profile', routes.profile);
app.get('/dashboard/cs/dbms', routes.uploadFile);
app.post('/dashboard/cs/dbms', upload.single('dataFile'), routes.uploadFile);
app.get("/api/getFiles", async(req, res) => {
    try {
        const files = await File.find();
        res.status(200).json({
            status: "success",
            files,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});