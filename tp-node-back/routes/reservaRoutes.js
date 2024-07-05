const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/reservas', authMiddleware, reservaController.getReservas);
router.post('/reservas', authMiddleware, reservaController.createReserva);
router.put('/reservas/:id', authMiddleware, reservaController.updateReserva);
router.delete('/reservas/:id', authMiddleware, reservaController.deleteReserva);

module.exports = router;
