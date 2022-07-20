const GenericFilter = require('./genericFilter');
class DoctorFilter extends GenericFilter{
    constructor(){
        super();
        this.data =  Object.assign(this.data,{
            centromedico: null,
			asistente: null,
			paciente: null,
        })
    }

};

module.exports = DoctorFilter;