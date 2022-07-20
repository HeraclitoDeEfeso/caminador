const PacienteDAO = require('../daos/pacienteDAO')

class PacienteService{
    static async get(id) {
		try {
			const paciente = await PacienteDAO.fetch(id)
			return paciente
		} catch(err) {
			throw err
		}
    }

	static async find(filter) {
		try {
			const pacientes = await PacienteDAO.find(filter.filterData(), filter.pagination)
			return pacientes
		} catch(err) {
			throw err
		}
	}

    static async count(filter) {
		try {
			return await PacienteDAO.count(filter.filterData())
		} catch (err) {
			throw err
		}
    }

    static async save(paciente) {
		try {
			paciente = await PacienteDAO.save(paciente)
            return paciente
		} catch (err) {
			throw err
		}
    }

	static async update(id, paciente) {
		try {
			paciente = await PacienteDAO.update(id, paciente)
			return await this.get(id)
		} catch (err) {
			throw err
		}
    }

    static async delete(id) {
		try {
			return await PacienteDAO.delete(id)
		} catch (err) {
			throw err
		}
    }
}

module.exports = PacienteService