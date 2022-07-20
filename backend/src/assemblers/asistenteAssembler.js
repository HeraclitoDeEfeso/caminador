const GenericAssembler = require('./genericAssembler')


const Asistente = require('../models/asistente')
const AsistenteDTO = require('../dtos/asistenteDTO')

class AsistenteAssembler extends GenericAssembler{

	static toDTOs(asistentes) {
		return super.convertList(asistentes, AsistenteAssembler.toDTO)
	}

	static fromDTOs(asistentesDTO) {
		return super.convertList(asistentesDTO, AsistenteAssembler.fromDTO)
	}

	static toDTO(asistente) {
		const asistenteDTO = super.toDTO(asistente, AsistenteDTO)
		asistenteDTO.paciente = asistente.paciente
		
		return asistenteDTO
	}

	static fromDTO(asistenteDTO) {
		const asistente = super.fromDTO(asistenteDTO, Asistente)
		asistente.paciente = asistenteDTO.paciente
		
		return asistente
	}

}

module.exports = AsistenteAssembler