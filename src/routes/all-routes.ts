import { Router } from "express";
import MonsterRouter from "./monster-routes";
import SkillRoute from "./skill-routes";
import StatusRouter from "./status-routes";
import UploadRouter from "./upload-routes";

const routes: Router[] = [];

routes.push(UploadRouter);
routes.push(StatusRouter);
routes.push(SkillRoute);
routes.push(MonsterRouter);

export default routes;