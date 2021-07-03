import { Router } from "express";
import SkillRoute from "./skill-routes";
import StatusRouter from "./status-routes";
import UploadRouter from "./upload-routes";

const routes: Router[] = [];

routes.push(UploadRouter);
routes.push(StatusRouter);
routes.push(SkillRoute);

export default routes;