import mongoose, { Schema } from 'mongoose';

const PublicationsSchema = mongoose.Schema({
    namePublication: {
        type: String,
        required: [true, 'El nombre de la publicación es obligatorio']
    },
    author: {
        type: String,
        required: [true, 'El autor es obligatorio']
    },
    date: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    ageRatings: {
        type: String,
        required: [true, 'La clasificación por edades es obligatoria']
    },
    idComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    }
});

export default mongoose.model('Publications', PublicationsSchema);
