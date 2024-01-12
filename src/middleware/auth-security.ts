import { randomUUID } from 'crypto';
import { Express } from 'express';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';

/**
 * Initialisation de passport
 */
export function initPassport(app: Express): void {
  let httpUsername = process.env.HTTP_USERNAME;
  let httpPassword = process.env.HTTP_PASSWORD;

  //Vérification de la présence du user
  if (!httpUsername) {
    //Définition du user
    httpUsername = 'admin';

    //Message de warning : Utiliser la variable d'environnement HTTP_USERNAME
    console.warn(`[HTTP] Avertissement : La variable d'environnement HTTP_USERNAME n\'est pas définie. Utilisation de la valeur par défaut "admin"`);

    //Affichage de l'utilisateur
    console.log(`[HTTP] Utilisateur :${httpUsername}`);
  }

  //Vérification de la présence du mot de passe
  if (!httpPassword) {
    //Définition du mot de passe
    httpPassword = randomUUID();

    //Message de warning : Utiliser la variable d'environnement HTTP_PASSWORD
    console.warn(`[HTTP] Avertissement : La variable d'environnement HTTP_PASSWORD n\'est pas définie. Utilisation d\'un mot de passe généré aléatoirement`);

    //Affichage du mot de passe
    console.log(`[HTTP] Mot de passe :${httpPassword}`);
  }

  //Initialisation du middleware Passport.js
  app.use(passport.initialize());

  //Configuration de la stratégie d'authentification basique (HTTP Basic)
  passport.use(new BasicStrategy((username,password,done) => {
    //Vérification du mot de passe
    if (username === httpUsername && password === httpPassword) {
      //Utilisateur autorisé
      return done(null,{ logged: true });
    } else {
      //Utilisateur refusé
      return done(null,false);
    }
  }));

  //Log
  console.log('[HTTP] Passport initialisé avec succès');
};
