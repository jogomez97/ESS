const express = require('express');
const router = express.Router();

/* Profile middleware */
router.use('/profile/:uname', function (req, res, next) {
    if (req.session && req.session.logged === true && req.params.uname === req.session.username) {
        const data = {
            uname: req.params.uname
        };

        res.render('profile', data);
    } else {
        res.locals.message = "Forbidden access";
        res.locals.error = 403;

        res.render('error', {title: "ESS | Error"});
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  const data =  {
      nm: "ESS"
  };
  res.render('index', data);
});

router.get('/logout', function (req, res) {
    req.session.logged = false;
    req.session.destroy();

    res.redirect("/");
});

module.exports = router;
