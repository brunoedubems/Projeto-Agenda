const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    res.render('login');
  };
  
 exports.register = async function(req, res) {
    try{
        const login = new Login(req.body)
        await login.register(); // registra e valida os campos
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(
                function(){
                    return res.redirect('/login/index');
            });
            return;
        }
        //quando o usuario for criado com sucesso
        req.flash('success', 'Usuário criado com sucess');
        req.session.save(function(){
           return res.redirect('back');
        });
        //return res.send(login.errors);
    } catch(e) {
        console.log(e)
        return  res.render('404')
    }

  };