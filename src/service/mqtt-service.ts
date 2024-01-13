import mqtt,{ MqttClient } from 'mqtt';
import { MissingMqttPasswordError,MissingMqttUrlError,MissingMqttUsernameError } from '../error/config-error';

/**
 * Service MQTT
 */
export class MQTTService {
    /** Données */
    private client: MqttClient;
    private mqttTopicPrefix: string = '';

    /**
     * Constructeur
     */
    constructor(mqttURL: string | undefined = process.env.MQTT_URL,mqttUsername: string | undefined = process.env.MQTT_USERNAME,mqttPassword: string | undefined = process.env.MQTT_PASSWORD,mqttTopicPrefix: string | undefined = process.env.MQTT_TOPIC_PREFIX) {
        //Vérification de la présence de l'url mqtt
        if (!mqttURL)
            //Déclenchement d'une erreur
            throw new MissingMqttUrlError();

        //Vérification de la présence du username/password
        if (!mqttUsername && !mqttPassword)
            //Message d'avertissement
            console.warn(`[MQTT] Avertissement : Tentative d'authentification anonyme au serveur MQTT: ${mqttURL}. Veuillez fournir des identifiants valides pour une connexion sécurisée. Utilisez les variables d'environnement MQTT_USERNAME et MQTT_PASSWORD pour définir votre identifiant et mot de passe.`);
        else if (!mqttUsername)
            //Déclenchement d'une erreur
            throw new MissingMqttUsernameError();
        else if (!mqttPassword)
            //Déclenchement d'une erreur
            throw new MissingMqttPasswordError();
        else
            //log
            console.log(`[MQTT] Succès : Authentification réussie au serveur MQTT: ${mqttURL}.`);

        //Vérification de la présence du topic
        if (mqttTopicPrefix)
            //Définition du préfix
            this.mqttTopicPrefix = `${mqttTopicPrefix.replace(/\/$/gm,'')}/`;

        //Connection au broker
        this.client = mqtt.connect(mqttURL);

        //Gestion de l'événement de connexion
        this.client.on('connect',() => {
            //Log
            console.log('[MQTT] Connexion réussie au serveur MQTT');
        });

        //Gestion de l'événement de déconnexion
        this.client.on('close',() => {
            //Log
            console.log('[MQTT] Déconnexion du serveur MQTT');
        });

        //Gestion de l'événement d'erreur
        this.client.on('error',(err) => {
            //Log
            console.error('[MQTT] Erreur lors de la communication avec le serveur MQTT :',err);
        });
    }

    /**
     * Publication d'un message
     */
    publishMessage(path: string,message: string): Promise<void> {
        const topic = `${this.mqttTopicPrefix}${path}`.replace(/\/$/gm,'');

        //Création d'une promesse
        return new Promise((resolve,reject) => {
            //Vérification de la connexion MQTT
            if (!this.client.connected)
                //Réouverture de la connexion MQTT
                this.client.reconnect();

            //Publication du message sur le topic
            this.client.publish(`${this.mqttTopicPrefix}${topic}`,message,(err) => {
                //Vérification de la présence d'erreur
                if (err) {
                    //Log
                    console.log(`[MQTT] Erreur lors de la publication du message sur le topic ${topic} => ${message}`,err);

                    //Rejet de la promesse
                    reject(err);
                } else {
                    //Log
                    console.log(`[MQTT] Message publié avec succès sur le topic ${topic} => ${message}`);

                    //Résolution de la promesse
                    resolve();
                }
            });
        });
    }

    /**
     * Fermeture de la connexion MQTT
     */
    endConnection() {
        //Log
        console.log('[MQTT] Fermeture de la connexion MQTT');

        //Fermer la connexion MQTT
        this.client.end();
    }
}