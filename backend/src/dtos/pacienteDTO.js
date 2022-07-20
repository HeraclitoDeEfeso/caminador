const GenericModelDTO = require('./genericModelDTO')

class PacienteDTO extends GenericModelDTO {
    constructor(){
		super()
		this.id = null
		this.historiaclinica = null
		this.nombre = null
		this.apellido = null
		this.bitacora = null
    }

    hydrate(data){
        super.hydrate(data)
    }
}

module.exports = PacienteDTO