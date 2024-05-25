import mongoose from "mongoose";
 
const weddingSchema = new mongoose.Schema(
  {
    hostRole:{
      type: String,
      required:true
    },
    hostFirstName: {
      type: String,
      required: true,
    },
    hostLastName: {
      type: String,
      required: true,
    },
    hostPhoneNumber: {
      type: String,
      required: true,
    },
    hostEmail: {
      type: String,
      required: true,
    },
    hostRelation:{
      type:String,
      
    },
    groomFirstName: {
      type: String,
      required: true,
    },
    groomLastName: {
      type: String,
      required: true,
    },
    groomPhoneNumber: {
      type: String,
      required: true,
    },
    groomEmail: {
      type: String,
      required: true,
    },
    brideFirstName: {
      type: String,
      required: true,
    },
    brideLastName: {
      type: String,
      required: true,
    },
    bridePhoneNumber: {
      type: String,
      required: true,
    },
    brideEmail: {
      type: String,
      required: true,
    },
    images: [{
      publicId: {
        type: String,
        required: true,
      },
      secureUrl: {
        type: String,
        required: true,
      },
    }],
    duration: {
      type: Number,
      required: true,
    },
    languagesKnown: {
      type: [String], // Array of languages known
      required: true,
    },  
    facilitiesProvided: {
      type: [String],
      required: true,
    },
    events: [
      {
        eventName: {
          type: String,
          required: true,
        },
        startingTime: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        dressCode: {
          type: String,
          required: true,
        },
        musicAndDancing: {
          type: String,
          required: true,
        },
        foodOffered:{
          type:String
        },
        country: {
          type: String,
        },
        region:{
          type: String
        },
        city:{
          type:String
        },
        postalCode: {
          type: String,
        },
        street: {
          type: String,
        },
        venueName: {
          type: String,
        },

      },
    ],

    guestGuide: {
      name: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      relation: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },

    accountDetails: {
      type: String,
      required: true,
    },
    hostedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registeredUsers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
       },
    ],
  },
  {
    timestamps: true,
  }
);

const Wedding = mongoose.model("Wedding", weddingSchema);

export default Wedding;
