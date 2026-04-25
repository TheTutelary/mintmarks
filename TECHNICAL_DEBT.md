# 🏛️ MintMarks Technical Debt & Production Roadmap

This document tracks intentional shortcuts, architectural gaps, and critical requirements for the production-grade deployment of the MintMarks platform.

## 🔒 Security & Authentication
- [ ] **HTTPS Enforcement**: Production API must be served over HTTPS to prevent Mixed Content blocks on GitHub Pages.
- [ ] **Secure Storage**: Transition from `localStorage` to `HttpOnly` Cookies for JWT storage to mitigate XSS risks.
- [ ] **CORS Hardening**: Replace `app.use(cors())` with a strict whitelist of allowed domains (e.g., `sushilgulati.github.io`).
- [ ] **Password Policy**: Implement complexity requirements and account lockout logic.
- [ ] **Input Sanitization**: Add comprehensive server-side validation using Zod for all API endpoints.

## 🚀 Infrastructure & Deployment
- [ ] **API Hosting**: Transition from local dev server to a robust Node.js host (Render, Railway, or dedicated Windows Server with PM2).
- [ ] **Database Migration**: Move from local PostgreSQL to a managed instance (Supabase, Neon, or RDS).
- [ ] **CI/CD Pipeline**: Automate database migrations during the GitHub Actions workflow.
- [ ] **Environment Variables**: Centralize configuration using a robust `.env` strategy across all packages.

## 📦 Persistence & Data
- [ ] **S3 Integration**: Replace local disk storage in `apps/api/storage` with AWS S3 or Google Cloud Storage for coin photography.
- [ ] **Database Indexes**: Add indexes to `Coin` and `ShowcaseItem` tables for performance as the collection grows.
- [ ] **Soft Deletes**: Implement `deletedAt` logic for assets to prevent accidental data loss.

## 🎨 Frontend & UX
- [ ] **Static Generator Hacks**: Replace the `generateStaticParams` dummy IDs with a real `404.html` catch-all or a dynamic hosting provider.
- [ ] **Image Optimization**: Use Next.js `<Image />` component with a real image loader (Cloudinary/Imgix) instead of `unoptimized: true`.
- [ ] **Global State**: Transition auth state from `Header` polling to a more robust React Context or Zustand store.

## 🧪 Testing & Quality
- [ ] **Unit Tests**: Add tests for critical valuation logic and permission guarding.
- [ ] **E2E Tests**: Implement Playwright tests for the submission-to-shovcase lifecycle.
- [ ] **Error Boundaries**: Add React Error Boundaries to catch and report UI crashes.
