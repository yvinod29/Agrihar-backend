import Agriculture from "../models/agricultureModel.js";
import User from "../models/userModel.js";
import Review from "../models/reviewModel.js";

export const CreateReview = async (req, res) => {
    try {
        console.log(req.body)
        const { rating, description } = req.body;
        const userId = req.user._id;
        const { agriculture_id } = req.params;
        
        console.log(agriculture_id)
        console.log(req.params)
        console.log(userId)

        // Create a new review
        const newReview = new Review({
            userId: userId,
            agriculture_id: agriculture_id,
            rating: rating,
            description: description
        });
        // Save the review
        const savedReview = await newReview.save();

        // Update the user document with the review ID
        await User.findByIdAndUpdate(userId, { $push: { reviews: savedReview._id } });

        // Update the agriculture document with the review ID
        await Agriculture.findByIdAndUpdate(agriculture_id, { $push: { reviews: savedReview._id } });

        res.status(201).json({ success: true, review: savedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
