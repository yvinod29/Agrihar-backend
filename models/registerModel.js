import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    feePaid: {
        type: Number,
     },
    transactionId: {
        type: String,
     }
}, {
    timestamps: true // Adds timestamps for createdAt and updatedAt
});

 
export default RegistrationSchema;
