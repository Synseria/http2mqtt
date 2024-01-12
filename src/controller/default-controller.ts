import { Request,Response,Router } from "express";

/** Déclaration du router */
export const defaultRouter = Router();

/**
* Vérification de l'état de santé de l'application
*/
defaultRouter.get('/health',(req: Request,res: Response) => {
    //Retour du résultat
    res.status(200).send('OK');
});