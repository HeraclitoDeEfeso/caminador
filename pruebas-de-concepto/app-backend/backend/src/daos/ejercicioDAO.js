const Ejercicio = require('../models/ejercicio');

class EjercicioDAO{
    static save(ejercicio){
        return Ejercicio.create(ejercicio);
    }

    static fetch(id){
        return Ejercicio.findById(id);
    }

    static find(filter, pagination){
        return Ejercicio.find(filter).limit(pagination.limit).skip(pagination.offset);
    }

    static count(filter){
        return Ejercicio.count(filter);
    }

    static update(id, ejercicio) {
		const {_id, ...data} = ejercicio._doc;
		let dtoUpdate = {$set:data}
        return Ejercicio.findByIdAndUpdate(id, dtoUpdate);
    }

    static delete(id){
        return Ejercicio.findByIdAndRemove(id);
    }
}

module.exports = EjercicioDAO