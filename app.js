const express = require('express');
const app = express();

// **************** Requirer Router **************** //
const PizzasRouter = require('./routes/PizzasRouter')
const userRouter = require ('./routes/userRouter.js')
const carrinho = require ('./routes/carrinho');

// **************** Requirer Middlewares **************** //
const RegistraHoraDeAcesso = require('./middlewares/RegistraHoraDeAcesso');
const session = require('express-session');

// **************** app Setings **************** //
app.set('view engine','ejs');

// **************** Use Middlewares **************** //
app.use(
    session({
        secret: 'CHAVE-SECRETA',
        resave: false,
        saveUninitialized: true
    })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(RegistraHoraDeAcesso); // middleware função gravar hora de acesso
app.use(express.json())

// **************** Routes ****************//
app.use('/cart', carrinho);
app.use('/pizzas', PizzasRouter);
app.use('/user', userRouter);

app.get('/', (req,res) => {res.redirect("/pizzas")})


// **************** app. Server  ****************//
app.listen(3000, ()=>{console.log("servidor rodando na porta 3000")});

