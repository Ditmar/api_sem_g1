import express from 'express';
import HttpStateCodes from '../../utils/http-state-codes';
import NoSQLWrapper from '../../data/interfaces/data-sources/no-sql-wrapper';
import { verificarToken } from '../../utils/verificar-token';

const VolumenRouter = (db: NoSQLWrapper) => {
    // routing
    const router = express.Router();
    router.get('/volumenes/:year',verificarToken, async(request, response) => {
        const anio = request.params.year;
        const resultDbList = await db.FindAllVolumenesPorAnio(anio);
        response.status(HttpStateCodes.OK).json({response: resultDbList});
    });

    router.get('/volumenes', async(request, response) => {
        const {page, limit} = request.query;
        const resultDbList = await db.FindAllVolumenes(page,limit);
        response.status(HttpStateCodes.OK).json({response: resultDbList});
    });

    return router;
}
export default VolumenRouter;