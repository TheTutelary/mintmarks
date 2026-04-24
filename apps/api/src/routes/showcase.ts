import { Router, Request, Response } from 'express';

const router = Router();

const mockShowcaseCoins = [
  {
    id: "uuid-coin-1",
    title: "1862 Victoria Rupee",
    metal: "Silver",
    grade: "MS-63",
    status: "COMPLETED",
    imageUrl: "https://images.unsplash.com/photo-1621508210350-f80e03a95aa6?q=80&w=1600&auto=format&fit=crop", 
    expert: "Dr. Anand Kumar",
    valuation: "₹45,000"
  },
  {
    id: "uuid-coin-2",
    title: "1911 King George V 'Pig' Rupee",
    metal: "Silver",
    grade: "XF-45",
    status: "COMPLETED",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1600&auto=format&fit=crop",
    expert: "Prof. S. Sharma",
    valuation: "₹65,000"
  },
  {
    id: "uuid-coin-3",
    title: "1600s Akbar Mohur",
    metal: "Gold",
    grade: "AU-55",
    status: "COMPLETED",
    imageUrl: "https://images.unsplash.com/photo-1601000676451-b0e2586a1a9e?q=80&w=1600&auto=format&fit=crop",
    expert: "Dr. Anand Kumar",
    valuation: "₹2,50,000"
  }
];

router.get('/', (req: Request, res: Response) => {
  res.json({ coins: mockShowcaseCoins });
});

export default router;
