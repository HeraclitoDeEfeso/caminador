const GenericModelDTO = require('./genericModelDTO')

class CentromedicoDTO extends GenericModelDTO {
    constructor(){
		super()
		this.id = null
		this.ubicacion = null
		this.maquinas = null
    }

    hydrate(data){
        super.hydrate(data)
    }
}

module.exports = CentromedicoDTO