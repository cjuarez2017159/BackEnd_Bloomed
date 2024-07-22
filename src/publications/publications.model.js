import mongoose from 'mongoose';

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
    edad: {
        type: String,
        enum: ['+18', '-18'],
        required: [true, 'La edad es obligatoria']
    },
    comment: {
        type: String,
        required: true
    }
});

export default mongoose.model('Publications', PublicationsSchema);
