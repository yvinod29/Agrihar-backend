import mongoose from "mongoose";
import RegistrationSchema from "./registerModel.js";

const weddingSchema = new mongoose.Schema(
  {
    groomName: {
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
    brideName: {
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
    image: {
      publicId: {
        type: String,
        required: true,
      },
      secureUrl: {
        type: String,
        required: true,
      },
    },
    duration: {
      type: Number,
      required: true,
    },
    languagesKnown: {
      type: [String], // Array of languages known
      required: true,
    },
    foodOffered: {
      type: String,
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
        place: {
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
        registeredInfo: RegistrationSchema,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wedding = mongoose.model("Wedding", weddingSchema);

export default Wedding;
