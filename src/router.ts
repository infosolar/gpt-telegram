import {Request, Response, Router} from "express";
import {Thread} from "./database/thread.model";
import {OpenAIApi} from "./open-api/ai-api";
import {Role, ThreadStatus} from "./open-api/types";

const router = Router()

router.post('/message', async (request: Request, response: Response) => {


})

export default router;