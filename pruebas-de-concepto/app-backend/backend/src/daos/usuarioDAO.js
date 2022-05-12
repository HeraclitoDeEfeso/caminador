const Usuario = require('../models/usuario');

class UsuarioDAO{
    static save(usuario){
        return new Promise((resolve, reject) => {
            Usuario.create(usuario, (err, usuarioStored) => {
                if (err || !usuarioStored){
                    reject({message: "no pudo guardarse el usuario"});
                } else {
                    usuario._id = usuarioStored._id;
                    resolve(usuario);
                }
            });
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            Usuario.findById(id).exec((err, usuario) => {
                if (err || !usuario){
                    reject ({message: "No pudo encontrarse el usuario"});
                } else {
                    resolve(usuario);
                }
            })
        })
    }

    static find(filter, pagination){
        return new Promise((resolve, reject) => {
            Usuario.find(filter).limit(pagination.limit).skip(pagination.offset).exec((err, usuarios) => {
                if (err || !usuarios){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(usuarios);                    
                }
            })
        })
    }

    static count(filter){
        return new Promise((resolve, reject) => {
            Usuario.count(filter).exec((err, total) => {
                if (err){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(total);                    
                }
            })
        })
    }

    static update(id, usuario) {
		const {_id, ...data} = usuario._doc;
		let dtoUpdate = {$set:data}
        return new Promise((resolve, reject) => {
            Usuario.findByIdAndUpdate(id, dtoUpdate).exec((err, usuario2) => {
                if (err || !usuario2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(usuario2);
                }
            })
        })
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            
            Usuario.findByIdAndRemove(id).exec((err, deleted) => {
                if (err || !deleted){
                    reject({message: "no se puede borrar el usuario"});
                } else {
                    resolve({id:id});
                }
            })
        })
    }

	static getByUsername(username) {
        return Usuario.findOne({ username})
    }
}

module.exports = UsuarioDAO