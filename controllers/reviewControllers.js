import Agriculture from "../models/agricultureModel.js";
import User from "../models/userModel.js";
import Review from "../models/reviewModel.js";
import Registration from "../models/registrationModel.js";
import reviewModel from "../models/reviewModel.js";

export const CreateReview = async (req, res) => {
    try {
        console.log(req.body)
        const { rating, description } = req.body;
        const userId = req.user._id;
        const { agriculture_id , registration_id} = req.params;

        // Create a new review
        const newReview = new Review({
            userId: userId,
            agriculture_id: agriculture_id,
            rating: rating,
            description: description
        });

        // Save the review
        const savedReview = await newReview.save();

        // Update the agriculture document with the review ID
        await Agriculture.findByIdAndUpdate(
            agriculture_id, 
            { $push: { reviewIds: savedReview._id } }
        );

        // Update the registration document with the provided review ID
        await Registration.findByIdAndUpdate(
            registration_id,
            { $set: { reviewId: savedReview._id } }
        );

        res.status(201).json({ success: true, review: savedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const GetReviews = async (req, res) => {
    try {
        const { agriculture_id } = req.params;
        console.log(agriculture_id)

        // Find the agriculture document to get the review IDs
        const agriculture = await Agriculture.findById(agriculture_id).populate('reviewIds');

        if (!agriculture) {
            return res.status(404).json({ success: false, message: "Agriculture document not found" });
        }
        console.log(agriculture.reviewIds)

        // Get the reviews including the user information
        const reviewsWithUserDetails = await Promise.all(
            agriculture.reviewIds.map(async (reviewId) => {
                const review = await Review.findById(reviewId);
                if (!review) {
                    return null;
                }
                const user = await User.findById(review.userId);
                return {
                    ...review._doc,
                    userFirstName: user ? user.firstName : "Unknown"
                };
            })
        );

        // Filter out any null values in case of missing reviews
        const filteredReviews = reviewsWithUserDetails.filter(review => review !== null);

        res.status(200).json({ success: true, reviews: filteredReviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
