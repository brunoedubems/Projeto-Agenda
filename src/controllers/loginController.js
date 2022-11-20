const Login = require('../mo')
exports.index = (req, res) => {
    res.render('login');
  };
  
 exports.register = (req, res) => {
    res.send('req.body');
  };