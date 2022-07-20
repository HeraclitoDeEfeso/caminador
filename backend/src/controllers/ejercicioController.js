const GenericController = require('./genericController')
const EjercicioService = require('../services/ejercicioService')
const EjercicioDTO = require('../dtos/ejercicioDTO')
const EjercicioFilter = require('../filters/ejercicioFilter')
const EjercicioAssembler = require('../assemblers/ejercicioAssembler')

class EjercicioController extends GenericController{

    static getEjercicioById(req, res, next) {
        const id = req.params.id
        EjercicioController.resolve(next, EjercicioService.get(id), ejercicio => {
            res.status(200).send({
                data: EjercicioAssembler.toDTO(ejercicio),
            })
        })
    }

    static getEjercicios(req, res, next) {
        const filter = new EjercicioFilter()
        filter.fillData(req.query)
        EjercicioController.resolve(next,
                Promise.all([
                    EjercicioService.find(filter), 
                    EjercicioService.count(filter)
                ]), results => {
            res.status(200).send({
                data: {
                    list: EjercicioAssembler.toDTOs(results[0]),
                    total:results[1],
                    offset: filter.pagination.offset,
                    limit: filter.pagination.limit
                }
            })
        })
    }
    
    static createEjercicio(req, res, next) {
        let ejercicioDTO = new EjercicioDTO()
        ejercicioDTO.hydrate(req.body)
        EjercicioController.resolve(next, EjercicioService.save(EjercicioAssembler.fromDTO(ejercicioDTO)), ejercicio => {
                res.status(201).send({
                    data: EjercicioAssembler.toDTO(ejercicio)
                })
            })
    }
    
    static updateEjercicio(req, res, next) {
        let id = req.params.id
        let ejercicioDTO = new EjercicioDTO()
        ejercicioDTO.hydrate(req.body)
        EjercicioController.resolve(next, EjercicioService.update(id, EjercicioAssembler.fromDTO(ejercicioDTO)), ejercicio => {
                res.status(200).send({
                    data: EjercicioAssembler.toDTO(ejercicio)
                })
            })
    }
    
    static deleteEjercicio(req, res, next) {
        let id = req.params.id
        EjercicioController.resolve(next, EjercicioService.delete(id), message => {
                res.status(200).send({
                    data: message
                })
            })
    }
}

module.exports = EjercicioController