import Wedding from '../models/weddingModel.js';
import User from "../models/userModel.js"; // Import the user model


export const RegisterWedding = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(req.body)
        const weddingId = req.params.wedding_id;
        console.log(weddingId)
        const registrationData = {
            userId: userId,
            registeredInfo: {
                fullName: req.body.fullName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                numberOfGuests: req.body.numberOfGuests,
                place: req.body.place,
                feePaid: req.body.feePaid,
                transactionId: req.body.transactionId
            }
        };

        // Find the wedding document by ID
        const wedding = await Wedding.findById(weddingId);


        // Update the registeredUsers array with the new registration
        wedding.registeredUsers.push(registrationData);
        console.log(registrationData)

        // Save the updated wedding document
        const updatedWedding = await wedding.save();

        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { registeredWeddings: updatedWedding._id } },
            { new: true }
          );
      

        res.status(200).json({ message: 'Wedding registration successful', wedding: updatedWedding });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
