const Maquina = require('../models/maquina');

class MaquinaDAO{
    static save(maquina){
        return new Promise((resolve, reject) => {
            Maquina.create(maquina, (err, maquinaStored) => {
                if (err || !maquinaStored){
                    reject({message: "no pudo guardarse el maquina"});
                } else {
                    maquina._id = maquinaStored._id;
                    resolve(maquina);
                }
            });
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            Maquina.findById(id).exec((err, maquina) => {
                if (err || !maquina){
                    reject ({message: "No pudo encontrarse el maquina"});
                } else {
                    resolve(maquina);
                }
            })
        })
    }

    static find(filter, pagination){
        return new Promise((resolve, reject) => {
            Maquina.find(filter).limit(pagination.limit).skip(pagination.offset).exec((err, maquinas) => {
                if (err || !maquinas){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(maquinas);                    
                }
            })
        })
    }

    static count(filter){
        return new Promise((resolve, reject) => {
            Maquina.count(filter).exec((err, total) => {
                if (err){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(total);                    
                }
            })
        })
    }

    static update(id, maquina) {
		const {_id, ...data} = maquina._doc;
		let dtoUpdate = {$set:data}
        return new Promise((resolve, reject) => {
            Maquina.findByIdAndUpdate(id, dtoUpdate).exec((err, maquina2) => {
                if (err || !maquina2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(maquina2);
                }
            })
        })
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            
            Maquina.findByIdAndRemove(id).exec((err, deleted) => {
                if (err || !deleted){
                    reject({message: "no se puede borrar el maquina"});
                } else {
                    resolve({id:id});
                }
            })
        })
    }
}

module.exports = MaquinaDAO