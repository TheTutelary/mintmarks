import { Router } from 'express';
import { getAllSubmissions, updateCoinStatus, assignExpertToCoin } from '../controllers/admin.controller';
import { authenticateJWT, requireRole } from '../middleware/auth';

const router = Router();

router.use(authenticateJWT, requireRole('ADMIN'));

router.get('/submissions', getAllSubmissions);
router.patch('/coins/:coinId/status', updateCoinStatus);
router.patch('/coins/:coinId/assign', assignExpertToCoin);

// Showcase Management
import { addToShowcase, updateShowcaseItem, deleteFromShowcase } from '../controllers/showcase.controller';
router.post('/showcase', addToShowcase);
router.patch('/showcase/:id', updateShowcaseItem);
router.delete('/showcase/:id', deleteFromShowcase);

export default router;
