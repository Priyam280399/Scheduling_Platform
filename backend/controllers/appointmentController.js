const Appointment = require('../models/Appointment');

// Schedule Appointment
exports.schedule = async (req, res) => {
  try {
    const { userId, date, timezone } = req.body;
    console.log("===>",userId, date, timezone);
    const appointment = await Appointment.create({userId, date, timezone})

    console.log(appointment);
    
    res.status(201).json({ message: 'Appointment scheduled successfully' });
  } catch (error) {
    console.log("===>",error);
    
    res.status(500).json({ error: 'Failed to schedule appointment', error});
  }
};
exports.fetchAppointments = async (req, res) => {
  try {
    const { userId, date, timezone } = req.body;
    console.log("===>",userId, date, timezone);
    const appointments = await Appointment.find().sort({createdAt:-1})

    console.log(appointments);
    
    res.status(200).json({ message: 'Appointment Fetched successfully',data:appointments });
  } catch (error) {
    console.log("===>",error);
    
    res.status(500).json({ error: 'Failed to fetched appointment', error});
  }
};
