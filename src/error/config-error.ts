/**
 * Erreur générique pour une configuration manquante
 */
export class MissingConfigError extends Error {
    /**
     * Constructeur
     */
    constructor(configName: string,message: string = `La configuration '${configName}' est manquante.`) {
        //Héritage
        super(message);

        //Définition
        this.name = 'MissingConfigError';
    }
}

//Utilisation de la classe générique
export class MissingMqttUrlError extends MissingConfigError {
    /**
     * Constructeur
     */
    constructor() {
        //Héritage
        super('MQTT_URL',`[MQTT] Erreur de configuration : L'URL du broker MQTT n'est pas renseignée. Veuillez définir la variable d'environnement MQTT_URL.`);
    }
}

export class MissingMqttUsernameError extends MissingConfigError {
    /**
     * Constructeur
     */
    constructor() {
        //Héritage
        super('MQTT_USERNAME',`[MQTT] Erreur de configuration : L'identifiant du broker MQTT n'est pas renseigné. Veuillez définir la variable d'environnement MQTT_USERNAME.`);
    }
}

export class MissingMqttPasswordError extends MissingConfigError {
    /**
     * Constructeur
     */
    constructor() {
        //Héritage
        super('MQTT_PASSWORD',`[MQTT] Erreur de configuration : Le mot de passe du broker MQTT n'est pas renseigné. Veuillez définir la variable d'environnement MQTT_PASSWORD.`);
    }
}
