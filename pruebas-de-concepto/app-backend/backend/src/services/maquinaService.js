const MaquinaDAO = require('../daos/maquinaDAO')

class MaquinaService{
    static async get(id) {
		try {
			const maquina = await MaquinaDAO.fetch(id)
			return maquina
		} catch(err) {
			throw err
		}
    }

	static async find(filter) {
		try {
			const maquinas = await MaquinaDAO.find(filter.filterData(), filter.pagination)
			return maquinas
		} catch(err) {
			throw err
		}
	}

    static async count(filter) {
		try {
			return await MaquinaDAO.count(filter.filterData())
		} catch (err) {
			throw err
		}
    }

    static async save(maquina) {
		try {
			maquina = await MaquinaDAO.save(maquina)
            return maquina
		} catch (err) {
			throw err
		}
    }

	static async update(id, maquina) {
		try {
			maquina = await MaquinaDAO.update(id, maquina)
			return await this.get(id)
		} catch (err) {
			throw err
		}
    }

    static async delete(id) {
		try {
			return await MaquinaDAO.delete(id)
		} catch (err) {
			throw err
		}
    }
}

module.exports = MaquinaService