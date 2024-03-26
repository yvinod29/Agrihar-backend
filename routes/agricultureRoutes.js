
import express from 'express';
import formidable from 'express-formidable'
import { requireSignIn } from '../middlewares/userAuthMiddleware.js';
import { CreateAgricultureSession, GetAgricultureSessionById, GetAllAgricultureSessions } from '../controllers/AgricultureControllers.js';

 
const router = express.Router();

router.post("/",requireSignIn, formidable(),CreateAgricultureSession);


router.get("/", GetAllAgricultureSessions);

router.get("/:agri_id", GetAgricultureSessionById);



// router.put("/:agri_id", requireSignIn,RegisterAgricultureSession);

export default router;