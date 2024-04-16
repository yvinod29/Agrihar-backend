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
      langugaesKnown,
      farmName,
    } = req.fields;

    console.log(req.fields);

    // Convert location data into an array
    console.log(location);
    const locationArray = JSON.parse(location);
    console.log(locationArray);

    // Convert schedule JSON string into an array of objects

    const accountDetailsArray = JSON.parse(accountDetails);

    // Upload media files to Cloudinary
    const mediaArray = [];
    const formData = req.files;
    console.log(req.files);
    for (const file of Object.values(formData)) {
      console.log("image Found");
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
      farmName,
      whatToTeach,
      studentsPerClass,
      pricePerSession,
      requirements,
      facilitiesProvided,
      location: locationArray,
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
      return res.status(404).json({ message: "Agriculture Session not found" });
    }
    res.status(200).json({ AgricultureSession });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const GetAgricultureFarmsByIds = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ _id: req.user });

    console.log(user);
    const agricultureFarms_ids = user.hostedAgriculture;
    console.log(agricultureFarms_ids);

    // Check if wedding_ids is an array
    if (!Array.isArray(agricultureFarms_ids)) {
      return res.status(400).json({ message: "wedding_ids must be an array" });
    }

    // Retrieve weddings based on the array of IDs
    const agricultureFarms = await Agriculture.find({
      _id: { $in: agricultureFarms_ids },
    });
    console.log(agricultureFarms);

    // Check if any weddings are found
    if (agricultureFarms.length === 0) {
      return res.status(404).json({ message: "No weddings found" });
    }

    res.status(200).json({ agricultureFarms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateAgricultureSession = async (req, res) => {
  try {
    const updateFields = req.body;

    console.log(updateFields);

    const { agriculture_id } = req.params;
    console.log(agriculture_id);
    const agricultureExists = await Agriculture.exists({ _id: agriculture_id });

    if (!agricultureExists) {
      return res.status(404).json({ message: "Agriculture session not found" });
    }

    // Find the agriculture session by ID and update it with the provided fields
    const updatedAgricultureSession = await Agriculture.findByIdAndUpdate(
      agriculture_id,
      updateFields,
      { new: true } // Return the updated document
    );

    // Check if the agriculture session exists and was successfully updated
    if (!updatedAgricultureSession) {
      return res.status(404).json({ message: "Agriculture session not found" });
    }

    // Return the updated agriculture session
    res.status(200).json({ updatedAgricultureSession });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateScheduleOfSession = async (req, res) => {
  const { agriculture_id } = req.params; // Assuming agriculture_id is passed as a parameter in the request URL
  const updateFields = { schedule: req.body}; // Assuming schedule is the field you want to update

  try {
      const updatedAgricultureSession = await Agriculture.findByIdAndUpdate(
          agriculture_id,
          updateFields,
          { new: true } // Return the updated document
      );

      res.status(200).json(updatedAgricultureSession); // Send the updated document as JSON response
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' }); // Handle any errors
  }
};
