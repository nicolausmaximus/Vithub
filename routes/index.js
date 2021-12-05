exports.index = async function (req, res) {
        var message = '';
        var sess = req.session;
        if (req.method == "POST") {
                var email = req.body.email;
                var username = req.body.username;
                var password = req.body.password;
                if (username && password && email) {
                        db.query('SELECT password FROM accounts WHERE username = ? AND email=?', [username, email], async (error, results) => {
                                if (error) throw error;
                                if (results.length > 0) {
                                        const reslt = await bcrypt.compare(password, results[0].password);
                                        console.log(res);
                                        if (reslt) {
                                                req.session.loggedin = true;
                                                req.session.username = username;
                                                req.session.email = email;
                                                req.session.user = results[0];
                                                console.log(username);
                                                res.redirect('/dashboard');
                                        }
                                        else {
                                                message = 'Please enter correct password.';
                                                res.render('index', { message: message });
                                        }
                                        res.end();
                                }
                                else {
                                        message = 'Invalid details';
                                        res.render('index', { message: message });
                                }
                                res.end();
                        });
                } else {
                        res.send('Please enter Username and Password!');
                        res.end();
                }

        } else {
                message = '';
                res.render('index', { message: message });
        }

};

exports.register = async function (req, res) {
        message = '';
        if (req.method == "POST") {
                var emailid = req.body.email;
                var un = req.body.username;
                const pwd = await bcrypt.hash(req.body.password, 10);
                if (un && pwd && emailid) {
                        var values = { username: un, password: pwd, email: emailid };
                        db.query("INSERT INTO accounts SET ?", values, function (error, results, fields) {
                                if (error) {
                                        message = 'Please enter valid details.';
                                        res.render('registration', { message: message });
                                }
                                else {
                                        req.session.loggedin = true;
                                        req.session.username = un;
                                        req.session.email = emailid;
                                        req.session.user = results[0];
                                        console.log(un);
                                        res.redirect('/dashboard');
                                }
                        });
                } else {
                        message = 'Please enter valid details.';
                        res.render('registration', { message: message });
                }

        } else {
                res.render('registration', { message: message });
        }
};





exports.dashboard = function (req, res) {
        username = req.session.username;
        email = req.session.email;
        if (!username && !email) {
                res.redirect("/login");
                return;
        }
        res.render('dashboard', { username: username });
};

exports.logout = function (req, res) {
        req.session.destroy(function (err) {
                res.redirect("/login");
        })
};

exports.profile = function (req, res) {
        username = req.session.username;
        email = req.session.email;
        if (!username && !email) {
                res.redirect("/login");
                return;
        }

        res.render('profile.ejs', { username: username, email: email });
};

exports.cs = function (req, res) {
        username = req.session.username;
        email = req.session.email;
        if (!username && !email) {
                res.redirect("/login");
                return;
        }

        res.render('cs', { username: username, email: email });
};


exports.dbms = function (req, res) {
        if (req.method == "POST") {
                const file = req.file;
                if (!file) {
                        message = 'Invalid file';
                        var sql = 'SELECT * FROM files';
                        db.query(sql, function (err, data) {
                                if (err) throw err;
                                res.render('upload', { message: message, userData: data });
                        });
                }
                else {
                        var sql = "INSERT INTO files(name) VALUE ('" + req.file.filename + "')";
                        db.query(sql, function (err, result) {
                                if (err) {
                                        message = 'Invalid file';
                                        res.render('upload', { message });
                                }
                                else {
                                        message='Successful'
                                        var sql = 'SELECT * FROM files';
                        db.query(sql, function (err, data, fields) {
                                if (err) throw err;
                                res.render('upload', { message: message, userData: data });
                        });
                                }
                        });
                }
        }
        else {
                username = req.session.username;
                email = req.session.email;
                message = '';
                if (!username && !email) {
                        res.redirect("/login");
                        return;
                }
                else {
                        var sql = 'SELECT * FROM files';
                        db.query(sql, function (err, data, fields) {
                                if (err) throw err;
                                res.render('upload', { message: message, userData: data });
                        });
                }
        }
};
