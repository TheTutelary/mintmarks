import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

export const getAllSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const coins = await prisma.coin.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        assignedExpert: { select: { id: true, name: true } },
        photos: true
      }
    });

    // Get all available experts to populate the dropdown
    const experts = await prisma.user.findMany({
      where: { role: { in: ['EXPERT', 'ADMIN'] } },
      select: { id: true, name: true }
    });

    res.json({ coins, experts });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

export const updateCoinStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { coinId } = req.params;
    const { status } = req.body;

    const coin = await prisma.coin.update({
      where: { id: coinId },
      data: { status }
    });

    res.json(coin);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update coin status' });
  }
};

export const assignExpertToCoin = async (req: AuthRequest, res: Response) => {
  try {
    const { coinId } = req.params;
    const { expertId } = req.body;

    const coin = await prisma.coin.findUnique({ where: { id: coinId } });
    if (!coin) {
      return res.status(404).json({ error: 'Coin not found' });
    }

    let newStatus = coin.status;
    if (expertId && (coin.status === 'DRAFT' || coin.status === 'SUBMITTED')) {
      newStatus = 'ASSIGNED';
    }

    const updated = await prisma.coin.update({
      where: { id: coinId },
      data: {
        assignedExpertId: expertId || null,
        status: newStatus
      }
    });

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to assign expert' });
  }
};
