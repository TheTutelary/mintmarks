import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { Role } from '@mintmarks/shared';

import authRoutes from './routes/auth';
import showcaseRoutes from './routes/showcase';
import coinRoutes from './routes/coins';
import mediaRoutes from './routes/media.routes';
import expertRoutes from './routes/expert.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/showcase', showcaseRoutes);
app.use('/api/coins', coinRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/expert', expertRoutes);
app.use('/api/admin', adminRoutes);


// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    security: 'shielded',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`[MintMarks API]: Running at http://localhost:${port}`);
  console.log(`[Security]: Helmet active. CORS enabled.`);
});
