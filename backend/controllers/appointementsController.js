const Appointement = require('../models/Appointement'); 
const User = require('../models/User'); 
const expressAsyncHandler = require('express-async-handler');

const getAppointmentsByUser = expressAsyncHandler(async (req, res) => {
    const userId = req.user._id;
    const appointments = await Appointement.find({ user: userId });
    res.status(200).json(appointments);
  });
  

const createAppointment = async (req, res) => {
    try {
        const {customerName, date } = req.body;
        const user = await User.findById(req.params.id);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const appointment = new Appointement({
          customerName,
          date,
          user: user._id
        });
    
        await appointment.save();
    
        res.status(201).json({ message: 'Appointment created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};
  
const updateAppointment = expressAsyncHandler(async (req, res) => {
    const appointmentId = req.params.id;
    const { type, customerName } = req.body;
    const appointment = await Appointement.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    appointment.type = type || appointment.type;
    appointment.customerName = customerName || appointment.customerName;
    await appointment.save();
    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  });
  
const deleteAppointment = expressAsyncHandler(async (req, res) => {
    const appointmentId = req.params.id;
    const appointment = await Appointement.findByIdAndDelete(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  });

module.exports = { getAppointmentsByUser,createAppointment,updateAppointment, deleteAppointment };
