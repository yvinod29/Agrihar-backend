import mongoose from "mongoose";
 
 const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
     },
     profilePic: {
        publicId: {
            type: String,
         },
        secureUrl: {
            type: String,
         }
    },
    hostedWeddings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wedding'
    }],
    hostedAgriculture: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agriculture'
    }],
    hostedFitness: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fitness'
    }],
    registeredWeddings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wedding'
    }],
     
    registeredAgriculture: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agriculture'
    }],
    registeredFitness: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fitness'
    }],
    resetCode: {
        code: {
            type: String,
        },
        expiresAt: {
            type: Date,
        },
    },
}, {
    timestamps: true,
});
 const User = mongoose.model('User', userSchema);

export default User;

