const GenericFilter = require('./genericFilter');
class MaquinaFilter extends GenericFilter{
    constructor(){
        super();
        this.data =  Object.assign(this.data,{
            ubicacion: null,
        })
    }

};

module.exports = MaquinaFilter;