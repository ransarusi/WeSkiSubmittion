import { Router } from "express";
import resorts from '../../assets/resorts.json';

const resortsRouter = Router();

resortsRouter.get("/", (req, res) => {
	res.send(resorts);
});

export { resortsRouter };