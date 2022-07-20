const DoctorDAO = require('../daos/doctorDAO')

class DoctorService{
    static async get(id) {
		try {
			const doctor = await DoctorDAO.fetch(id)
			return doctor
		} catch(err) {
			throw err
		}
    }

	static async find(filter) {
		try {
			const doctors = await DoctorDAO.find(filter.filterData(), filter.pagination)
			return doctors
		} catch(err) {
			throw err
		}
	}

    static async count(filter) {
		try {
			return await DoctorDAO.count(filter.filterData())
		} catch (err) {
			throw err
		}
    }

    static async save(doctor) {
		try {
			doctor = await DoctorDAO.save(doctor)
            return doctor
		} catch (err) {
			throw err
		}
    }

	static async update(id, doctor) {
		try {
			doctor = await DoctorDAO.update(id, doctor)
			return await this.get(id)
		} catch (err) {
			throw err
		}
    }

    static async delete(id) {
		try {
			return await DoctorDAO.delete(id)
		} catch (err) {
			throw err
		}
    }
}

module.exports = DoctorService