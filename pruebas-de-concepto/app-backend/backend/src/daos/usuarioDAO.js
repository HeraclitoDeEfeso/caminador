const Usuario = require('../models/usuario');

class UsuarioDAO{
    static save(usuario){
        return Usuario.create(usuario);
    }

    static fetch(id){
        return Usuario.findById(id);
    }

    static find(filter, pagination){
        return Usuario.find(filter).limit(pagination.limit).skip(pagination.offset);
    }

    static count(filter){
        return Usuario.count(filter);
    }

    static update(id, usuario) {
		const {_id, ...data} = usuario._doc;
		let dtoUpdate = {$set:data}
        return Usuario.findByIdAndUpdate(id, dtoUpdate);
    }

    static delete(id){
        return Usuario.findByIdAndRemove(id);
    }

	static getByUsername(username) {
        return Usuario.findOne({ username})
    }
}

module.exports = UsuarioDAO