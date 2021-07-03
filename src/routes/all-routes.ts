import { Router } from "express";
import StatusRouter from "./status-routes";
import UploadRouter from "./upload-routes";

const routes: Router[] = [];

routes.push(UploadRouter);
routes.push(StatusRouter);

export default routes;