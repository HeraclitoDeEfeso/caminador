const Maquina = require('../models/maquina');

class MaquinaDAO{
    static save(maquina){
        return Maquina.create(maquina);
    }

    static fetch(id){
        return Maquina.findById(id);
    }

    static find(filter, pagination){
        return Maquina.find(filter).limit(pagination.limit).skip(pagination.offset);
    }

    static count(filter){
        return Maquina.count(filter);
    }

    static update(id, maquina) {
		const {_id, ...data} = maquina._doc;
		let dtoUpdate = {$set:data}
        return Maquina.findByIdAndUpdate(id, dtoUpdate);
    }

    static delete(id){
        return Maquina.findByIdAndRemove(id);
    }
}

module.exports = MaquinaDAO