import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    farmName:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numberOfGuests: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timings: {
        type: String,
        required: true
    },
    agricultureSessionId: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean
    },
    paidAmount: {
        type: Number
    },
    mode: {
        type: String
    },
    guests: [{
        firstName: String,
        email: String
    }],
    join_url: {
        type: String
    },
    dataId: {
        type: String,
        required: true
    },
    timeId: {
        type: String,
        required: true
    },
    refund:{
        type:Boolean,
        default:false
    }
});

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
