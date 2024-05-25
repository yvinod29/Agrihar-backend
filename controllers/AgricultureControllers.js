import cloudinary from "cloudinary";
import Agriculture from "../models/agricultureModel.js"; // Import the Agriculture model
import User from "../models/userModel.js"; // Import the user model
import Registration from '../models/registrationModel.js';

import { sendEventRegistrationConfirmationEmail } from "../middlewares/emailHelper.js";


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

 
      
        const locationArray = JSON.parse(location);
 
        // Convert schedule JSON string into an array of objects

        const accountDetailsArray = JSON.parse(accountDetails);

        // Upload media files to Cloudinary
        const mediaArray = [];
        const formData = req.files;
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
            return res
                .status(404)
                .json({ message: "Agriculture Session not found" });
        }
        res.status(200).json({ AgricultureSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const GetAgricultureFarmsByIds = async (req, res) => {
    try {
         const user = await User.findOne({ _id: req.user });

         const agricultureFarms_ids = user.hostedAgriculture;
 
        // Check if wedding_ids is an array
        if (!Array.isArray(agricultureFarms_ids)) {
            return res
                .status(400)
                .json({ message: "wedding_ids must be an array" });
        }

        // Retrieve weddings based on the array of IDs
        const agricultureFarms = await Agriculture.find({
            _id: { $in: agricultureFarms_ids },
        });
 
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

export const GetRegisteredAgricultureFarmsByIds = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user });

        const agricultureFarms_ids =
            user.registeredAgricultureSessions?.map(
                (session) => session.agricultureSessionId
            ) || [];

        // Check if wedding_ids is an array
        if (!Array.isArray(agricultureFarms_ids)) {
            return res.status(400).json({ message: " must be an array" });
        }

        // Retrieve weddings based on the array of IDs
        const agricultureFarms = await Agriculture.find({
            _id: { $in: agricultureFarms_ids },
        });

        // Check if any weddings are found
        if (agricultureFarms.length === 0) {
            return res.status(404).json({ message: "Not found" });
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

 
        const { agriculture_id } = req.params;
         const agricultureExists = await Agriculture.exists({
            _id: agriculture_id,
        });

        if (!agricultureExists) {
            return res
                .status(404)
                .json({ message: "Agriculture session not found" });
        }

        // Find the agriculture session by ID and update it with the provided fields
        const updatedAgricultureSession = await Agriculture.findByIdAndUpdate(
            agriculture_id,
            updateFields,
            { new: true } // Return the updated document
        );

        // Check if the agriculture session exists and was successfully updated
        if (!updatedAgricultureSession) {
            return res
                .status(404)
                .json({ message: "Agriculture session not found" });
        }

        // Return the updated agriculture session
        res.status(200).json({ updatedAgricultureSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const UpdateScheduleOfSession = async (req, res) => {
    const { agriculture_id } = req.params;

    try {
        // Find the agriculture session by ID
         const agricultureSession = await Agriculture.findById(agriculture_id);
 
        // Iterate over the new schedules and push each one individually
        for (const newSchedule of req.body) {
            const { classDate, classTime } = newSchedule;
            const formattedClassTime = classTime.map((ModeAndTime) => ({
                time: ModeAndTime.time,
                mode: ModeAndTime.mode
            }));
            agricultureSession.schedule.push({
                classDate: new Date(classDate),
                classTime: formattedClassTime,
            });
        }

        // Save the updated agriculture session
        const updatedAgricultureSession = await agricultureSession.save();

        res.status(200).json(updatedAgricultureSession); // Send the updated document as JSON response
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" }); // Handle any errors
    }
};


export const BookSession = async (req, res) => {
    const { agriculture_id } = req.params;
    const userId = req.user._id;

    const {
        firstName,
        email,
        numberOfGuests,
        selectedDate,
        selectedTime,
        phoneNumber,
        pricePerSession,
        mode,
        guests,
        timeId,
        dateId,
        farmName
    } = req.body;
    console.log(req.body)

    try {
        // Find the agriculture session by ID
        const agricultureSession = await Agriculture.findById(agriculture_id);
        if (!agricultureSession) {
            return res.status(404).json({ error: "Agriculture session not found" });
        }

        console.log(1)
        
        // Find the slot in the schedule matching the dateId and timeId
        const slot = agricultureSession.schedule.find((entry) => entry._id.toString() === dateId);
        if (!slot) {
            return res.status(404).json({ error: "Selected date not found in the schedule" });
        }
        console.log(2)
        
        const timeSlot = slot.classTime.find((ts) => ts._id.toString() === timeId);
        if (!timeSlot) {
            return res.status(404).json({ error: "Selected time not found in the schedule" });
        }
        console.log(3)

        // Create and save the registration details
        const registration = new Registration({
            name: firstName,
            phoneNumber,
            email,
            numberOfGuests,
            date: selectedDate,
            timings: selectedTime,
            agricultureSessionId: agriculture_id,
            mode,
            guests: guests || [],
            dataId: dateId,
            timeId: timeId,
            userId: userId,
            farmName:farmName
        });
        await registration.save();

        // Update the agriculture session with the registration ID
        timeSlot.registeredStudentIds.push(registration._id.toString());
        await agricultureSession.save();

        // Update the user with the registration ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log(4)

        user.registeredAgricultureSessionIds.push(registration._id.toString());
        await user.save();

        await sendEventRegistrationConfirmationEmail(
            email,
            agricultureSession.farmName,
            selectedDate,
            selectedTime,
            numberOfGuests
        );

        res.status(200).json({ message: "Booking session saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a schedule from an agriculture session
export const DeleteScheduleOfSession = async (req, res) => {
    const { agriculture_id, schedule_id } = req.params;
     // Assuming you pass the schedule ID in the request body
    // console.log(scheduleId);
    // console.log(agriculture_id);
    try {
        // Find the agriculture session by ID
        const agricultureSession = await Agriculture.findById(agriculture_id);

        // Find the index of the schedule to delete
        const scheduleIndex = agricultureSession.schedule.findIndex(
            (schedule) => schedule._id.toString() === schedule_id
        );

        // If schedule found, remove it
        if (scheduleIndex !== -1) {
            agricultureSession.schedule.splice(scheduleIndex, 1);
        } else {
            return res.status(404).json({ error: "Schedule not found" });
        }

        // Save the updated agriculture session
        const updatedAgricultureSession = await agricultureSession.save();

        res.status(200).json(updatedAgricultureSession); // Send the updated document as JSON response
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" }); // Handle any errors
    }
};



export const UpdateMeetingLink = async (req, res) => {
    const { agriculture_id } = req.params;
    const { classDateId, classTimeId, join_url } = req.body;
  
    try {
      // Find the agriculture session by ID
      const agricultureSession = await Agriculture.findById(agriculture_id);
  
      // Check if the agriculture session exists
      if (!agricultureSession) {
        return res.status(404).json({ error: "Agriculture session not found" });
      }
  
      if (!join_url) {
        return res.status(400).json({ error: "Join URL is required" });
      }
  
      // Find the class date within the schedule
      let foundClassDate, foundClassTime;
      agricultureSession.schedule.forEach(schedule => {
        if (schedule._id.toString() === classDateId) {
          foundClassDate = schedule;
          foundClassTime = schedule.classTime.find(time => time._id.toString() === classTimeId);
        }
      });
  
      if (!foundClassDate || !foundClassTime) {
        return res.status(404).json({ error: "Class date or class time not found" });
      }
  
      // Update the join URL in the agriculture session
      foundClassTime.join_url = join_url;
      await agricultureSession.save();
  
      // Update the join URL in all related registrations
      const registeredStudentIds = foundClassTime.registeredStudentIds;
      await Registration.updateMany(
        { _id: { $in: registeredStudentIds } },
        { $set: { join_url: join_url } }
      );
  
      // Send the updated document as JSON response
      res.status(200).json(agricultureSession);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };