import express from 'express';
import { requireSignIn } from '../middlewares/userAuthMiddleware.js';
import { getRegistrationDetails } from '../controllers/RegistrationControllers.js';

const router= express.Router();


router.post('/details',requireSignIn, getRegistrationDetails)




export default router;