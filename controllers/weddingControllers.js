import cloudinary from "cloudinary";

import Wedding from "../models/weddingModel.js"; // Import the wedding model
import User from "../models/userModel.js"; // Import the user model

export const CreateWedding = async (req, res) => {
  try {
    // Destructure fields from the parsed form data
    console.log(req.fields);
    console.log(req.body)
    const {
      groomName,
      groomPhoneNumber,
      groomEmail,
      brideName,
      bridePhoneNumber,
      brideEmail,
      duration,
      languagesKnown,
      schedule,
      foodOffered,
      facilitiesProvided,
       accountDetails,
    } = req.fields;

    // Convert facilitiesProvided to an array
    // Initialize an empty array to store facilities provided
 let facilitiesProvidedArray = [];

// Check if the facilitiesProvided field exists in the request fields
if (req.fields.facilitiesProvided) {
  // Split the string by comma to convert it into an array
  facilitiesProvidedArray = req.fields.facilitiesProvided.split(',');
}

 let languagesKnownArray = [];
     if (req.fields.languagesKnown){
      languagesKnownArray=req.fields.languagesKnown.split(',');
     }
 console.log("guide")

    // Convert guestGuide to an array of objects
         let guestGuide = {};
       let nameKey = `guestGuide[name]`;
      
      guestGuide.name = req.fields[nameKey];
      guestGuide.phoneNumber = req.fields[`guestGuide[phoneNumber]`];
      guestGuide.relation = req.fields[`guestGuide[relation]`];
      guestGuide.email = req.fields[`guestGuide[email]`];
       console.log(guestGuide)
      
//     let scheduleArray = [];
//     console.log("she")
// let scheduleIndex = 0;
// while (true) {
//     let eventsArray = [];
//      let scheduleKey = `schedule[${scheduleIndex}]`;
//     const scheduleDate = req.fields[`${scheduleKey}[date]`];
//     const schedulePlace = req.fields[`${scheduleKey}[place]`];
//     if (!scheduleDate || !schedulePlace) {
//         break;
//     }
//     let eventsIndex = 0;
//     while (true) {
//         const eventKey = `${scheduleKey}[events][${eventsIndex}]`;
//         if (!req.fields[`${eventKey}[eventName]`]) {
//             break;
//         }
//         const event = {
//             eventName: req.fields[`${eventKey}[eventName]`],
//             startingTime: req.fields[`${eventKey}[startingTime]`], 
//             description: req.fields[`${eventKey}[description]`],
//             dressCode: req.fields[`${eventKey}[dressCode]`],
//             musicAndDancing: req.fields[`${eventKey}[musicAndDancing]`],
//         };
//         eventsArray.push(event);
//         eventsIndex++;
        
//     }
//     console.log(eventsArray)
//     scheduleArray.push({
//         date: scheduleDate,
//         place: schedulePlace,
//         events: eventsArray,
//     });
//     scheduleIndex++;
// }

// console.log(scheduleArray);

    
    // Upload images to Cloudinary
     
    let image = null;
    if (req.files && req.files.image) {
      console.log("Found image");
      const uploadResult = await cloudinary.uploader.upload(
        req.files.image.path,
        {
          folder: "wedding-images", // Set the folder in Cloudinary where you want to store wedding images
          // Add other Cloudinary upload options as needed
        }
      );
      image = {
        publicId: uploadResult.public_id,
        secureUrl: uploadResult.secure_url,
      };
    }
     
    // Create a new wedding instance
    const newWedding = new Wedding({
      groomName,
      groomPhoneNumber,
      groomEmail,
      brideName,
      bridePhoneNumber,
      brideEmail,
      image,
      duration,
      languagesKnown: languagesKnownArray,
      foodOffered,
      facilitiesProvided: facilitiesProvidedArray,
      schedule,
      guestGuide,
     accountDetails,
      hostedBy: req.user._id, // Assuming req.user contains the authenticated user's information
    });

    // Save the new wedding to the database
    const savedWedding = await newWedding.save();

    // Add the wedding ID to the hosting user's registeredWeddings array
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { registeredWeddings: savedWedding._id } },
      { new: true }
    );

    // Return success response
    res
      .status(201)
      .json({ message: "Wedding created successfully", wedding: savedWedding });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const GetAllWeddings = async (req, res) => {
  try {
    const weddings = await Wedding.find();
    res.status(200).json({ weddings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const GetWeddingById = async (req, res) => {
  try {
    const { wedding_id } = req.params;
    const wedding = await Wedding.findById(wedding_id);
    if (!wedding) {
      return res.status(404).json({ message: "Wedding not found" });
    }
    res.status(200).json({ wedding });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

 