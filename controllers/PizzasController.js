const session = require('express-session')
const fs = require ('fs')
const path = require('path')

// **************** Consultando o BD de Pizzas **************** //
const arquivo = path.join(__dirname, '../database/pizzas.json')
const ReadFile = fs.readFileSync(arquivo, 'utf-8')

const pizzas = JSON.parse(ReadFile, null, 4)

// Criando e exportando o objeto literal que conterá todas as funções (controllers)
module.exports = {

    index: (req, res) => {

        let admin = req.session.usuario

        if(admin == undefined){
            admin = 'false'
        }else{
            admin = 'true'
        }

        let quantidade = 0

        let array = req.session.aEscolhida
        
        if(req.session.aEscolhida){
            quantidade = array.length
        }

        res.render('index.ejs',{ pizzas, quantidade, admin });
    },

    show: (req, res) => {
        let admin = req.session.usuario

        if(admin == undefined){
            admin = 'false'
        }else{
            admin = 'true'
        }
        let quantidade = 0

        let array = req.session.aEscolhida
        
        if(req.session.aEscolhida){
            quantidade = array.length
        }


        // Levantar o id que veio no parâmetro de rota
        let id = req.params.id;

        // Encontrar no array de pizzas a pizza
        let pizza = pizzas.find(p=>p.id == id);

        // Retornar a view pizza.ejs, a pizza encontrada
        res.render('pizza.ejs',{pizza, admin, quantidade });
    },

    search: (req, res) => {
        let admin = req.session.usuario

        let quantidade = 0

        let array = req.session.aEscolhida
        
        if(req.session.aEscolhida){
            quantidade = array.length
        }

        // Levantar o trecho que está sendo buscado (req.query.q)
        let termoBuscado = req.query.q;
        // Filtrar as pizzas para obter somente as pizzas com esse trecho
        let pizzasFiltradas = pizzas.filter(p => p.nome.toLowerCase().includes(termoBuscado.toLowerCase()))
        // retornar a view index.ejs, passando para ela somente as pizzas filtradas
        res.render('index.ejs', { pizzas: pizzasFiltradas, admin, quantidade });
    },

    addCart:(req,res) =>{
        const aEscolhida = req.session.aEscolhida
        
        if((aEscolhida) != undefined){
            req.session.aEscolhida.push(req.body.aEscolhida)
        }else{
            req.session.aEscolhida = [req.body.aEscolhida]
        }
        
        res.redirect('/pizzas')
    
    }

}