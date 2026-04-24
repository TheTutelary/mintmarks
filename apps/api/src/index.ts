import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { Role } from '@mintmarks/shared';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

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
