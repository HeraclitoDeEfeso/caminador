const Ejercicio = require('../models/ejercicio');

class EjercicioDAO{
    static save(ejercicio){
        return new Promise((resolve, reject) => {
            Ejercicio.create(ejercicio, (err, ejercicioStored) => {
                if (err || !ejercicioStored){
                    reject({message: "no pudo guardarse el ejercicio"});
                } else {
                    ejercicio._id = ejercicioStored._id;
                    resolve(ejercicio);
                }
            });
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            Ejercicio.findById(id).exec((err, ejercicio) => {
                if (err || !ejercicio){
                    reject ({message: "No pudo encontrarse el ejercicio"});
                } else {
                    resolve(ejercicio);
                }
            })
        })
    }

    static find(filter, pagination){
        return new Promise((resolve, reject) => {
            Ejercicio.find(filter).limit(pagination.limit).skip(pagination.offset).exec((err, ejercicios) => {
                if (err || !ejercicios){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(ejercicios);                    
                }
            })
        })
    }

    static count(filter){
        return new Promise((resolve, reject) => {
            Ejercicio.count(filter).exec((err, total) => {
                if (err){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(total);                    
                }
            })
        })
    }

    static update(id, ejercicio) {
		const {_id, ...data} = ejercicio._doc;
		let dtoUpdate = {$set:data}
        return new Promise((resolve, reject) => {
            Ejercicio.findByIdAndUpdate(id, dtoUpdate).exec((err, ejercicio2) => {
                if (err || !ejercicio2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(ejercicio2);
                }
            })
        })
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            
            Ejercicio.findByIdAndRemove(id).exec((err, deleted) => {
                if (err || !deleted){
                    reject({message: "no se puede borrar el ejercicio"});
                } else {
                    resolve({id:id});
                }
            })
        })
    }
}

module.exports = EjercicioDAO