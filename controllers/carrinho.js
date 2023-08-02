const fs = require ('fs')
const path = require ('path')

const localArquivo = path.join(__dirname, '../database/pizzas.json')
const leituraDados = fs.readFileSync(localArquivo, 'utf-8')

const pizzasJson = JSON.parse(leituraDados, null, 4);


const controller = {
    carrinho: (req,res) => {
        let admin = req.session.usuario

        if(admin == undefined){
            admin = 'false'
        }else{
            admin = 'true'
        }
   
        const pizzasID = req.session.aEscolhida

        const pizzasCarrinho = []
    
        for(let i in pizzasID){   // percorendo todos os id que foram guardados na session quando adicionamos ao carrinho
            let id = pizzasID[i]  // aqui atribuo o valor do id conforme percorremos o array para passarmos ele para o find.
            const item = pizzasJson.find(p=> p.id == id) // aqui usamos o find para verificar no json o id correspondente e retornar para nossa string
            if(item !== undefined){ // caso essa pesquisa seja diferende de undefined adicionamos ela a um novo array
                pizzasCarrinho.push(item) //adicionando a um novo array
            }
        }

        res.render('carrinho', {admin, pizzasCarrinho})
    }
}

module.exports = controller