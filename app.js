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
	database: 'nodelogin'
});
connection.connect();
global.db = connection;



const { google } = require('googleapis');
const CLIENT_ID = '826335259601-4bmomvi77v3kp3ouknuc7h09af96vvck.apps.googleusercontent.com'
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04ImDK9Ro8CYbCgYIARAAGAQSNwF-L9IrQWZGecT00MTP-crnNyWxKDSz02nHLU06FtFwmLVeSc0sHG__os2elJU_6y0xC0a8Wac';
const oauth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/home/aniket/desktop/DBMS/public/uploads/');
	},
	filename: function (req, file, cb) {
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
app.get('/dashboard/cs/dbms', routes.dbms);
app.post('/dashboard/cs/dbms', upload.single('dataFile'), routes.dbms);
app.get("/api/getFiles", async (req, res) => {
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

app.listen(port, function () {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});