import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

export const getPublicShowcase = async (req: Request, res: Response) => {
  try {
    const items = await prisma.showcaseItem.findMany({
      where: { publishedAt: { lte: new Date() } },
      orderBy: [
        { featured: 'desc' },
        { sortOrder: 'asc' }
      ],
      include: {
        coin: {
          include: {
            photos: true,
            evaluations: {
              where: { status: 'SUBMITTED' } // Only show submitted/approved evals
            }
          }
        }
      }
    });

    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch showcase' });
  }
};

export const getShowcaseItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.showcaseItem.findUnique({
      where: { id },
      include: {
        coin: {
          include: {
            photos: true,
            evaluations: true
          }
        }
      }
    });

    if (!item) return res.status(404).json({ error: 'Showcase item not found' });
    res.json(item);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch showcase item' });
  }
};

// Admin Endpoints
export const addToShowcase = async (req: AuthRequest, res: Response) => {
  try {
    const { coinId, title, story, displayMode, featured } = req.body;

    const existing = await prisma.showcaseItem.findUnique({ where: { coinId } });
    if (existing) return res.status(400).json({ error: 'Coin already in showcase' });

    const item = await prisma.showcaseItem.create({
      data: {
        coinId,
        title,
        story,
        displayMode: displayMode || 'FULL',
        featured: featured || false,
      }
    });

    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to add to showcase' });
  }
};

export const updateShowcaseItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.showcaseItem.update({
      where: { id },
      data: {
        title: data.title,
        story: data.story,
        displayMode: data.displayMode,
        featured: data.featured,
        sortOrder: data.sortOrder,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined
      }
    });

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update showcase item' });
  }
};

export const deleteFromShowcase = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.showcaseItem.delete({ where: { id } });
    res.json({ message: 'Removed from showcase' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to remove from showcase' });
  }
};
