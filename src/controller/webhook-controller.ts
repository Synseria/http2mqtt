import { Request,Response,Router } from 'express';
import passport from 'passport';
import { mqttService } from '..';

/** Déclaration du router */
export const webhookRouter = Router();

/**
 * Récepteur des webhooks
 */
webhookRouter.post('/:application/:path*?',passport.authenticate('basic',{ session: false }),(req: Request,res: Response) => {
    const application = req.params.application;
    const genericPath = req.params.path?.replace(/\/$/gm,'') || '';
    const body = JSON.stringify(req.body);

    //Publication du message
    mqttService.publishMessage(`${application}/${genericPath}`,body).then(() => {
        //Succès
        res.status(200).send('OK');
    }).catch((error) => {
        //Erreur
        res.status(500).send('Erreur lors de la publication du message MQTT');
    });
});
