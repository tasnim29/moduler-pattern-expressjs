import { Router } from "express";

import { userControllers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = Router();

// routes--->controller--->service
// so here we handle the route part only
router.post("/", userControllers.createUser);

router.get("/",logger,auth("admin"), userControllers.getUser);

router.get("/:id", userControllers.getSingleUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;
