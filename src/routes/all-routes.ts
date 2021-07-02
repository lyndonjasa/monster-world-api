import { Router } from "express";
import UploadRouter from "./upload-routes";

const routes: Router[] = [];

routes.push(UploadRouter);

export default routes;