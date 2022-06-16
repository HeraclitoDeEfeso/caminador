const GenericAssembler = require('./genericAssembler')


const Bitacora = require('../models/bitacora')
const BitacoraDTO = require('../dtos/bitacoraDTO')

class BitacoraAssembler extends GenericAssembler{

	static toDTOs(bitacoras) {
		return super.convertList(bitacoras, BitacoraAssembler.toDTO)
	}

	static fromDTOs(bitacorasDTO) {
		return super.convertList(bitacorasDTO, BitacoraAssembler.fromDTO)
	}

	static toDTO(bitacora) {
		const bitacoraDTO = super.toDTO(bitacora, BitacoraDTO)
		bitacoraDTO.fecha = bitacora.fecha
		bitacoraDTO.peso = bitacora.peso
		bitacoraDTO.entrenamiento = bitacora.entrenamiento
		
		return bitacoraDTO
	}

	static fromDTO(bitacoraDTO) {
		const bitacora = super.fromDTO(bitacoraDTO, Bitacora)
		bitacora.fecha = bitacoraDTO.fecha
		bitacora.peso = bitacoraDTO.peso
		bitacora.entrenamiento = bitacoraDTO.entrenamiento
		
		return bitacora
	}

}

module.exports = BitacoraAssembler