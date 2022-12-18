const {Schema, model} =require('mongoose');


const TrabajosSchema= Schema({

    // disponibilidad: {
    //     type: JSON,
    //     required: true
        
    // },
    profesiones: {
        type: JSON,
        required: true
        
    },
    usuario: {
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
  
    },
    servicios: {
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'servicios'
    },
    ocupacion: {
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'ocupacion'
    }
    
}, {collection: 'trabajos'});

TrabajosSchema.method('toJSON',function(){
    const { ...object }= this.toObject();

    return object;
},{collection: 'trabajos'});

module.exports =model('trabajos', TrabajosSchema);