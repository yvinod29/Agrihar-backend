
import express from 'express';
import formidable from 'express-formidable'

import { CreateWedding, GetAllWeddings, GetWeddingById } from '../controllers/weddingControllers.js';
import { RegisterWedding } from '../controllers/RegisterControllers.js';
import { requireSignIn } from '../middlewares/userAuthMiddleware.js';

const router = express.Router();

router.post("/",requireSignIn, formidable(),CreateWedding);


router.get("/", GetAllWeddings);

router.get("/:wedding_id", GetWeddingById);



router.put("/:wedding_id", requireSignIn,RegisterWedding);

export default router;