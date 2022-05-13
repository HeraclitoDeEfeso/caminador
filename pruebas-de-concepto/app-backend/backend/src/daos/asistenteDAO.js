const Asistente = require('../models/asistente');

class AsistenteDAO{
    static save(asistente){
        return Asistente.create(asistente);
    }

    static fetch(id){
        return Asistente.findById(id);
    }

    static find(filter, pagination){
        return Asistente.find(filter).limit(pagination.limit).skip(pagination.offset);
    }

    static count(filter){
        return Asistente.count(filter);
    }

    static update(id, asistente) {
		const {_id, ...data} = asistente._doc;
		let dtoUpdate = {$set:data}
        return Asistente.findByIdAndUpdate(id, dtoUpdate);
    }

    static delete(id){
        return Asistente.findByIdAndRemove(id);
    }
}

module.exports = AsistenteDAO