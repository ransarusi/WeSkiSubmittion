import { Router } from "express";
import { resortsRouter } from './resorts.api';
import { searchRouter } from "./search.api";

const mainRouter = Router();

mainRouter.use('/resorts', resortsRouter);
mainRouter.use('/search', searchRouter);

export { mainRouter };
