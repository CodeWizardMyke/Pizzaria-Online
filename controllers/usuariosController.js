const path = require ('path')
const fs = require ('fs')
const bcrypt = require('bcrypt')
const session = require('express-session')

// ============== aceessing to user BD ============== //
const userFile = path.join(__dirname, '../database/usuarios.json')
const userRead = fs.readFileSync(userFile, 'utf-8')

// ============== transforming in json ============== //
const userJson = JSON.parse(userRead, null, 4)

// ============== controller ============== //
const usuariosController = {
    index: (req, res ) =>{
        res.render('user')
    },
    cadastro: (req,res) =>{
       const {user_name,user_sobrenome , user_email,cep,complemento,tel, user_password} = req.body

       const newUser = {
        nome: user_name,
        sobrenome: user_sobrenome,
        email: user_email,
        cep,
        complemento,
        tel,
        password: bcrypt.hashSync( user_password, 10)
       }
       userJson.push(newUser)
       
       const json = JSON.stringify(userJson)
       fs.writeFileSync( userFile , json)
       res.redirect('/pizzas')

    },
    login: (req,res) =>{
        const {user_email, user_password} = req.body

        const errors = []
        const usuario = userJson.find(p=> p.email == user_email)
        const password = bcrypt.compareSync(user_password, usuario.password)

        if(usuario == undefined){
            errors.push('email invalido confirme os dados e tente novamente')
        }
        if(!password){
            errors.push('senha incorreta')
        }
        if(errors.length > 0 ){
            res.send('imposivel fazer login : ' + errors)
        }
        
        req.session.usuario = usuario.email
        res.redirect('/')
    },
    perfil: (req,res) => {


        const session = req.session.usuario

        if(session == undefined){
            res.redirect('/')
        }

        const usuario = userJson.find(p=> p.email == session)

        res.render('perfil', {usuario})
    },
    logoff: (req,res)=>{
        req.session.usuario = undefined
        res.redirect('/')
    }
}

module.exports = usuariosController