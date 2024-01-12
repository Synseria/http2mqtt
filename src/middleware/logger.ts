import { Express,NextFunction,Request,Response } from 'express';

/**
 * Initialisation du logger
 */
export function initLogger(app: Express) {
    //Déclaration du logger
    app.use(logger);
}

/**
 * Logger
 */
function logger(req: Request,res: Response,next: NextFunction) {
    const clientIp = req.get('X-Real-IP') || req.ip || req.connection.remoteAddress;
    const method = req.method;
    const url = `${req.protocol}://${req.get('host')}${req.url}`;

    //Log
    console.log(`[HTTP] ${clientIp} => ${method} ${url}`);

    //Poursuite du traitement
    next();
}

