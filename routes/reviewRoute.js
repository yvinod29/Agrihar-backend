import express from 'express';
import { requireSignIn } from '../middlewares/userAuthMiddleware.js';
import { CreateReview } from '../controllers/reviewControllers.js';


const router = express.Router();


router.post('/:agriculture_id', requireSignIn, CreateReview);





export default router;