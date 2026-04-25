import { Router } from 'express';
import { StorageService } from '../lib/storage';
import { authenticateJWT, AuthRequest } from '../middleware/auth';

const router = Router();

// Endpoint to fetch private media. We use authenticateJWT to ensure request has valid token.
router.get('/:fileName', authenticateJWT, async (req: AuthRequest, res) => {
  const { fileName } = req.params;
  const fileBuffer = await StorageService.getFile(fileName);
  
  if (!fileBuffer) {
    return res.status(404).json({ error: 'File not found' });
  }

  const mimeType = StorageService.getMimeType(fileName);
  res.setHeader('Content-Type', mimeType);
  res.setHeader('Cache-Control', 'private, max-age=86400'); // Cache for 1 day
  res.send(fileBuffer);
});

export default router;
