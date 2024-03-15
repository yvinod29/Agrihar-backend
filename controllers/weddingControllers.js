import cloudinary from "cloudinary";

import Wedding from "../models/weddingModel.js"; // Import the wedding model
import User from "../models/userModel.js"; // Import the user model

export const CreateWedding = async (req, res) => {
  try {
    // Destructure fields from the parsed form data
    console.log(req.fields);
    const {
      hostRole,
      hostFirstName,
      hostLastName,
      hostEmail,
      hostPhoneNumber,
      groomFirstName,
      groomLastName,
      groomPhoneNumber,
      groomEmail,
      brideFirstName,
      brideLastName,
      bridePhoneNumber,
      brideEmail,
      duration,
      events,
      foodOffered,
      accountDetails,
    } = req.fields;

    // Convert facilitiesProvided to an array
    // Initialize an empty array to store facilities provided
    let facilitiesProvidedArray = [];

    // Check if the facilitiesProvided field exists in the request fields
    if (req.fields.facilitiesProvided) {
      // Split the string by comma to convert it into an array
      facilitiesProvidedArray = req.fields.facilitiesProvided.split(",");
    }

    let languagesKnownArray = [];
    if (req.fields.languagesKnown) {
      languagesKnownArray = req.fields.languagesKnown.split(",");
    }
    console.log("guide");

    // Convert guestGuide to an array of objects
    let guestGuide = {};
    let nameKey = `guestGuide[name]`;

    guestGuide.name = req.fields[nameKey];
    guestGuide.phoneNumber = req.fields[`guestGuide[phoneNumber]`];
    guestGuide.relation = req.fields[`guestGuide[relation]`];
    guestGuide.email = req.fields[`guestGuide[email]`];
    console.log(guestGuide);

    const eventsArray = JSON.parse(events);
    console.log(eventsArray);

    // Upload images to Cloudinary
    const formData = req.files;

// Extract files into an array
const filesArray = [];

for (const file of Object.values(formData)) {
  // Assuming you're using Cloudinary, you can upload the file here
  // Example: 
  const uploadResult = await cloudinary.uploader.upload(file.path, {
    folder: "wedding-images", // Set the folder in Cloudinary where you want to store wedding images
    // Add other Cloudinary upload options as needed
  });
  
  // Push information about the uploaded file to filesArray
  filesArray.push({
    publicId: uploadResult.public_id,
    secureUrl: uploadResult.secure_url, // or whatever you need
    // Add other relevant information about the file
  });
}
console.log("files")
console.log(filesArray);


    

    // Create a new wedding instance
    const newWedding = new Wedding({
      hostRole,
      hostFirstName,
      hostLastName,
      hostEmail,
      hostPhoneNumber,
      groomFirstName,
      groomLastName,
      groomPhoneNumber,
      groomEmail,
      brideFirstName,
      brideLastName,
      bridePhoneNumber,
      brideEmail,
      images:filesArray,
      duration,
      languagesKnown: languagesKnownArray,
      foodOffered,
      facilitiesProvided: facilitiesProvidedArray,
      events: eventsArray,
      guestGuide,
      accountDetails,
      hostedBy: req.user._id,
    });
    console.log(newWedding);

    // Save the new wedding to the database
    const savedWedding = await newWedding.save();

    // Add the wedding ID to the hosting user's registeredWeddings array
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { hostedWeddings: savedWedding._id } },
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
