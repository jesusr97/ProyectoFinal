const {Schema, model} =require('mongoose');
// const { TimeInterval, timeInterval } = require('rxjs/internal/operators/timeInterval');
// const { isEnumDeclaration } = require('typescript');


const ServiciosSchema= Schema({
    
    confirma_usuarios: {
        type: Boolean,
        required: true,
        default: 0
        
    },
    dia_inicio: {
        type: Date,
        required: true
        
    },
    dia_fin: {
        type: Date,
        required: false
    },
    total_dias: {
        type: Number,
        required: true,
        default: 0
        
    },
    valoraciones: {
        type: Number,
        required:false

    },
    comentarios: {
        type: String,
        required: false,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    ocupacion: {
        type: Schema.Types.ObjectId,
        ref: 'Ocupacion',
        required: false
    },
    trabajos: {
        type: Schema.Types.ObjectId,
        ref: 'trabajos',
        required: false
    }
});

ServiciosSchema.method('toJSON',function(){
    const { _id, password, ...object }= this.toObject();

    object.id_usuario = _id;
    return object;
},{collection: 'servicios'});

module.exports =model('Servicios', ServiciosSchema);
