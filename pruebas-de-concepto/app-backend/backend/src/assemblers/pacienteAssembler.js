const GenericAssembler = require('./genericAssembler')


const Paciente = require('../models/paciente')
const PacienteDTO = require('../dtos/pacienteDTO')

class PacienteAssembler extends GenericAssembler{

	static toDTOs(pacientes) {
		return super.convertList(pacientes, PacienteAssembler.toDTO)
	}

	static fromDTOs(pacientesDTO) {
		return super.convertList(pacientesDTO, PacienteAssembler.fromDTO)
	}

	static toDTO(paciente) {
		const pacienteDTO = super.toDTO(paciente, PacienteDTO)
		pacienteDTO.historiaclinica = paciente.historiaclinica
		pacienteDTO.nombre = paciente.nombre
		pacienteDTO.apellido = paciente.apellido
		pacienteDTO.bitacora = paciente.bitacora
		
		return pacienteDTO
	}

	static fromDTO(pacienteDTO) {
		const paciente = super.fromDTO(pacienteDTO, Paciente)
		paciente.historiaclinica = pacienteDTO.historiaclinica
		paciente.nombre = pacienteDTO.nombre
		paciente.apellido = pacienteDTO.apellido
		paciente.bitacora = pacienteDTO.bitacora
		
		return paciente
	}

}

module.exports = PacienteAssembler