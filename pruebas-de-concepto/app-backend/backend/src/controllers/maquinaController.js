const GenericController = require('./genericController')
const MaquinaService = require('../services/maquinaService')
const MaquinaDTO = require('../dtos/maquinaDTO')
const MaquinaFilter = require('../filters/maquinaFilter')
const MaquinaAssembler = require('../assemblers/maquinaAssembler')

class MaquinaController extends GenericController{

    static getMaquinaById(req, res, next) {
        const id = req.params.id
        MaquinaController.resolve(next, MaquinaService.get(id), maquina => {
            res.status(200).send({
                data: MaquinaAssembler.toDTO(maquina),
            })
        })
    }

    static getMaquinas(req, res, next) {
        const filter = new MaquinaFilter()
        filter.fillData(req.query)
        MaquinaController.resolve(next,
                Promise.all([
                    MaquinaService.find(filter), 
                    MaquinaService.count(filter)
                ]), results => {
            res.status(200).send({
                data: {
                    list: MaquinaAssembler.toDTOs(results[0]),
                    total:results[1],
                    offset: filter.pagination.offset,
                    limit: filter.pagination.limit
                }
            })
        })
    }
    
    static createMaquina(req, res, next) {
        let maquinaDTO = new MaquinaDTO()
        maquinaDTO.hydrate(req.body)
        MaquinaController.resolve(next, MaquinaService.save(MaquinaAssembler.fromDTO(maquinaDTO)), maquina => {
                res.status(201).send({
                    data: MaquinaAssembler.toDTO(maquina)
                })
            })
    }
    
    static updateMaquina(req, res, next) {
        let id = req.params.id
        let maquinaDTO = new MaquinaDTO()
        maquinaDTO.hydrate(req.body)
        MaquinaController.resolve(next, MaquinaService.update(id, MaquinaAssembler.fromDTO(maquinaDTO)), maquina => {
                res.status(200).send({
                    data: MaquinaAssembler.toDTO(maquina)
                })
            })
    }
    
    static deleteMaquina(req, res, next) {
        let id = req.params.id
        MaquinaController.resolve(next, MaquinaService.delete(id), message => {
                res.status(200).send({
                    data: message
                })
            })
    }
}

module.exports = MaquinaController