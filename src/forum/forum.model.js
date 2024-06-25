import mongoose, { Schema } from 'mongoose';

const ForoSchema =mongoose.Schema({
    idcomment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    question: {
        type: String,
        required: [true, 'La pregunta es obligatoria']
    }
});

export default mongoose.model('Foro', ForoSchema);
