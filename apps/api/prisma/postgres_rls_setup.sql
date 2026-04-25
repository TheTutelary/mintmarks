-- apps/api/prisma/postgres_rls_setup.sql
-- This file contains the exact RLS (Row Level Security) policies required
-- to secure the MintMarks platform if migrated from SQLite to Postgres.
-- To execute, run this in your Postgres client after standard Prisma migrations.

-- Enable RLS on core tables
ALTER TABLE "Coin" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Evaluation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CoinPhoto" ENABLE ROW LEVEL SECURITY;

-- ==========================
-- COIN POLICIES
-- ==========================
-- Admin has full access to all coins
CREATE POLICY "Admins full access to coins" ON "Coin"
FOR ALL USING (current_setting('app.role', true) = 'ADMIN');

-- Collectors can only see and edit their own coins
CREATE POLICY "Collectors access own coins" ON "Coin"
FOR ALL USING (
    current_setting('app.user_id', true) = "ownerId" AND
    current_setting('app.role', true) IN ('COLLECTOR', 'EXPERT', 'ADMIN')
);

-- Experts can only see and update coins explicitly assigned to them
CREATE POLICY "Experts access assigned coins" ON "Coin"
FOR ALL USING (
    current_setting('app.user_id', true) = "assignedExpertId" AND
    current_setting('app.role', true) = 'EXPERT'
);

-- ==========================
-- EVALUATION POLICIES
-- ==========================
-- Admin has full access to evaluations
CREATE POLICY "Admins full access to evaluations" ON "Evaluation"
FOR ALL USING (current_setting('app.role', true) = 'ADMIN');

-- Experts can insert/update evaluations for their assigned coins
CREATE POLICY "Experts manage own evaluations" ON "Evaluation"
FOR ALL USING (
    current_setting('app.user_id', true) = "expertId" AND
    current_setting('app.role', true) = 'EXPERT'
);

-- Collectors can only read APPROVED evaluations for their own coins
CREATE POLICY "Collectors read approved evaluations" ON "Evaluation"
FOR SELECT USING (
    status = 'APPROVED' AND
    EXISTS (
        SELECT 1 FROM "Coin" c 
        WHERE c.id = "Evaluation"."coinId" 
        AND c."ownerId" = current_setting('app.user_id', true)
    )
);

-- ==========================
-- COINPHOTO POLICIES
-- ==========================
CREATE POLICY "Admins full access to photos" ON "CoinPhoto"
FOR ALL USING (current_setting('app.role', true) = 'ADMIN');

-- System allows reading and writing photos to authorized parents (Owner or Assigned Expert)
CREATE POLICY "Access photos of owned or assigned coins" ON "CoinPhoto"
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM "Coin" c 
        WHERE c.id = "CoinPhoto"."coinId" AND (
            c."ownerId" = current_setting('app.user_id', true) OR
            c."assignedExpertId" = current_setting('app.user_id', true)
        )
    )
);
