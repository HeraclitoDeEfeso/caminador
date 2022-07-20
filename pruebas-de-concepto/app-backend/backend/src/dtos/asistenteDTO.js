const GenericModelDTO = require('./genericModelDTO')

class AsistenteDTO extends GenericModelDTO {
    constructor(){
		super()
		this.id = null
		this.paciente = null
    }

    hydrate(data){
        super.hydrate(data)
    }
}

module.exports = AsistenteDTO