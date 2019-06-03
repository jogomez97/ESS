const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();


function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/* LOGIN */
router.post('/', function(req, res, next) {
    const uname = req.body.uname;
    const password = req.body.pwd;

    if (uname && password) {
        global.db.query('SELECT * FROM users WHERE username = ?', uname, function(err, rows, fields) {
            if (err) {
                res.redirect('/');
                res.end();
            } else {
                const user = rows[0];
                if (user) {
                    bcrypt.compare(password, user.password, function (err, isEqual) {
                        if (err || isEqual == false) {
                            res.redirect('/');
                            res.end();
                        } else {
                            //Logged in successfully
                            req.session.logged = true;
                            req.session.username = user.username;
                            res.redirect('/profile/' + user.username);
                            res.end();
                        }
                    });
                } else {
                    res.redirect('/');
                    res.end();
                }
            }
        });
    } else {
        res.redirect('/');
        res.end();
    }

});

/* REGISTER */
router.post('/register', function(req, res, next) {
    const username = req.body.uname;
    let password = req.body.pwd;
    const email = req.body.email;

    if (username && password && email) {

        if (!validateEmail(email)) {
            res.redirect("/");
            res.end();
        } else {
            const db = global.db;

            bcrypt.hash(password, saltRounds)
                .then(hash => {
                    const user = {
                        "username": username,
                        "email": email,
                        "password": hash
                    };

                    db.query('INSERT INTO users SET ?', user, function (error, results, fields) {
                        if (error) {
                            res.redirect('/');
                            res.end();
                        } else {
                            //Registered successfully
                            req.session.logged = true;
                            req.session.username = username;
                            res.redirect('/profile/' + user.username);
                            res.end();
                        }
                    });
                }).catch(err => {
                res.redirect('/');
                res.end();
            });
        }
    } else {
        res.redirect('/');
        res.end();
    }

});

module.exports = router;
