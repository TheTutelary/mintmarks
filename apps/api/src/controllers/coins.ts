import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { CoinSubmissionSchema } from '@mintmarks/shared';
import { AuthRequest } from '../middleware/auth';

export const submitCoin = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = CoinSubmissionSchema.parse(req.body);
    const userId = req.user!.userId;

    const coin = await prisma.coin.create({
      data: {
        title: validatedData.title,
        description: validatedData.description || null,
        metal: validatedData.metal,
        imageUrl: validatedData.imageUrl || null,
        status: 'SUBMITTED',
        ownerId: userId,
      },
    });

    res.status(201).json({
      message: 'Coin submitted for evaluation',
      coin: { id: coin.id, title: coin.title, status: coin.status },
    });
  } catch (error: any) {
    console.error('Coin Submission Error:', error);
    res.status(400).json({ error: error.errors || error.message || 'Submission failed' });
  }
};

export const getMyCoins = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const coins = await prisma.coin.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ coins });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve collection' });
  }
};
