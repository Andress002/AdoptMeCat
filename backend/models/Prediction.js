const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  edadPersona: Number,
  tieneMascotasPrevias: Boolean,
  tipoCasa: String,
  prefiereGatosActivos: Boolean,
  peso: Number,
  raza: String,
  sexoGato: String,
  tamaño: String,
  comportamiento: String,
  vacunado: Boolean,
  prediccionAdopcion: String,
  probabilidadAdopcionSi: Number,
  probabilidadAdopcionNo: Number
});

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
