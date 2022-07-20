const GenericFilter = require('./genericFilter');
class PacienteFilter extends GenericFilter{
    constructor(){
        super();
        this.data =  Object.assign(this.data,{
            historiaclinica: null,
			nombre: null,
			apellido: null,
			bitacora: null,
        })
    }

};

module.exports = PacienteFilter;