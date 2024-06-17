import mongoose from "mongoose";
 
 
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
    instructorAge:{
      type:Number,
      // required :true
    },
    instructorExperience:{
      type: String,
      // required :true
    },
    instructorQualification:{
      type: String,
      // required :true
    },
    farmName: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      // required: true,
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

            registeredStudentIds: [{
              // type: mongoose.Schema.Types.ObjectId,
              type:String
            }],
            mode: {
              type: String,
            },
            
            join_url:{
              type: String,
            },
            actualPrice:{
              type:Number,

            },
            suggestedPrice :{
              type:Number
            }

          },
        ],
      },
    ],
    reviewIds: [
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
    // registeredStudents: [
    //   {
    //     userId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //     },
    //     registeredInfo: RegistrationSchema,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Agriculture = mongoose.model("Agriculture", agricultureSchema);

export default Agriculture;
