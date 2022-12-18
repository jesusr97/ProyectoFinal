const {Schema, model} =require('mongoose');


const OcupacionSchema= Schema({

    puntuacion: {
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
    },
    trabajos: {
        type: Schema.Types.ObjectId,
        ref: 'trabajos',
        required: false
    }
    
}, {collection: 'ocupacion'});

OcupacionSchema.method('toJSON',function(){
    const { ...object }= this.toObject();

    return object;
},{collection: 'ocupacion'});

module.exports =model('Ocupacion', OcupacionSchema);
