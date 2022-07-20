const GenericFilter = require('./genericFilter');
class BitacoraFilter extends GenericFilter{
    constructor(){
        super();
        this.data =  Object.assign(this.data,{
            fecha: null,
			peso: null,
			entrenamiento: null,
        })
    }

};

module.exports = BitacoraFilter;