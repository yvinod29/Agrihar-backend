import express from "express";
import formidable from "express-formidable";
import { requireSignIn } from "../middlewares/userAuthMiddleware.js";
import {
  BookSession,
  CreateAgricultureSession,
  GetAgricultureFarmsByIds,
  GetAgricultureSessionById,
  GetAllAgricultureSessions,
  GetRegisteredAgricultureFarmsByIds,
  UpdateAgricultureSession,
  UpdateScheduleOfSession,
  DeleteScheduleOfSession,
  UpdateMeetingLink,
} from "../controllers/AgricultureControllers.js";

const router = express.Router();

router.post("/", requireSignIn, formidable(), CreateAgricultureSession);

router.put("/edit/:agriculture_id", requireSignIn, UpdateAgricultureSession);

router.put("/edit_schedule/:agriculture_id", requireSignIn,UpdateScheduleOfSession);

router.put("/meet/mettinglink/:agriculture_id",requireSignIn,UpdateMeetingLink);
router.put("/:agriculture_id/book_session", requireSignIn, BookSession);

router.get("/", GetAllAgricultureSessions);

router.get("/:agri_id", GetAgricultureSessionById);

router.get("/get/ids", requireSignIn, GetAgricultureFarmsByIds);

router.get("/get/registered/ids",requireSignIn,GetRegisteredAgricultureFarmsByIds);

router.delete("/delete_schedule/:agriculture_id/:schedule_id",DeleteScheduleOfSession);

// router.put("/:agri_id", requireSignIn,RegisterAgricultureSession);

export default router;