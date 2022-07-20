const GenericModelDTO = require('./genericModelDTO')

class EjercicioDTO extends GenericModelDTO {
    constructor(){
		super()
		this.id = null
		this.velocidad = null
		this.duracion = null
    }

    hydrate(data){
        super.hydrate(data)
    }
}

module.exports = EjercicioDTO