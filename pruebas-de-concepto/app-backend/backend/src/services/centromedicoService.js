const CentromedicoDAO = require('../daos/centromedicoDAO')

class CentromedicoService{
    static async get(id) {
		try {
			const centromedico = await CentromedicoDAO.fetch(id)
			return centromedico
		} catch(err) {
			throw err
		}
    }

	static async find(filter) {
		try {
			const centromedicos = await CentromedicoDAO.find(filter.filterData(), filter.pagination)
			return centromedicos
		} catch(err) {
			throw err
		}
	}

    static async count(filter) {
		try {
			return await CentromedicoDAO.count(filter.filterData())
		} catch (err) {
			throw err
		}
    }

    static async save(centromedico) {
		try {
			centromedico = await CentromedicoDAO.save(centromedico)
            return centromedico
		} catch (err) {
			throw err
		}
    }

	static async update(id, centromedico) {
		try {
			centromedico = await CentromedicoDAO.update(id, centromedico)
			return await this.get(id)
		} catch (err) {
			throw err
		}
    }

    static async delete(id) {
		try {
			return await CentromedicoDAO.delete(id)
		} catch (err) {
			throw err
		}
    }
}

module.exports = CentromedicoService