const GenericFilter = require('./genericFilter');
class CentromedicoFilter extends GenericFilter{
    constructor(){
        super();
        this.data =  Object.assign(this.data,{
            ubicacion: null,
			maquinas: null,
        })
    }

};

module.exports = CentromedicoFilter;