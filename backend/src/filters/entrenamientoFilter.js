const GenericFilter = require('./genericFilter');
class EntrenamientoFilter extends GenericFilter{
    constructor(){
        super();
        this.data =  Object.assign(this.data,{
            fecha: null,
			peso: null,
        })
    }

};

module.exports = EntrenamientoFilter;