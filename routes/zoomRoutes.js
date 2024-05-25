import express from 'express';
import {  
    getMeetings,
    createMeeting,
    zoomAuth,
    redirectToZoomAuth,
    getAccessToken,
    zoomCallback,
    refreshToken,
    createZoomLink
 } from '../controllers/ZoomControllers.js';
 
const router = express.Router();

router.get('/', zoomAuth);
router.get('/auth/zoom', redirectToZoomAuth);
router.get('/meetings', getMeetings);
router.get('/getAccessToken', getAccessToken);
 
router.post('/create', createMeeting);
router.get('/auth/callback', zoomCallback);
router.get('/refreshToken', refreshToken);
router.post('/zoomLink', createZoomLink);

export default router;
