import { Router } from 'express';
import { getAssignedCoins, submitEvaluation } from '../controllers/expert.controller';
import { authenticateJWT, requireRole } from '../middleware/auth';

const router = Router();

// Ensure the user is an EXPERT (or ADMIN via our updated middleware logic)
router.use(authenticateJWT, requireRole('EXPERT'));

router.get('/coins', getAssignedCoins);
router.post('/coins/:coinId/evaluations', submitEvaluation);

export default router;
