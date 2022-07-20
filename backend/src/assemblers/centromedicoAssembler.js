const GenericAssembler = require('./genericAssembler')


const Centromedico = require('../models/centromedico')
const CentromedicoDTO = require('../dtos/centromedicoDTO')

class CentromedicoAssembler extends GenericAssembler{

	static toDTOs(centromedicos) {
		return super.convertList(centromedicos, CentromedicoAssembler.toDTO)
	}

	static fromDTOs(centromedicosDTO) {
		return super.convertList(centromedicosDTO, CentromedicoAssembler.fromDTO)
	}

	static toDTO(centromedico) {
		const centromedicoDTO = super.toDTO(centromedico, CentromedicoDTO)
		centromedicoDTO.ubicacion = centromedico.ubicacion
		centromedicoDTO.maquinas = centromedico.maquinas
		
		return centromedicoDTO
	}

	static fromDTO(centromedicoDTO) {
		const centromedico = super.fromDTO(centromedicoDTO, Centromedico)
		centromedico.ubicacion = centromedicoDTO.ubicacion
		centromedico.maquinas = centromedicoDTO.maquinas
		
		return centromedico
	}

}

module.exports = CentromedicoAssembler