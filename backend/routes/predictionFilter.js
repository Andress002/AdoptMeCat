const express = require('express');
const Prediction = require('../models/Prediction');
const router = express.Router();



router.get('/' , async(req , res) => {
    try {
        const filtros = {};

        if (req.query.edadPersona) filtros.edadPersona = parseInt(req.query.edadPersona);
        if (req.query.raza) filtros.raza = { $regex: req.query.raza, $options: 'i' };
        if (req.query.comportamiento) filtros.comportamiento = { $regex: req.query.comportamiento, $options: 'i' };
        if (req.query.sexoGato) filtros.sexoGato = req.query.sexoGato;
        if (req.query.tamaño) filtros.tamaño = req.query.tamaño;
        if (req.query.peso) filtros.peso = req.query.peso;
        if (req.query.vacunado) filtros.vacunado = req.query.vacunado;


        const resultados = await Prediction.find(filtros);
        res.json(resultados);
    } catch (error) {
        console.error('❌ Error al filtrar predicciones' , error);
        res.status(400).json({error: 'Error al buscar predicciones'});
    }
});

module.exports = router;