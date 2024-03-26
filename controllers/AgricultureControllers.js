import cloudinary from "cloudinary";

import Agriculture from "../models/agricultureModel.js"; // Import the Agriculture model
import User from "../models/userModel.js"; // Import the user model

export const CreateAgricultureSession = async (req, res) => {
    try {
      const {
        instructorFirstName,
        instructorLastName,
        instructorPhoneNumber,
        instructorEmail,
        instructorDescription,
        whatToTeach,
         studentsPerClass,
        pricePerSession,
        requirements,
        facilitiesProvided,
         location,
         accountDetails,
         langugaesKnown
         
       } = req.fields;

      console.log(req.fields)
  
      // Convert location data into an array
      console.log(location);
       const locationArray = JSON.parse(location);
       console.log(locationArray)

  
      // Convert schedule JSON string into an array of objects
      
 
      const accountDetailsArray=JSON.parse(accountDetails)
  
      // Upload media files to Cloudinary
      const mediaArray = [];
      const formData = req.files;
      console.log(req.files)
      for (const file of Object.values(formData)) {
        console.log("image Found")
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "agriculture-media", // Set the folder in Cloudinary where you want to store agriculture media
          // Add other Cloudinary upload options as needed
        });
        mediaArray.push({
          publicId: uploadResult.public_id,
          secureUrl: uploadResult.secure_url,
        });
      }
  
      // Create a new agriculture session instance
      const newAgricultureSession = new Agriculture({
        instructorFirstName,
        instructorLastName,
        instructorPhoneNumber,
        instructorEmail,
        instructorDescription,
        whatToTeach,
        studentsPerClass,
        pricePerSession,
        requirements,
        facilitiesProvided,
        location:locationArray,
        media: mediaArray,
        accountDetails: accountDetailsArray,
        langugaesKnown,
        hostedBy: req.user._id,
         
      });
  
      // Save the new agriculture session to the database
      const savedAgricultureSession = await newAgricultureSession.save();
  
    //   // Add the agriculture session ID to the hosting user's hostedAgriculture array
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { hostedAgriculture: savedAgricultureSession._id } },
        { new: true }
      );
  
      // Return success response
      res.status(201).json({
        message: "Agriculture session created successfully",
        agricultureSession: savedAgricultureSession,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
export const GetAllAgricultureSessions = async (req, res) => {
  try {
    const AgricultureSession = await Agriculture.find();
    res.status(200).json({ AgricultureSession });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const GetAgricultureSessionById = async (req, res) => {
  try {
    const { agri_id } = req.params;
    const AgricultureSession = await Agriculture.findById(agri_id);
    if (!AgricultureSession) {
      return res.status(404).json({ message: "AgricultureSession not found" });
    }
    res.status(200).json({ AgricultureSession });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
