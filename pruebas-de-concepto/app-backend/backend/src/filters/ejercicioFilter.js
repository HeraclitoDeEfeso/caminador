const GenericFilter = require('./genericFilter');
class EjercicioFilter extends GenericFilter{
    constructor(){
        super();
        this.data =  Object.assign(this.data,{
            velocidad: null,
			duracion: null,
        })
    }

};

module.exports = EjercicioFilter;