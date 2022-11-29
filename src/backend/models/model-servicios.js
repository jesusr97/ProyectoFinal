const {Schema, model} =require('mongoose');
const { isEnumDeclaration } = require('typescript');


const ServiciosSchema= Schema({
    
    
    confirma_usuarios: {
        type: Boolean,
        required: true
        
    },
    dia_inicio: {
        type: Date,
        required: true
        
    },
    dia_fin: {
        type: Date,
        required: true
    },
    hora_inicio: {
        type: Date,
        required: true
        
    },
    hora_fin: {
        type :Date,
        required: true,
    },
    total_horas: {
        type: Number,
        required: true
        
    },
    valoraciones: {
        type: isEnumDeclaration={
            UNA_ESTRELLA: '1',
            DOS_ESTRELLAS: '2',
            TRES_ESTRELLAS: '3',
            CUATRO_ESTRELLAS: '4',
            CINCO_ESTRELLAS: '5',
        },
        required:false

    },
    comentarios: {
        type: Text,
        required: false,
    },
    ocupacion: {
        type: Schema.Types.ObjectId,
        ref: 'Ocupacion',
        required: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    }
});

ServiciosSchema.method('toJSON',function(){
    const { _id, password, ...object }= this.toObject();

    object.id_usuario = _id;
    return object;
},{collection: 'servicios'});

module.exports =model('servicios', ServiciosSchema);
