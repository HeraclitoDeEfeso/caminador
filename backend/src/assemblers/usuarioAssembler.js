const GenericAssembler = require('./genericAssembler')


const Usuario = require('../models/usuario')
const UsuarioDTO = require('../dtos/usuarioDTO')

class UsuarioAssembler extends GenericAssembler{

	static toDTOs(usuarios) {
		return super.convertList(usuarios, UsuarioAssembler.toDTO)
	}

	static fromDTOs(usuariosDTO) {
		return super.convertList(usuariosDTO, UsuarioAssembler.fromDTO)
	}

	static toDTO(usuario) {
		const usuarioDTO = super.toDTO(usuario, UsuarioDTO)
		usuarioDTO.username = usuario.username
		usuarioDTO.password = usuario.password
		usuarioDTO.salt = usuario.salt
		
		return usuarioDTO
	}

	static fromDTO(usuarioDTO) {
		const usuario = super.fromDTO(usuarioDTO, Usuario)
		usuario.username = usuarioDTO.username
		usuario.password = usuarioDTO.password
		usuario.salt = usuarioDTO.salt
		
		return usuario
	}

}

module.exports = UsuarioAssembler