const {Schema, model} =require('mongoose');


const OcupacionSchema= Schema({

    ponderacion: {
        type: Number,
        required: false
        
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'usuario'
  
    }
    
}, {collection: 'ocupacion'});

OcupacionSchema.method('toJSON',function(){
    const { _v, ...object }= this.toObject();

    return object;
},{collection: 'ocupacion'});

module.exports =model('Ocupacion', OcupacionSchema);
