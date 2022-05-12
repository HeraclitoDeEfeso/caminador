const Paciente = require('../models/paciente');

class PacienteDAO{
    static save(paciente){
        return new Promise((resolve, reject) => {
            Paciente.create(paciente, (err, pacienteStored) => {
                if (err || !pacienteStored){
                    reject({message: "no pudo guardarse el paciente"});
                } else {
                    paciente._id = pacienteStored._id;
                    resolve(paciente);
                }
            });
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            Paciente.findById(id).exec((err, paciente) => {
                if (err || !paciente){
                    reject ({message: "No pudo encontrarse el paciente"});
                } else {
                    resolve(paciente);
                }
            })
        })
    }

    static find(filter, pagination){
        return new Promise((resolve, reject) => {
            Paciente.find(filter).limit(pagination.limit).skip(pagination.offset).exec((err, pacientes) => {
                if (err || !pacientes){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(pacientes);                    
                }
            })
        })
    }

    static count(filter){
        return new Promise((resolve, reject) => {
            Paciente.count(filter).exec((err, total) => {
                if (err){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(total);                    
                }
            })
        })
    }

    static update(id, paciente) {
		const {_id, ...data} = paciente._doc;
		let dtoUpdate = {$set:data}
        return new Promise((resolve, reject) => {
            Paciente.findByIdAndUpdate(id, dtoUpdate).exec((err, paciente2) => {
                if (err || !paciente2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(paciente2);
                }
            })
        })
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            
            Paciente.findByIdAndRemove(id).exec((err, deleted) => {
                if (err || !deleted){
                    reject({message: "no se puede borrar el paciente"});
                } else {
                    resolve({id:id});
                }
            })
        })
    }
}

module.exports = PacienteDAO