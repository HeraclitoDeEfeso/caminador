const GenericModelDTO = require('./genericModelDTO')

class DoctorDTO extends GenericModelDTO {
    constructor(){
		super()
		this.id = null
		this.centromedico = null
		this.asistente = null
		this.paciente = null
    }

    hydrate(data){
        super.hydrate(data)
    }
}

module.exports = DoctorDTO