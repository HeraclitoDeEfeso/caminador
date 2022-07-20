const AsistenteDAO = require('../daos/asistenteDAO')

class AsistenteService{
    static async get(id) {
		try {
			const asistente = await AsistenteDAO.fetch(id)
			return asistente
		} catch(err) {
			throw err
		}
    }

	static async find(filter) {
		try {
			const asistentes = await AsistenteDAO.find(filter.filterData(), filter.pagination)
			return asistentes
		} catch(err) {
			throw err
		}
	}

    static async count(filter) {
		try {
			return await AsistenteDAO.count(filter.filterData())
		} catch (err) {
			throw err
		}
    }

    static async save(asistente) {
		try {
			asistente = await AsistenteDAO.save(asistente)
            return asistente
		} catch (err) {
			throw err
		}
    }

	static async update(id, asistente) {
		try {
			asistente = await AsistenteDAO.update(id, asistente)
			return await this.get(id)
		} catch (err) {
			throw err
		}
    }

    static async delete(id) {
		try {
			return await AsistenteDAO.delete(id)
		} catch (err) {
			throw err
		}
    }
}

module.exports = AsistenteService