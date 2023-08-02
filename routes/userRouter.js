const express = require ('express')
const router = express.Router()

// ==================== middlweares is required ==================== //
const user = require('../controllers/usuariosController.js')
const ctValidator = require('../middlewares/ctValidator')

// ==================== defined routes ==================== //
router.get('/', user.index)
router.post('/cadastro',ctValidator, user.cadastro)
router.post('/login', user.login)
router.get('/perfil', user.perfil)
router.get('/logoff', user.logoff)

module.exports = router