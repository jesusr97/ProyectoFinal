const {Schema, model} =require('mongoose');


const OcupacionSchema= Schema({

    ponderacion: {
        type: Number,
        required: true
        
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
  
    },
    servicios: {
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'servicios'
    }
    
}, {collection: 'ocupacion'});

OcupacionSchema.method('toJSON',function(){
    const { ...object }= this.toObject();

    return object;
},{collection: 'ocupacion'});

module.exports =model('Ocupacion', OcupacionSchema);
