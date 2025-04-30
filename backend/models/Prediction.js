const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  nombrePersona: { type: String, required: false }, // Cambiar a 'required: false'
  edadPersona: Number,
  tieneMascotasPrevias: Boolean,
  tipoCasa: String,
  prefiereGatosActivos: Boolean,
  peso: Number,
  raza: String,
  vacunado: Boolean,
  prediccionAdopcion: String,
  probabilidadAdopcionSi: Number,
  probabilidadAdopcionNo: Number
});

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
