const express = require('express')
const router = express.Router()


// ============== import controler ============== //
const carrinhoController = require('../controllers/carrinho.js')


router.get('/' ,carrinhoController.carrinho)

module.exports = router
