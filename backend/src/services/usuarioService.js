const UsuarioDAO = require('../daos/usuarioDAO')

const crypto = require('crypto')

// hash password with sha256
const sha256 = function(password, salt){
    const hash = crypto.createHmac('sha256', salt)
    hash.update(password)
    return {
        salt,
        passwordHash: hash.digest('hex')
    }
}
class UsuarioService{
    static async get(id) {
		try {
			const usuario = await UsuarioDAO.fetch(id)
			return usuario
		} catch(err) {
			throw err
		}
    }

	static async find(filter) {
		try {
			const usuarios = await UsuarioDAO.find(filter.filterData(), filter.pagination)
			return usuarios
		} catch(err) {
			throw err
		}
	}

    static async count(filter) {
		try {
			return await UsuarioDAO.count(filter.filterData())
		} catch (err) {
			throw err
		}
    }

    static async save(usuario) {
		try {
			usuario = await UsuarioDAO.save(usuario)
            return usuario
		} catch (err) {
			throw err
		}
    }

	static async update(id, usuario) {
		try {
			usuario = await UsuarioDAO.update(id, usuario)
			return await this.get(id)
		} catch (err) {
			throw err
		}
    }

    static async delete(id) {
		try {
			return await UsuarioDAO.delete(id)
		} catch (err) {
			throw err
		}
    }

	static async auth(username, requestPassword) {
        const usuario = await UsuarioDAO.getByUsername(username)
        if(usuario){
            const { passwordHash } = sha256(requestPassword, usuario.salt)
            if (usuario.password === passwordHash) {
                return usuario
            }
        }
        throw new Error('Invalid login data')
    }
}

module.exports = UsuarioService