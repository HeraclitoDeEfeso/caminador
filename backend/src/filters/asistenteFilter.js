const GenericFilter = require('./genericFilter');
class AsistenteFilter extends GenericFilter{
    constructor(){
        super();
        this.data =  Object.assign(this.data,{
            paciente: null,
        })
    }

};

module.exports = AsistenteFilter;