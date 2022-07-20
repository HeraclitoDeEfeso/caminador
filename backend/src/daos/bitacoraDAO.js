const Bitacora = require('../models/bitacora');

class BitacoraDAO{
    static save(bitacora){
        return new Promise((resolve, reject) => {
            Bitacora.create(bitacora, (err, bitacoraStored) => {
                if (err || !bitacoraStored){
                    reject({message: "no pudo guardarse el bitacora"});
                } else {
                    bitacora._id = bitacoraStored._id;
                    resolve(bitacora);
                }
            });
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            Bitacora.findById(id).exec((err, bitacora) => {
                if (err || !bitacora){
                    reject ({message: "No pudo encontrarse el bitacora"});
                } else {
                    resolve(bitacora);
                }
            })
        })
    }

    static find(filter, pagination){
        return new Promise((resolve, reject) => {
            Bitacora.find(filter).limit(pagination.limit).skip(pagination.offset).exec((err, bitacoras) => {
                if (err || !bitacoras){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(bitacoras);                    
                }
            })
        })
    }

    static count(filter){
        return new Promise((resolve, reject) => {
            Bitacora.count(filter).exec((err, total) => {
                if (err){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(total);                    
                }
            })
        })
    }

    static update(id, bitacora) {
		const {_id, ...data} = bitacora._doc;
		let dtoUpdate = {$set:data}
        return new Promise((resolve, reject) => {
            Bitacora.findByIdAndUpdate(id, dtoUpdate).exec((err, bitacora2) => {
                if (err || !bitacora2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(bitacora2);
                }
            })
        })
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            
            Bitacora.findByIdAndRemove(id).exec((err, deleted) => {
                if (err || !deleted){
                    reject({message: "no se puede borrar el bitacora"});
                } else {
                    resolve({id:id});
                }
            })
        })
    }
}

module.exports = BitacoraDAO