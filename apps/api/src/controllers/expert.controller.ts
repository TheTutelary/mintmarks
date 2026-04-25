import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

export const getAssignedCoins = async (req: AuthRequest, res: Response) => {
  try {
    const coins = await prisma.coin.findMany({
      where: { assignedExpertId: req.user?.userId },
      include: {
        photos: true,
        evaluations: {
          where: { expertId: req.user?.userId }
        },
      }
    });
    res.json(coins);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch assigned coins' });
  }
};

export const submitEvaluation = async (req: AuthRequest, res: Response) => {
  try {
    const { coinId } = req.params;
    const data = req.body; 

    const evaluation = await prisma.evaluation.upsert({
      where: { id: data.id || 'new-dummy-uuid-to-trigger-create' },
      update: {
        authenticity: data.authenticity,
        grade: data.grade,
        estimatedValueMin: data.estimatedValueMin,
        estimatedValueMax: data.estimatedValueMax,
        valueCurrency: data.valueCurrency,
        metal: data.metal,
        metalPurity: data.metalPurity,
        mint: data.mint,
        era: data.era,
        origin: data.origin,
        rarityScore: data.rarityScore,
        scarcityNote: data.scarcityNote,
        historicalStory: data.historicalStory,
        expertNotes: data.expertNotes,
        expertName: data.expertName,
        expertCredentials: data.expertCredentials,
        status: 'SUBMITTED'
      },
      create: {
        coinId,
        expertId: req.user?.userId!,
        authenticity: data.authenticity,
        grade: data.grade,
        estimatedValueMin: data.estimatedValueMin,
        estimatedValueMax: data.estimatedValueMax,
        valueCurrency: data.valueCurrency,
        metal: data.metal,
        metalPurity: data.metalPurity,
        mint: data.mint,
        era: data.era,
        origin: data.origin,
        rarityScore: data.rarityScore,
        scarcityNote: data.scarcityNote,
        historicalStory: data.historicalStory,
        expertNotes: data.expertNotes,
        expertName: data.expertName,
        expertCredentials: data.expertCredentials,
        status: 'SUBMITTED'
      }
    });
    
    // Update coin status to EVALUATED
    await prisma.coin.update({
      where: { id: coinId },
      data: { status: 'EVALUATED' }
    });

    res.json({ message: 'Evaluation submitted', evaluation });
  } catch (error: any) {
    console.error('Evaluation Error:', error);
    res.status(500).json({ error: 'Failed to submit evaluation' });
  }
};
