const express = require('express');
const router = express.Router();
const Appointement = require('../models/Appointement');
const authMiddleware = require('../middlewares/authMiddleware')

const {getAppointmentsByUser, createAppointment ,updateAppointment, deleteAppointment } = require('../controllers/appointementsController')


// GET all appointments
router.get('/', authMiddleware ,getAppointmentsByUser)

// POST a new appointment
router.post('/:id', createAppointment );
  
// PUT/UPDATE an appointment
router.put('/:id',authMiddleware, updateAppointment );
  
// DELETE an appointment
router.delete('/:id', authMiddleware,deleteAppointment);
   

module.exports = router;