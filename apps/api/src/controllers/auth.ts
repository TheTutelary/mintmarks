import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { RegisterSchema, LoginSchema } from '@mintmarks/shared';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only';

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = RegisterSchema.parse(req.body);
    
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword,
        role: validatedData.role,
      }
    });

    // Create Token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      message: 'User created successfully', 
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error: any) {
    console.error('Registration Error:', error);
    res.status(400).json({ error: error.errors || error.message || 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = LoginSchema.parse(req.body);
    
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ 
      message: 'Login successful', 
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message || 'Login failed' });
  }
};
