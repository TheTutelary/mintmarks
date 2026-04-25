import { Router } from 'express';
import { getPublicShowcase, getShowcaseItemById } from '../controllers/showcase.controller';

const router = Router();

// Public routes for the museum gallery
router.get('/', getPublicShowcase);
router.get('/:id', getShowcaseItemById);

export default router;
