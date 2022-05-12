const express = require('express')
const DoctorController = require('../controllers/doctorController');

const api = express.Router();

api.get('/:id', DoctorController.getDoctorById);
api.get('', DoctorController.getDoctors);
api.post('', DoctorController.createDoctor);
api.put('/:id', DoctorController.updateDoctor);
api.delete('/:id', DoctorController.deleteDoctor);

module.exports = api;