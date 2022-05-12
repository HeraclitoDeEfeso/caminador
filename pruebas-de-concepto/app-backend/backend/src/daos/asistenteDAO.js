const Asistente = require('../models/asistente');

class AsistenteDAO{
    static save(asistente){
        return new Promise((resolve, reject) => {
            Asistente.create(asistente, (err, asistenteStored) => {
                if (err || !asistenteStored){
                    reject({message: "no pudo guardarse el asistente"});
                } else {
                    asistente._id = asistenteStored._id;
                    resolve(asistente);
                }
            });
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            Asistente.findById(id).exec((err, asistente) => {
                if (err || !asistente){
                    reject ({message: "No pudo encontrarse el asistente"});
                } else {
                    resolve(asistente);
                }
            })
        })
    }

    static find(filter, pagination){
        return new Promise((resolve, reject) => {
            Asistente.find(filter).limit(pagination.limit).skip(pagination.offset).exec((err, asistentes) => {
                if (err || !asistentes){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(asistentes);                    
                }
            })
        })
    }

    static count(filter){
        return new Promise((resolve, reject) => {
            Asistente.count(filter).exec((err, total) => {
                if (err){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(total);                    
                }
            })
        })
    }

    static update(id, asistente) {
		const {_id, ...data} = asistente._doc;
		let dtoUpdate = {$set:data}
        return new Promise((resolve, reject) => {
            Asistente.findByIdAndUpdate(id, dtoUpdate).exec((err, asistente2) => {
                if (err || !asistente2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(asistente2);
                }
            })
        })
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            
            Asistente.findByIdAndRemove(id).exec((err, deleted) => {
                if (err || !deleted){
                    reject({message: "no se puede borrar el asistente"});
                } else {
                    resolve({id:id});
                }
            })
        })
    }
}

module.exports = AsistenteDAO