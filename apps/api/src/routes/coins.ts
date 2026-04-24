import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { submitCoin, getMyCoins } from '../controllers/coins';

const router = Router();

// All coin routes require authentication
router.use(authenticateJWT);

router.post('/', submitCoin);
router.get('/my-collection', getMyCoins);

export default router;
