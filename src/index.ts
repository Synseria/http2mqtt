import dotenv from "dotenv";
import express,{ Express } from "express";
import { initPassport } from "./middleware/auth-security";
import { initLogger } from "./middleware/logger";
import { initRouter } from "./router";
import { MQTTService } from "./service/mqtt-service";

//Chargement des variables d'environnement
dotenv.config();

//Initialisation d'express
const app: Express = express();

//Initialisation des middlewares
app.use(express.json());
initLogger(app);
initPassport(app);
initRouter(app);

//Définition des services
export const mqttService: MQTTService = new MQTTService();

//Définition du port d'écoute
const port = process.env.HTTP_PORT || 3000;

//Mise en écoute du serveur sur le port spécifié
app.listen(port,() => {
    //Log
    console.log(`[HTTP] Démarrage de l'application http2mqtt sur http://localhost:${port}`);
});

//Gestion de l'événement de fermeture de l'application
process.on('SIGINT',() => {
    //Fermeture de la connexion
    mqttService.endConnection();

    //Fermeture du processus
    process.exit();
});

//Gestion de l'événement d'erreur non capturée
process.on('uncaughtException',(err) => {
    //Log
    console.error('[SERVER] Erreur non capturée:',err);

    //Fermeture de la connexion
    mqttService.endConnection();

    //Fermeture du processus
    process.exit(1);
});
