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
     
    registeredAgricultureSessions: [{
        name:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        numberOfGuests:{
            type:String,
            required:true

        },
        date:{
            type:Date,
            required:true
        },
        timings:{
            type:String,
            required:true
        },
        agricultureSessionId:{
            type:String,
            required:true
        },
        payment:{
            type:Boolean,
            
        },
        paidAmount:{
            type:Number
        }
        
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

