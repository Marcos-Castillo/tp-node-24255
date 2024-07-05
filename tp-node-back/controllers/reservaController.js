const Reserva = require('../models/Reserva');

exports.createReserva = async (req, res) => {
  try {
    const reserva = await Reserva.create(req.body);
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Reserva.update(req.body, { where: { id } });
    if (updated) {
      const updatedReserva = await Reserva.findOne({ where: { id } });
      res.status(200).json(updatedReserva);
    } else {
      throw new Error('Reserva no encontrada');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reserva.destroy({ where: { id } });
    if (deleted) {
      res.status(204).json();
    } else {
      throw new Error('Reserva no encontrada');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
