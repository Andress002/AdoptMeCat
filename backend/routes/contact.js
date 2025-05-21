const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Message = require('../models/Message');

// POST /api/contact
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('El nombre es obligatorio.'),
    body('email').isEmail().withMessage('Correo electrónico inválido.'),
    body('phone').optional().isMobilePhone().withMessage('Teléfono inválido.'),
    body('subject').isIn(['adoption', 'donation', 'volunteer', 'other']).withMessage('Asunto inválido.'),
    body('message').trim().notEmpty().withMessage('El mensaje es obligatorio.'),
    body('newsletter').optional().isBoolean().withMessage('El valor del boletín debe ser booleano.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phone, subject, message, newsletter } = req.body;

      const nuevoMensaje = new Message({
        name,
        email,
        phone,
        subject,
        message,
        newsletter
      });

      await nuevoMensaje.save();
      res.status(201).json({ message: 'Mensaje enviado correctamente.' });
    } catch (error) {
      console.error('Error al guardar el mensaje:', error);
      res.status(500).json({ error: 'Ocurrió un error al enviar el mensaje.' });
    }
  }
);

module.exports = router;
