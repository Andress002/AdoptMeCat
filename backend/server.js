const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs')
const path = require('path');
const { exec } = require('child_process');
const { generarARFF } = require('./arffGenerator');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware para depuración
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.originalUrl}`);
  next();
});

app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Modelo para predicciones
const Prediction = require('./models/Prediction');

const predictionFilterRoutes = require('./routes/predictionFilter');
app.use('/api/predictions', predictionFilterRoutes);


// Middleware para archivos subidos
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));

const petsRoutes = require('./routes/pets');
app.use('/api/pets', petsRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const adoptionsRoutes = require('./routes/adoption');
app.use('/api/adoption', adoptionsRoutes);

const contactRoutes = require('./routes/contact');
app.use('/api/contact' , contactRoutes)

// 🧠 NUEVA RUTA: Predicción con Weka
app.post('/api/predictor', (req, res) => {
  const datos = req.body;
  const arffPath = path.join(__dirname, 'entrada.arff');
  const modelPath = path.join(__dirname, 'weka', 'modelo.model');
  const wekaJarPath = path.join(__dirname, 'weka', 'weka.jar');

  try {
    generarARFF(datos, arffPath);

    if (!fs.existsSync(arffPath)) {
      console.error('❌ Archivo ARFF no se generó correctamente.');
      return res.status(500).json({ error: 'No se pudo generar el archivo ARFF.' });
    }
  } catch (error) {
    console.error('❌ Error al generar archivo ARFF:', error.message);
    return res.status(500).json({ error: 'Error interno al preparar los datos.' });
  }

  const isWindows = process.platform === 'win32';
  const classpathSeparator = isWindows ? ';' : ':';
  const classPath = `.${classpathSeparator}${wekaJarPath}`;
  const javaCmd = `java -cp "${classPath}" WekaPredictor "${modelPath}" "${arffPath}"`;

  exec(javaCmd, { cwd: path.join(__dirname, 'weka') }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error ejecutando Weka:', stderr);
      return res.status(500).json({ error: 'Error al ejecutar el modelo de predicción.' });
    }

    const salida = stdout.trim().split('\n');
    let resultado = null;
    let porcentajeSi = null;
    let porcentajeNo = null;

    salida.forEach(linea => {
      const line = linea.toLowerCase();
      if (line.startsWith('resultado:')) {
        resultado = linea.split(':')[1].trim();
      } else if (line.startsWith('si:')) {
        porcentajeSi = parseFloat(linea.split(':')[1].trim().replace(/[^\d.]/g, ''));
      } else if (line.startsWith('no:')) {
        porcentajeNo = parseFloat(linea.split(':')[1].trim().replace(/[^\d.]/g, ''));
      }
    });


    if (porcentajeSi > 99.99) {
      porcentajeSi = 100;
      porcentajeNo = 0;
    }else if( porcentajeNo > 99.99){
      porcentajeNo = 100;
      porcentajeSi = 0;
    }else{
      const total = porcentajeSi + porcentajeNo;
      porcentajeSi = (porcentajeSi / total) * 100;
      porcentajeNo = (porcentajeNo / total) * 100;

      porcentajeSi = parseFloat(porcentajeSi.toFixed(2));
      porcentajeNo = parseFloat(porcentajeNo.toFixed(2));

      if (porcentajeSi + porcentajeNo !== 100) {
        porcentajeNo = 100 - porcentajeSi;
      }
    }

    console.log('✅ Resultado procesado:', { resultado, porcentajeSi, porcentajeNo });

    const prediccion = new Prediction({
      edadPersona: datos.edadPersona,
      tieneMascotasPrevias: datos.tieneMascotasPrevias === 'si',
      tipoCasa: datos.tipoCasa,
      prefiereGatosActivos: datos.prefiereGatosActivos === 'si',
      peso: datos.peso,
      raza: datos.raza,
      sexoGato: datos.sexoGato,
      tamaño: datos.tamaño,
      comportamiento: datos.comportamiento,
      estaVacunado: (typeof datos.estaVacunado === 'string' && datos.estaVacunado.toLowerCase() === 'si') || datos.estaVacunado === true,
      prediccionAdopcion: resultado,
      probabilidadAdopcionSi: porcentajeSi,
      probabilidadAdopcionNo: porcentajeNo
    });

    prediccion.save()
      .then(() => {
        console.log('✅ Predicción guardada exitosamente');
        res.json({
          resultado,
          porcentajeSi,
          porcentajeNo
        });
      })
      .catch(error => {
        console.error('❌ Error al guardar la predicción:', error);
        res.status(500).json({ error: 'Error al guardar la predicción en la base de datos.' });
      });
  });
});

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Adopción de Mascotas! 🐱🐶');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});