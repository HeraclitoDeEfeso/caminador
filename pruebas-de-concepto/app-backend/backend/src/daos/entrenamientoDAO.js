const Entrenamiento = require('../models/entrenamiento');

class EntrenamientoDAO{
    static save(entrenamiento){
        return new Promise((resolve, reject) => {
            Entrenamiento.create(entrenamiento, (err, entrenamientoStored) => {
                if (err || !entrenamientoStored){
                    reject({message: "no pudo guardarse el entrenamiento"});
                } else {
                    entrenamiento._id = entrenamientoStored._id;
                    resolve(entrenamiento);
                }
            });
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            Entrenamiento.findById(id).exec((err, entrenamiento) => {
                if (err || !entrenamiento){
                    reject ({message: "No pudo encontrarse el entrenamiento"});
                } else {
                    resolve(entrenamiento);
                }
            })
        })
    }

    static find(filter, pagination){
        return new Promise((resolve, reject) => {
            Entrenamiento.find(filter).limit(pagination.limit).skip(pagination.offset).exec((err, entrenamientos) => {
                if (err || !entrenamientos){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(entrenamientos);                    
                }
            })
        })
    }

    static count(filter){
        return new Promise((resolve, reject) => {
            Entrenamiento.count(filter).exec((err, total) => {
                if (err){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(total);                    
                }
            })
        })
    }

    static update(id, entrenamiento) {
		const {_id, ...data} = entrenamiento._doc;
		let dtoUpdate = {$set:data}
        return new Promise((resolve, reject) => {
            Entrenamiento.findByIdAndUpdate(id, dtoUpdate).exec((err, entrenamiento2) => {
                if (err || !entrenamiento2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(entrenamiento2);
                }
            })
        })
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            
            Entrenamiento.findByIdAndRemove(id).exec((err, deleted) => {
                if (err || !deleted){
                    reject({message: "no se puede borrar el entrenamiento"});
                } else {
                    resolve({id:id});
                }
            })
        })
    }
}

module.exports = EntrenamientoDAO