const EjercicioDAO = require('../daos/ejercicioDAO')

class EjercicioService{
    static async get(id) {
		try {
			const ejercicio = await EjercicioDAO.fetch(id)
			return ejercicio
		} catch(err) {
			throw err
		}
    }

	static async find(filter) {
		try {
			const ejercicios = await EjercicioDAO.find(filter.filterData(), filter.pagination)
			return ejercicios
		} catch(err) {
			throw err
		}
	}

    static async count(filter) {
		try {
			return await EjercicioDAO.count(filter.filterData())
		} catch (err) {
			throw err
		}
    }

    static async save(ejercicio) {
		try {
			ejercicio = await EjercicioDAO.save(ejercicio)
            return ejercicio
		} catch (err) {
			throw err
		}
    }

	static async update(id, ejercicio) {
		try {
			ejercicio = await EjercicioDAO.update(id, ejercicio)
			return await this.get(id)
		} catch (err) {
			throw err
		}
    }

    static async delete(id) {
		try {
			return await EjercicioDAO.delete(id)
		} catch (err) {
			throw err
		}
    }
}

module.exports = EjercicioService