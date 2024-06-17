import express from 'express';
import { requireSignIn } from '../middlewares/userAuthMiddleware.js';
import { CreateReview, GetReviews } from '../controllers/reviewControllers.js';


const router = express.Router();


router.get('/:agriculture_id',  GetReviews);

router.post('/:agriculture_id/:registration_id', requireSignIn, CreateReview);




export default router;