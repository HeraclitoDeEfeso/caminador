const GenericModelDTO = require('./genericModelDTO')

class BitacoraDTO extends GenericModelDTO {
    constructor(){
		super()
		this.id = null
		this.fecha = null
		this.peso = null
		this.entrenamiento = null
    }

    hydrate(data){
        super.hydrate(data)
    }
}

module.exports = BitacoraDTO