const GenericController = require('./genericController')
const BitacoraService = require('../services/bitacoraService')
const BitacoraDTO = require('../dtos/bitacoraDTO')
const BitacoraFilter = require('../filters/bitacoraFilter')
const BitacoraAssembler = require('../assemblers/bitacoraAssembler')

class BitacoraController extends GenericController{

    static getBitacoraById(req, res, next) {
        const id = req.params.id
        BitacoraController.resolve(next, BitacoraService.get(id), bitacora => {
            res.status(200).send({
                data: BitacoraAssembler.toDTO(bitacora),
            })
        })
    }

    static getBitacoras(req, res, next) {
        const filter = new BitacoraFilter()
        filter.fillData(req.query)
        BitacoraController.resolve(next,
                Promise.all([
                    BitacoraService.find(filter), 
                    BitacoraService.count(filter)
                ]), results => {
            res.status(200).send({
                data: {
                    list: BitacoraAssembler.toDTOs(results[0]),
                    total:results[1],
                    offset: filter.pagination.offset,
                    limit: filter.pagination.limit
                }
            })
        })
    }
    
    static createBitacora(req, res, next) {
        let bitacoraDTO = new BitacoraDTO()
        bitacoraDTO.hydrate(req.body)
        BitacoraController.resolve(next, BitacoraService.save(BitacoraAssembler.fromDTO(bitacoraDTO)), bitacora => {
                res.status(201).send({
                    data: BitacoraAssembler.toDTO(bitacora)
                })
            })
    }
    
    static updateBitacora(req, res, next) {
        let id = req.params.id
        let bitacoraDTO = new BitacoraDTO()
        bitacoraDTO.hydrate(req.body)
        BitacoraController.resolve(next, BitacoraService.update(id, BitacoraAssembler.fromDTO(bitacoraDTO)), bitacora => {
                res.status(200).send({
                    data: BitacoraAssembler.toDTO(bitacora)
                })
            })
    }
    
    static deleteBitacora(req, res, next) {
        let id = req.params.id
        BitacoraController.resolve(next, BitacoraService.delete(id), message => {
                res.status(200).send({
                    data: message
                })
            })
    }
}

module.exports = BitacoraController