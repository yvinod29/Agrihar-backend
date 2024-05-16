import axios from 'axios';
import jwt from 'jsonwebtoken';

// Route to create a Zoom meeting
export const ZoomLink = async (req, res) => {
    try {
        const { topic, start_time, duration } = req.body;
        const zoomApiUrl = 'https://api.zoom.us/v2/users/me/meetings';

        const tokenPayload = {
            iss: "Qzidvh5TIW7vmBGbkfcgA", // Client ID
            exp: Math.floor(Date.now() / 1000) + 3600 // Token expires in 1 hour
        };
        const token = jwt.sign(tokenPayload, "2TFMpNEd8qzgqfEcL035q42i2E2DO0gF"); // Client Secret

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`, // Corrected here
                'Content-Type': 'application/json'
            }
        };
        

        const data = {
            topic,
            type: 2, // Scheduled meeting
            start_time,
            duration
        };

        const response = await axios.post(zoomApiUrl, data, config);
        res.json({ joinUrl: response.data.join_url });
    } catch (error) {
        console.error('Failed to create meeting:', error.response.data);
        res.status(error.response.status || 500).json({ error: 'Failed to create meeting' });
    }
};
