const GenericController = require('./genericController')
const AsistenteService = require('../services/asistenteService')
const AsistenteDTO = require('../dtos/asistenteDTO')
const AsistenteFilter = require('../filters/asistenteFilter')
const AsistenteAssembler = require('../assemblers/asistenteAssembler')

class AsistenteController extends GenericController{

    static getAsistenteById(req, res, next) {
        const id = req.params.id
        AsistenteController.resolve(next, AsistenteService.get(id), asistente => {
            res.status(200).send({
                data: AsistenteAssembler.toDTO(asistente),
            })
        })
    }

    static getAsistentes(req, res, next) {
        const filter = new AsistenteFilter()
        filter.fillData(req.query)
        AsistenteController.resolve(next,
                Promise.all([
                    AsistenteService.find(filter), 
                    AsistenteService.count(filter)
                ]), results => {
            res.status(200).send({
                data: {
                    list: AsistenteAssembler.toDTOs(results[0]),
                    total:results[1],
                    offset: filter.pagination.offset,
                    limit: filter.pagination.limit
                }
            })
        })
    }
    
    static createAsistente(req, res, next) {
        let asistenteDTO = new AsistenteDTO()
        asistenteDTO.hydrate(req.body)
        AsistenteController.resolve(next, AsistenteService.save(AsistenteAssembler.fromDTO(asistenteDTO)), asistente => {
                res.status(201).send({
                    data: AsistenteAssembler.toDTO(asistente)
                })
            })
    }
    
    static updateAsistente(req, res, next) {
        let id = req.params.id
        let asistenteDTO = new AsistenteDTO()
        asistenteDTO.hydrate(req.body)
        AsistenteController.resolve(next, AsistenteService.update(id, AsistenteAssembler.fromDTO(asistenteDTO)), asistente => {
                res.status(200).send({
                    data: AsistenteAssembler.toDTO(asistente)
                })
            })
    }
    
    static deleteAsistente(req, res, next) {
        let id = req.params.id
        AsistenteController.resolve(next, AsistenteService.delete(id), message => {
                res.status(200).send({
                    data: message
                })
            })
    }
}

module.exports = AsistenteController