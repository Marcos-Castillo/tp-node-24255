const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Usuario.create({ nombre, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }
    console.log('pre token')
    //const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });//error al obtener el env
   const token = jwt.sign({ id: user.id }, 'KJBU@Iuyvfoufd65d3434', { expiresIn: '1h' });
  
    console.log(process.env.JWT_SECRET)    
    console.log('paso token')
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};