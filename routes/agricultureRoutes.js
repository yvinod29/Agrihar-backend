
import express from 'express';
import formidable from 'express-formidable'
import { requireSignIn } from '../middlewares/userAuthMiddleware.js';
import { CreateAgricultureSession, GetAgricultureFarmsByIds, GetAgricultureSessionById, GetAllAgricultureSessions, UpdateAgricultureSession, UpdateScheduleOfSession } from '../controllers/AgricultureControllers.js';

 
const router = express.Router();

router.post("/",requireSignIn, formidable(),CreateAgricultureSession);
router.put("/edit/:agriculture_id",requireSignIn, UpdateAgricultureSession);
router.put("/edit_schedule/:agriculture_id",requireSignIn, UpdateScheduleOfSession);


router.get("/", GetAllAgricultureSessions);

router.get("/:agri_id", GetAgricultureSessionById);

router.get("/get/ids",requireSignIn,  GetAgricultureFarmsByIds);




// router.put("/:agri_id", requireSignIn,RegisterAgricultureSession);

export default router;