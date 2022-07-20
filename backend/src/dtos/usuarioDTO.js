const GenericModelDTO = require('./genericModelDTO')

class UsuarioDTO extends GenericModelDTO {
    constructor(){
		super()
		this.id = null
		this.username = null
		this.password = null
		this.salt = null
    }

    hydrate(data){
        super.hydrate(data)
    }
}

module.exports = UsuarioDTO