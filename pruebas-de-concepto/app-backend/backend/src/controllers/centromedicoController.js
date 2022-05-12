const GenericController = require('./genericController')
const CentromedicoService = require('../services/centromedicoService')
const CentromedicoDTO = require('../dtos/centromedicoDTO')
const CentromedicoFilter = require('../filters/centromedicoFilter')
const CentromedicoAssembler = require('../assemblers/centromedicoAssembler')

class CentromedicoController extends GenericController{

    static getCentromedicoById(req, res, next) {
        const id = req.params.id
        CentromedicoController.resolve(next, CentromedicoService.get(id), centromedico => {
            res.status(200).send({
                data: CentromedicoAssembler.toDTO(centromedico),
            })
        })
    }

    static getCentromedicos(req, res, next) {
        const filter = new CentromedicoFilter()
        filter.fillData(req.query)
        CentromedicoController.resolve(next,
                Promise.all([
                    CentromedicoService.find(filter), 
                    CentromedicoService.count(filter)
                ]), results => {
            res.status(200).send({
                data: {
                    list: CentromedicoAssembler.toDTOs(results[0]),
                    total:results[1],
                    offset: filter.pagination.offset,
                    limit: filter.pagination.limit
                }
            })
        })
    }
    
    static createCentromedico(req, res, next) {
        let centromedicoDTO = new CentromedicoDTO()
        centromedicoDTO.hydrate(req.body)
        CentromedicoController.resolve(next, CentromedicoService.save(CentromedicoAssembler.fromDTO(centromedicoDTO)), centromedico => {
                res.status(201).send({
                    data: CentromedicoAssembler.toDTO(centromedico)
                })
            })
    }
    
    static updateCentromedico(req, res, next) {
        let id = req.params.id
        let centromedicoDTO = new CentromedicoDTO()
        centromedicoDTO.hydrate(req.body)
        CentromedicoController.resolve(next, CentromedicoService.update(id, CentromedicoAssembler.fromDTO(centromedicoDTO)), centromedico => {
                res.status(200).send({
                    data: CentromedicoAssembler.toDTO(centromedico)
                })
            })
    }
    
    static deleteCentromedico(req, res, next) {
        let id = req.params.id
        CentromedicoController.resolve(next, CentromedicoService.delete(id), message => {
                res.status(200).send({
                    data: message
                })
            })
    }
}

module.exports = CentromedicoController