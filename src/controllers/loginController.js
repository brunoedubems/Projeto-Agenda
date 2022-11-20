const Login = require('../models/LoginModel')
exports.index = (req, res) => {
    res.render('login');
  };
  
 exports.register = async (req, res) => {
    try{
        const login = new Login(req.body)
        await login.register(); // registra e valida os campos
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function(){
               return res.redirect('back');
            });
            return;
        }
        //quando o usuario for criado com sucesso
        req.flash('success', 'usuario criado com sucess');
        req.session.save(function(){
           return res.redirect('back');
        });
    } catch(e) {
        console.log(e)
   return  res.render('404')
    }

  };