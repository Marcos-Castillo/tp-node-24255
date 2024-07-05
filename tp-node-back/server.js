const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', reservaRoutes);


app.get('/api/status', (req, res) => {
  res.status(200).json("Servidor en funcionamiento");
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
});


