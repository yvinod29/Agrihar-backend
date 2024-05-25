import Registration from '../models/registrationModel.js';

export const getRegistrationDetails = async (req, res) => {
    const  registerStudentIds  = req.body;
    console.log(registerStudentIds)

    try {
        // Validate input
        if (!registerStudentIds || (typeof registerStudentIds !== 'string' && !Array.isArray(registerStudentIds))) {
            return res.status(400).json({ error: "Invalid input: registerStudentIds must be a string or an array" });
        }

        // Determine if we are handling a single ID or an array of IDs
        let registrations;
        if (typeof registerStudentIds === 'string') {
            // Single ID case
            registrations = await Registration.findById(registerStudentIds);
            if (!registrations) {
                return res.status(404).json({ error: "Registration not found for the provided ID" });
            }
        } else if (Array.isArray(registerStudentIds)) {
            // Array of IDs case
            registrations = await Registration.find({
                _id: { $in: registerStudentIds }
            });

            if (registrations.length === 0) {
                return res.status(404).json({ error: "No registrations found for the provided IDs" });
            }
        }

        // Return the found registrations
        res.status(200).json(registrations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
