const Paciente = require('../models/paciente');

class PacienteDAO{
    static save(paciente){
        return Paciente.create(paciente);
    }

    static fetch(id){
        return Paciente.findById(id);
    }

    static find(filter, pagination){
        return Paciente.find(filter).limit(pagination.limit).skip(pagination.offset);
    }

    static count(filter){
        return Paciente.count(filter);
    }

    static update(id, paciente) {
		const {_id, ...data} = paciente._doc;
		let dtoUpdate = {$set:data}
        return Paciente.findByIdAndUpdate(id, dtoUpdate);
    }

    static delete(id){
        return Paciente.findByIdAndRemove(id);
    }
}

module.exports = PacienteDAO