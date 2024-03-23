import express from "express";

const publicRouter = express.Router();

import { createMember } from "../controllers/member";

publicRouter.post("/api/members", createMember);

export default publicRouter;
