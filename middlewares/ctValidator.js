const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const usersLocal = path.join(__dirname, '../database/usuarios.json');
const readUsers = fs.readFileSync(usersLocal, 'utf-8');

// ================== transforming in json ================== //
const usuarios = JSON.parse(readUsers, null, 4)

const validarUsuario = (req, res, next) => {
    const {user_name, user_sobrenome, user_email, re_user_email, user_password, re_user_password} = req.body

    let errors = []


    if(user_email !== re_user_email){
        errors.push('email divergentes confira os dados e tente novamente')
    }
    if(user_password !== re_user_password){
        errors.push('a Senha está diferente')
    }
    // ************************** duplicidade de email ************************** //
    const emailFind = usuarios.find(p=> p.email == user_email)
    
    if(emailFind !== undefined){
        errors.push('este email já foi cadastrado')
    }

    if(errors.length > 0){
        console.log(errors)
        res.send('imposivel criar conta dados invalidos : ' + errors)
    }else{
        next ()
    }
     
}

module.exports = validarUsuario