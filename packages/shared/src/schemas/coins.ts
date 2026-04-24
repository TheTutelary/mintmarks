import { z } from 'zod';

export const METALS = ['Gold', 'Silver', 'Copper', 'Bronze', 'Nickel', 'Platinum', 'Other'] as const;

export const CoinSubmissionSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  metal: z.enum(METALS, { message: 'Please select a valid metal type' }),
  imageUrl: z.string().url('Please provide a valid image URL').optional(),
});

export type CoinSubmissionInput = z.infer<typeof CoinSubmissionSchema>;
