import mongoose, { Schema } from 'mongoose';

const ForoSchema = mongoose.Schema({
    tituloForo: {
        type: String,
        required: [true, 'La pregunta es obligatoria']
    },

    contenido: {
        type: String,
        required: [true, 'La pregunta es obligatoria']
    },

});

export default mongoose.model('Foro', ForoSchema);
