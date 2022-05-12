const Doctor = require('../models/doctor');

class DoctorDAO{
    static save(doctor){
        return new Promise((resolve, reject) => {
            Doctor.create(doctor, (err, doctorStored) => {
                if (err || !doctorStored){
                    reject({message: "no pudo guardarse el doctor"});
                } else {
                    doctor._id = doctorStored._id;
                    resolve(doctor);
                }
            });
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            Doctor.findById(id).exec((err, doctor) => {
                if (err || !doctor){
                    reject ({message: "No pudo encontrarse el doctor"});
                } else {
                    resolve(doctor);
                }
            })
        })
    }

    static find(filter, pagination){
        return new Promise((resolve, reject) => {
            Doctor.find(filter).limit(pagination.limit).skip(pagination.offset).exec((err, doctors) => {
                if (err || !doctors){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(doctors);                    
                }
            })
        })
    }

    static count(filter){
        return new Promise((resolve, reject) => {
            Doctor.count(filter).exec((err, total) => {
                if (err){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(total);                    
                }
            })
        })
    }

    static update(id, doctor) {
		const {_id, ...data} = doctor._doc;
		let dtoUpdate = {$set:data}
        return new Promise((resolve, reject) => {
            Doctor.findByIdAndUpdate(id, dtoUpdate).exec((err, doctor2) => {
                if (err || !doctor2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(doctor2);
                }
            })
        })
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            
            Doctor.findByIdAndRemove(id).exec((err, deleted) => {
                if (err || !deleted){
                    reject({message: "no se puede borrar el doctor"});
                } else {
                    resolve({id:id});
                }
            })
        })
    }
}

module.exports = DoctorDAO