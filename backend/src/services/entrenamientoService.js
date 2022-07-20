const EntrenamientoDAO = require('../daos/entrenamientoDAO')

class EntrenamientoService{
    static async get(id) {
		try {
			const entrenamiento = await EntrenamientoDAO.fetch(id)
			return entrenamiento
		} catch(err) {
			throw err
		}
    }

	static async find(filter) {
		try {
			const entrenamientos = await EntrenamientoDAO.find(filter.filterData(), filter.pagination)
			return entrenamientos
		} catch(err) {
			throw err
		}
	}

    static async count(filter) {
		try {
			return await EntrenamientoDAO.count(filter.filterData())
		} catch (err) {
			throw err
		}
    }

    static async save(entrenamiento) {
		try {
			entrenamiento = await EntrenamientoDAO.save(entrenamiento)
            return entrenamiento
		} catch (err) {
			throw err
		}
    }

	static async update(id, entrenamiento) {
		try {
			entrenamiento = await EntrenamientoDAO.update(id, entrenamiento)
			return await this.get(id)
		} catch (err) {
			throw err
		}
    }

    static async delete(id) {
		try {
			return await EntrenamientoDAO.delete(id)
		} catch (err) {
			throw err
		}
    }
}

module.exports = EntrenamientoService