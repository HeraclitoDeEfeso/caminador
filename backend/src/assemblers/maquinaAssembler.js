const GenericAssembler = require('./genericAssembler')


const Maquina = require('../models/maquina')
const MaquinaDTO = require('../dtos/maquinaDTO')

class MaquinaAssembler extends GenericAssembler{

	static toDTOs(maquinas) {
		return super.convertList(maquinas, MaquinaAssembler.toDTO)
	}

	static fromDTOs(maquinasDTO) {
		return super.convertList(maquinasDTO, MaquinaAssembler.fromDTO)
	}

	static toDTO(maquina) {
		const maquinaDTO = super.toDTO(maquina, MaquinaDTO)
		maquinaDTO.ubicacion = maquina.ubicacion
		
		return maquinaDTO
	}

	static fromDTO(maquinaDTO) {
		const maquina = super.fromDTO(maquinaDTO, Maquina)
		maquina.ubicacion = maquinaDTO.ubicacion
		
		return maquina
	}

}

module.exports = MaquinaAssembler