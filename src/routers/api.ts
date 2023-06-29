import { Router, Request, Response } from 'express';
import link from '../controllers/link';
import match from '../controllers/match';

const router = Router();

router.get('/match', match);
router.put('/link', link);

export default router;
