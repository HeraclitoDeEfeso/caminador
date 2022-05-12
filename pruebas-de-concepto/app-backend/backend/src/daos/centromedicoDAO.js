const Centromedico = require('../models/centromedico');

class CentromedicoDAO{
    static save(centromedico){
        return new Promise((resolve, reject) => {
            Centromedico.create(centromedico, (err, centromedicoStored) => {
                if (err || !centromedicoStored){
                    reject({message: "no pudo guardarse el centromedico"});
                } else {
                    centromedico._id = centromedicoStored._id;
                    resolve(centromedico);
                }
            });
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            Centromedico.findById(id).exec((err, centromedico) => {
                if (err || !centromedico){
                    reject ({message: "No pudo encontrarse el centromedico"});
                } else {
                    resolve(centromedico);
                }
            })
        })
    }

    static find(filter, pagination){
        return new Promise((resolve, reject) => {
            Centromedico.find(filter).limit(pagination.limit).skip(pagination.offset).exec((err, centromedicos) => {
                if (err || !centromedicos){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(centromedicos);                    
                }
            })
        })
    }

    static count(filter){
        return new Promise((resolve, reject) => {
            Centromedico.count(filter).exec((err, total) => {
                if (err){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(total);                    
                }
            })
        })
    }

    static update(id, centromedico) {
		const {_id, ...data} = centromedico._doc;
		let dtoUpdate = {$set:data}
        return new Promise((resolve, reject) => {
            Centromedico.findByIdAndUpdate(id, dtoUpdate).exec((err, centromedico2) => {
                if (err || !centromedico2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(centromedico2);
                }
            })
        })
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            
            Centromedico.findByIdAndRemove(id).exec((err, deleted) => {
                if (err || !deleted){
                    reject({message: "no se puede borrar el centromedico"});
                } else {
                    resolve({id:id});
                }
            })
        })
    }
}

module.exports = CentromedicoDAO