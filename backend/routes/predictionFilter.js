const express = require('express');
const Prediction = require('../models/Prediction');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filtros = {};

    if (req.query.edadPersona) filtros.edadPersona = parseInt(req.query.edadPersona);
    if (req.query.raza) filtros.raza = { $regex: req.query.raza, $options: 'i' };
    if (req.query.comportamiento) filtros.comportamiento = { $regex: req.query.comportamiento, $options: 'i' };
    if (req.query.sexoGato) filtros.sexoGato = req.query.sexoGato;
    if (req.query.tamaño) filtros.tamaño = { $regex: req.query.tamaño, $options: 'i' };
    if (req.query.peso) filtros.peso = parseFloat(req.query.peso);

    if (req.query.estaVacunado) {
      const val = req.query.estaVacunado.toLowerCase();
      if (val === 'true' || val === '1' || val === 'si') filtros.estaVacunado = true;
      else if (val === 'false' || val === '0' || val === 'no') filtros.estaVacunado = false;
    }

    const resultados = await Prediction.find(filtros);
    res.json(resultados);
  } catch (error) {
    console.error('❌ Error al filtrar predicciones', error);
    res.status(400).json({ error: 'Error al buscar predicciones' });
  }
});

module.exports = router;
