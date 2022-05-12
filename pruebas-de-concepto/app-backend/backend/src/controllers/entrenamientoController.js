const GenericController = require('./genericController')
const EntrenamientoService = require('../services/entrenamientoService')
const EntrenamientoDTO = require('../dtos/entrenamientoDTO')
const EntrenamientoFilter = require('../filters/entrenamientoFilter')
const EntrenamientoAssembler = require('../assemblers/entrenamientoAssembler')

class EntrenamientoController extends GenericController{

    static getEntrenamientoById(req, res, next) {
        const id = req.params.id
        EntrenamientoController.resolve(next, EntrenamientoService.get(id), entrenamiento => {
            res.status(200).send({
                data: EntrenamientoAssembler.toDTO(entrenamiento),
            })
        })
    }

    static getEntrenamientos(req, res, next) {
        const filter = new EntrenamientoFilter()
        filter.fillData(req.query)
        EntrenamientoController.resolve(next,
                Promise.all([
                    EntrenamientoService.find(filter), 
                    EntrenamientoService.count(filter)
                ]), results => {
            res.status(200).send({
                data: {
                    list: EntrenamientoAssembler.toDTOs(results[0]),
                    total:results[1],
                    offset: filter.pagination.offset,
                    limit: filter.pagination.limit
                }
            })
        })
    }
    
    static createEntrenamiento(req, res, next) {
        let entrenamientoDTO = new EntrenamientoDTO()
        entrenamientoDTO.hydrate(req.body)
        EntrenamientoController.resolve(next, EntrenamientoService.save(EntrenamientoAssembler.fromDTO(entrenamientoDTO)), entrenamiento => {
                res.status(201).send({
                    data: EntrenamientoAssembler.toDTO(entrenamiento)
                })
            })
    }
    
    static updateEntrenamiento(req, res, next) {
        let id = req.params.id
        let entrenamientoDTO = new EntrenamientoDTO()
        entrenamientoDTO.hydrate(req.body)
        EntrenamientoController.resolve(next, EntrenamientoService.update(id, EntrenamientoAssembler.fromDTO(entrenamientoDTO)), entrenamiento => {
                res.status(200).send({
                    data: EntrenamientoAssembler.toDTO(entrenamiento)
                })
            })
    }
    
    static deleteEntrenamiento(req, res, next) {
        let id = req.params.id
        EntrenamientoController.resolve(next, EntrenamientoService.delete(id), message => {
                res.status(200).send({
                    data: message
                })
            })
    }
}

module.exports = EntrenamientoController