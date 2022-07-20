class GenericAssembler{
    static convertIn(input, output){
        for(let key of Object.keys(output)){
            if(input[key]){
                output[key] = input[key]
            }
        }
	}

	static convertList(models, convertMethod) {
		return models.map(model => convertMethod(model))
	}

	static toDTO(model, ClassDTO) {
		const dto = new ClassDTO()
		if (model._id) {
			dto.id = model._id
		}
		return dto
	}

	static fromDTO(dto, ClassModel) {
		const model = new ClassModel()
		if (dto.id) {
			model._id = dto.id
		}
		return model
	}

}

module.exports = GenericAssembler