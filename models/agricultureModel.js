import mongoose from "mongoose";
import RegistrationSchema from "./registerModel.js";
const Schema = mongoose.Schema;

const studentDetailsSchema = new Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: Number,
  },
  payment: {
    type: Boolean,
    // required:true
  },
  mode: {
    type: String,
  },
});

const agricultureSchema = new mongoose.Schema(
  {
    instructorFirstName: {
      type: String,
      required: true,
    },
    instructorLastName: {
      type: String,
      required: true,
    },
    instructorPhoneNumber: {
      type: String,
      required: true,
    },
    instructorEmail: {
      type: String,
      required: true,
    },
    instructorDescription: {
      type: String,
      required: true,
    },
    farmName: {
      type: String,
      required: true,
    },

    whatToTeach: {
      type: String,
      required: true,
    },
    languagesKnown: {
      type: [String], // Array of languages known
      required: true,
    },

    studentsPerClass: {
      type: Number,
      required: true,
    },
    pricePerSession: {
      type: Number,
      required: true,
      default: 1500,
    },
    requirements: {
      type: String,
      required: true,
    },
    facilitiesProvided: {
      type: [String],
      required: true,
    },
    location: {
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
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
    schedule: [
      {
        classDate: {
          type: Date,
          required: true,
        },
        classTime: [
          {
            time: {
              type: String,
              required: true,
            },
            registeredStudents: [studentDetailsSchema],
            mode: {
              type: String,
            },
          },
        ],
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    media: [
      {
        publicId: {
          type: String,
          required: true,
        },
        secureUrl: {
          type: String,
          required: true,
        },
      },
    ],
    accountDetails: {
      bankAccountNumber: {
        type: String,
        required: true,
      },
      IFSCcode: {
        type: String,
        required: true,
      },
    },
    hostedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registeredStudents: [
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

const Agriculture = mongoose.model("Agriculture", agricultureSchema);

export default Agriculture;
