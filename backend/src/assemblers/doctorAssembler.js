const GenericAssembler = require('./genericAssembler')


const Doctor = require('../models/doctor')
const DoctorDTO = require('../dtos/doctorDTO')

class DoctorAssembler extends GenericAssembler{

	static toDTOs(doctors) {
		return super.convertList(doctors, DoctorAssembler.toDTO)
	}

	static fromDTOs(doctorsDTO) {
		return super.convertList(doctorsDTO, DoctorAssembler.fromDTO)
	}

	static toDTO(doctor) {
		const doctorDTO = super.toDTO(doctor, DoctorDTO)
		doctorDTO.centromedico = doctor.centromedico
		doctorDTO.asistente = doctor.asistente
		doctorDTO.paciente = doctor.paciente
		
		return doctorDTO
	}

	static fromDTO(doctorDTO) {
		const doctor = super.fromDTO(doctorDTO, Doctor)
		doctor.centromedico = doctorDTO.centromedico
		doctor.asistente = doctorDTO.asistente
		doctor.paciente = doctorDTO.paciente
		
		return doctor
	}

}

module.exports = DoctorAssembler