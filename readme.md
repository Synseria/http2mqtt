# HTTP2MQTT

HTTP2MQTT est une application qui offre un endpoint pour recevoir des webhooks et les publier dans un topic MQTT. Elle facilite l'intégration de différents services avec MQTT.

## Configuration

1. **Clonez le dépôt :**
    ```bash
    git clone https://github.com/synseria/http2mqtt.git
    ```
2. **Accédez au répertoire :**
    ```bash
    cd http2mqtt
    ```
3. **Installez les dépendances :**
    ```bash
    npm install
    ```
4. **Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement suivantes :**
    ```env
    PORT=3000
    HTTP_USERNAME=nom_utilisateur
    HTTP_PASSWORD=mot_de_passe
    MQTT_URL=mqtt_broker_url
    MQTT_USERNAME=mqtt_username
    MQTT_PASSWORD=mqtt_password
    MQTT_TOPIC_PREFIX=http2mqtt
    ```

## Lancement de l'Application

```bash
npm start
```

L'application sera disponible à l'adresse : http://localhost:3000

## Routes
 ### Webhooks

    POST /webhook/:application/:path*?

- **Description** : Endpoint pour recevoir des webhooks.
- **Paramètres**:
    - ***:application*** (obligatoire) : Nom de l'application.
    - ***:path*?*** (facultatif) : Chemin générique (peut être vide).
- **Corps de la requête :** Le corps de la requête contient le message MQTT à publier.

Exemple d'utilisation avec cURL :
```bash
curl -X POST -H "Content-Type: application/json" -d '{"message": "Le film \'Conjuring, les dossiers Warren\' a commencé."}' http://localhost:3000/webhook/plex/movies
``````

### Authentification
L'application utilise l'authentification HTTP Basic. Assurez-vous de définir les variables d'environnement HTTP_USERNAME et HTTP_PASSWORD.

### MQTT
L'application utilise MQTT pour publier des messages sur des topics spécifiques.

- **Topics** : Les messages sont publiés sur des topics construits à partir de **MQTT_TOPIC_PREFIX**, **:application** et **:path**.

        http2mqtt/plex/movies

## Health Check
Endpoint de health check : http://localhost:3000/health

## Développement
Pour le développement, vous pouvez utiliser la commande suivante pour exécuter l'application avec un rechargement automatique lors des modifications du code :

```bash
npm run dev
```

## Licence

Ce projet est sous licence [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) - voir le fichier [LICENSE](LICENSE) pour plus de détails.
