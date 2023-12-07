import express from 'express';
import HttpStateCodes from '../../utils/http-state-codes';
import NoSQLWrapper from '../../data/interfaces/data-sources/no-sql-wrapper';
import { verificarToken } from '../../utils/verificar-token';
const YearRouter = (db: NoSQLWrapper) => {
    // routing
    const router = express.Router();
    router.get('/years', verificarToken, async(request, response) => {
        const resultDbList = await db.FindAllYearsDisponibles();
        response.status(HttpStateCodes.OK).json({response: resultDbList});
    });

    return router;
}
export default YearRouter;