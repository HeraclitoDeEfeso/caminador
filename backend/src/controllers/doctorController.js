const GenericController = require('./genericController')
const DoctorService = require('../services/doctorService')
const DoctorDTO = require('../dtos/doctorDTO')
const DoctorFilter = require('../filters/doctorFilter')
const DoctorAssembler = require('../assemblers/doctorAssembler')

class DoctorController extends GenericController{

    static getDoctorById(req, res, next) {
        const id = req.params.id
        DoctorController.resolve(next, DoctorService.get(id), doctor => {
            res.status(200).send({
                data: DoctorAssembler.toDTO(doctor),
            })
        })
    }

    static getDoctors(req, res, next) {
        const filter = new DoctorFilter()
        filter.fillData(req.query)
        DoctorController.resolve(next,
                Promise.all([
                    DoctorService.find(filter), 
                    DoctorService.count(filter)
                ]), results => {
            res.status(200).send({
                data: {
                    list: DoctorAssembler.toDTOs(results[0]),
                    total:results[1],
                    offset: filter.pagination.offset,
                    limit: filter.pagination.limit
                }
            })
        })
    }
    
    static createDoctor(req, res, next) {
        let doctorDTO = new DoctorDTO()
        doctorDTO.hydrate(req.body)
        DoctorController.resolve(next, DoctorService.save(DoctorAssembler.fromDTO(doctorDTO)), doctor => {
                res.status(201).send({
                    data: DoctorAssembler.toDTO(doctor)
                })
            })
    }
    
    static updateDoctor(req, res, next) {
        let id = req.params.id
        let doctorDTO = new DoctorDTO()
        doctorDTO.hydrate(req.body)
        DoctorController.resolve(next, DoctorService.update(id, DoctorAssembler.fromDTO(doctorDTO)), doctor => {
                res.status(200).send({
                    data: DoctorAssembler.toDTO(doctor)
                })
            })
    }
    
    static deleteDoctor(req, res, next) {
        let id = req.params.id
        DoctorController.resolve(next, DoctorService.delete(id), message => {
                res.status(200).send({
                    data: message
                })
            })
    }
}

module.exports = DoctorController