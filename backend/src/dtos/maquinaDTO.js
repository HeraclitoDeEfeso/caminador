const GenericModelDTO = require('./genericModelDTO')

class MaquinaDTO extends GenericModelDTO {
    constructor(){
		super()
		this.id = null
		this.ubicacion = null
    }

    hydrate(data){
        super.hydrate(data)
    }
}

module.exports = MaquinaDTO