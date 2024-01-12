import { Express } from "express";
import { webhookRouter } from "./controller/webhook-controller";
import { defaultRouter } from "./controller/default-controller";

/**
 * Initialisation du routeur
 */
export function initRouter(app: Express) {
    //Définition des routes
    app.use('',defaultRouter);
    app.use('/webhook',webhookRouter,);
}