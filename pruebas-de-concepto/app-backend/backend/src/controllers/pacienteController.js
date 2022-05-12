const GenericController = require('./genericController')
const PacienteService = require('../services/pacienteService')
const PacienteDTO = require('../dtos/pacienteDTO')
const PacienteFilter = require('../filters/pacienteFilter')
const PacienteAssembler = require('../assemblers/pacienteAssembler')

class PacienteController extends GenericController{

    static getPacienteById(req, res, next) {
        const id = req.params.id
        PacienteController.resolve(next, PacienteService.get(id), paciente => {
            res.status(200).send({
                data: PacienteAssembler.toDTO(paciente),
            })
        })
    }

    static getPacientes(req, res, next) {
        const filter = new PacienteFilter()
        filter.fillData(req.query)
        PacienteController.resolve(next,
                Promise.all([
                    PacienteService.find(filter), 
                    PacienteService.count(filter)
                ]), results => {
            res.status(200).send({
                data: {
                    list: PacienteAssembler.toDTOs(results[0]),
                    total:results[1],
                    offset: filter.pagination.offset,
                    limit: filter.pagination.limit
                }
            })
        })
    }
    
    static createPaciente(req, res, next) {
        let pacienteDTO = new PacienteDTO()
        pacienteDTO.hydrate(req.body)
        PacienteController.resolve(next, PacienteService.save(PacienteAssembler.fromDTO(pacienteDTO)), paciente => {
                res.status(201).send({
                    data: PacienteAssembler.toDTO(paciente)
                })
            })
    }
    
    static updatePaciente(req, res, next) {
        let id = req.params.id
        let pacienteDTO = new PacienteDTO()
        pacienteDTO.hydrate(req.body)
        PacienteController.resolve(next, PacienteService.update(id, PacienteAssembler.fromDTO(pacienteDTO)), paciente => {
                res.status(200).send({
                    data: PacienteAssembler.toDTO(paciente)
                })
            })
    }
    
    static deletePaciente(req, res, next) {
        let id = req.params.id
        PacienteController.resolve(next, PacienteService.delete(id), message => {
                res.status(200).send({
                    data: message
                })
            })
    }
}

module.exports = PacienteController