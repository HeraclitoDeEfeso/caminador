const Doctor = require('../models/doctor');

class DoctorDAO{
    static save(doctor){
        return Doctor.create(doctor);
    }

    static fetch(id){
        return Doctor.findById(id);
    }

    static find(filter, pagination){
        return Doctor.find(filter).limit(pagination.limit).skip(pagination.offset)
        .populate("Centromedico")
        .populate("Asistente")
        .populate("Paciente");
    }

    static count(filter){
        return Doctor.count(filter);
    }

    static update(id, doctor) {
		const {_id, ...data} = doctor._doc;
		let dtoUpdate = {$set:data}
        return Doctor.findByIdAndUpdate(id, dtoUpdate);
    }

    static delete(id){
        return Doctor.findByIdAndRemove(id);
    }
}

module.exports = DoctorDAO