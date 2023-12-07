import express from 'express';
import HttpStateCodes from '../../utils/http-state-codes';
import NoSQLWrapper from '../../data/interfaces/data-sources/no-sql-wrapper';
import { verificarToken } from '../../utils/verificar-token';
import RequestPostArticle from '../../domain/models/Request-post-article';
const VolumenRouter = (db: NoSQLWrapper) => {
    // routing
    const router = express.Router();

    router.get('/articulo',verificarToken, async(request, response) => {
        const resultDbList = await db.FindAllArticulo();
        response.status(HttpStateCodes.OK).json({response: resultDbList});
    });

    router.post('/articulo', verificarToken, async(request, response) => {
        const articulo:RequestPostArticle = request.body;
        const resultDb = await db.CreateArticulo(articulo);
        response.status(HttpStateCodes.OK).json({response: resultDb});
    })
    
    return router;
}
export default VolumenRouter;