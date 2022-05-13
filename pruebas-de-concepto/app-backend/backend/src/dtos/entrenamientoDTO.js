const GenericModelDTO = require('./genericModelDTO')

class EntrenamientoDTO extends GenericModelDTO {
    constructor(){
		super()
		this.id = null
		this.fecha = null
		this.peso = null
    this.modalidad=null
    this.ejercicio=null
    }

    hydrate(data){
        super.hydrate(data)
    }
}

module.exports = EntrenamientoDTO