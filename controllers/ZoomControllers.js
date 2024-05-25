import axios from 'axios';
import jwt from 'jsonwebtoken';
import { format, addMinutes, addHours, startOfDay } from 'date-fns';

let accessToken = '';

export const getMeetings = async (req, res) => {
    try {
        const response = await axios.get('https://api.zoom.us/v2/users/me/meetings', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        res.json(response.data.meetings);
    } catch (error) {
        console.error('Error getting meetings:', error);
        res.status(500).json({ error: 'Error getting meetings' });
    }
};

export const createMeeting = async (req, res) => {
    try {
        const { topic, start_time, type, duration, timezone, agenda } = req.body;

        const istStartTime = new Date(start_time); // Assuming start_time is in ISO format

        // Get the start of the day in IST (to ensure correct date)
        const startOfISTDay = startOfDay(istStartTime);

        // Adjust for IST offset (Indian Standard Time is UTC+5:30)
        const adjustedStartTime = addHours(startOfISTDay, 5); // Add 5 hours
        const adjustedStartTimeIST = addMinutes(adjustedStartTime, 30); // Add additional 30 minutes

        // Convert adjusted start time to UTC
        const utcStartTime = adjustedStartTimeIST.toISOString();

        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
            topic,
            type,
            start_time: utcStartTime,
            duration,
            timezone,
            agenda,
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: false,
                mute_upon_entry: true,
                watermark: false,
                use_pmi: false,
                approval_type: 0,
                audio: 'both',
                auto_recording: 'none'
            }
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error creating meeting:', error);
        res.status(500).json({ error: 'Error creating meeting' });
    }
};

export const zoomAuth = async (req, res) => {
    const code = req.query.code;

    if (!code) {
        res.send('<html><body><a href="/zoom/auth/zoom"><button>Sign In with Zoom</button></a></body></html>');
    } else {
        try {
            const response = await axios.post('https://zoom.us/oauth/token', null, {
                params: {
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: process.env.REDIRECT_URI
                },
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`
                }
            });
            accessToken = response.data.access_token;
            console.log(accessToken)
            res.redirect("http://localhost:5174/profile")
        } catch (error) {
            console.error('Error', error);
            res.send('Error');
        }
    }
};

export const redirectToZoomAuth = (req, res) => {
    const clientId = process.env.ZOOM_API_KEY;
    const redirect_uri = encodeURIComponent(process.env.REDIRECT_URI);
    const responseType = 'code';
    console.log(clientId, redirect_uri)
    const authorizationUrl = `https://zoom.us/oauth/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirect_uri}`;
    res.redirect(authorizationUrl);
};

export const getAccessToken = (req, res) => {
    console.log("accessToken"+accessToken)
    res.json({ accessToken });
};

export const zoomCallback = async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('No code provided');
    }
    try {
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.REDIRECT_URI
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        accessToken = response.data.access_token;
        console.log(accessToken)
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.send('Error obtaining token');
    }
};

export const refreshToken = async (req, res) => {
    try {
        const refresh_token = req.query.refreshToken;

        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        res.json(response.data);

    } catch (error) {
        console.error('Error', error);
        res.send('Error refreshing token');
    }
};

export const createZoomLink = async (req, res) => {
    try {
        const { topic, start_time, duration } = req.body;
        const zoomApiUrl = 'https://api.zoom.us/v2/users/me/meetings';

        const tokenPayload = {
            iss: process.env.ZOOM_API_KEY, // Client ID
            exp: Math.floor(Date.now() / 1000) + 3600 // Token expires in 1 hour
        };
        const token = jwt.sign(tokenPayload, process.env.ZOOM_API_SECRET); // Client Secret

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
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
        console.error('Failed to create meeting:', error.response?.data);
        res.status(error.response?.status || 500).json({ error: 'Failed to create meeting' });
    }
};
