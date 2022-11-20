const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String, required: true },

});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
constructor(body){
  this.body = body;
  this.errors = []; // se pode o usuario ser criado ou nao no banco de dados
  this.user = null;
}

async register(){ // promessa tem q ter try e catch
  this.valida(); 
  if(this.errors.length > 0) return;
  try{
    this.user = await LoginModel.create(this.body) // await = espera
  } catch(err){
    console.log(err);
  }
}

valida(){
  this.cleanUp();
  //validação
  //o e-mail precisa ser valido
  if(!validator.isEmail(this.body.email)){
    this.errors.push('Email inválido')
  }
  //a senha precisa ser  entre 6 a 50 caracteres
  if(this.body.password.length < 6 || this.body.password.length > 50){
    this.errors.push('A senha precisa ter entre 6 e 50 caracteres')
  }
}

cleanUp() { 
  //garante que tudo que recebe é uma string
  for(const key in this.body) {
     if(typeof this.body[key] !== 'string'){
      this.body[key] = '';
     } 
  };
  this.body = {
    email: this.body.email,
    password: this.body.password
  }
};
}

module.exports = Login;
