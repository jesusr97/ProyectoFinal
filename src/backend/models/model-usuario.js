const {Schema, model} =require('mongoose');


const UsuarioSchema= Schema({
    
    
    nombre: {
        type: String,
        required: true
        
    },
    apellidos: {
        type: String,
        required: true
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fecha_nac: {
        type: Date,
        required: true
        
    },
    password: {
        type :String,
        required: true,
    },
    saldo_puntos: {
        type: Number,
        required: false
        
    },
    img: {
        type: String,
        required: false,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROL'
    },
    profesion:{
        type: String,
        required: true,
    },
    ocupacion: [{
        type: Schema.Types.ObjectId,
        ref: 'Ocupacion',
        required: false
    }],
    servicios: [{
        type: Schema.Types.ObjectId,
        ref: 'Servicios',
        required: false
    }],
    trabajos: [{
        type: Schema.Types.ObjectId,
        ref: 'trabajos',
        required: false
    }]
});

UsuarioSchema.method('toJSON',function(){
    const { __v,_id, password, ...object }= this.toObject();

    object.id_usuario = _id;
    return object;
});

module.exports =model('usuarios', UsuarioSchema);
