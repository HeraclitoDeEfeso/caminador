const Entrenamiento = require('../models/entrenamiento');

class EntrenamientoDAO{
    static save(entrenamiento){
        return Entrenamiento.create(entrenamiento);
    }

    static fetch(id){
        return Entrenamiento.findById(id);
    }

    static find(filter, pagination){
        return Entrenamiento.find(filter).limit(pagination.limit).skip(pagination.offset);
    }

    static count(filter){
        return Entrenamiento.count(filter);
    }

    static update(id, entrenamiento) {
		const {_id, ...data} = entrenamiento._doc;
		let dtoUpdate = {$set:data}
        return Entrenamiento.findByIdAndUpdate(id, dtoUpdate);
    }

    static delete(id){
        return Entrenamiento.findByIdAndRemove(id);
    }
}

module.exports = EntrenamientoDAO