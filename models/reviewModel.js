import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    agriculture_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session', // Reference to the Session model
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Adds timestamps for createdAt and updatedAt
});

export default mongoose.model('Review', ReviewSchema);
