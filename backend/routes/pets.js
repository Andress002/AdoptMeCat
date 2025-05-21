const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, admin } = require('../middleware/authMiddleware');
const { getPets, createPet, deletePet } = require('../controllers/petController');

// Obtener todas las mascotas (gatos y perros)
router.get('/', getPets);

router.get('/:id', async (req, res) => {
  try {
    const Pet = require('../models/Pet');
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la mascota' });
  }
});



// Crear una nueva mascota (gato o perro)
router.post('/', protect, upload.single('image'), createPet);

// Eliminar una mascota por ID
router.delete('/:id', protect, admin, deletePet);

module.exports = router;
