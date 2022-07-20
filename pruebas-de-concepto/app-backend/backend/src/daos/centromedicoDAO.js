const Centromedico = require('../models/centromedico');

class CentromedicoDAO{
    static save(centromedico){
        return Centromedico.create(centromedico);
    }

    static fetch(id){
        return Centromedico.findById(id);
    }

    static find(filter, pagination){
        return Centromedico.find(filter).limit(pagination.limit).skip(pagination.offset)
        .populate("Maquina");
    }

    static count(filter){
        return Centromedico.count(filter);
    }

    static update(id, centromedico) {
		const {_id, ...data} = centromedico._doc;
		let dtoUpdate = {$set:data}
        return Centromedico.findByIdAndUpdate(id, dtoUpdate);
    }

    static delete(id){
        return Centromedico.findByIdAndRemove(id);
    }
}

module.exports = CentromedicoDAO