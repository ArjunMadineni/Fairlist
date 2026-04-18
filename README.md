# TaskFlow

A production-ready to-do list app built with Next.js 14, Supabase, and TanStack Query.

---

## Tech Stack

| Layer       | Technology                                          |
|-------------|-----------------------------------------------------|
| Frontend    | Next.js 14 (App Router), TypeScript, Tailwind CSS   |
| State       | TanStack Query v5                                   |
| Drag & Drop | @dnd-kit                                            |
| Backend     | Next.js API Route Handlers (serverless)             |
| Database    | Supabase (PostgreSQL + RLS)                         |
| Auth        | Supabase Auth                                       |
| Validation  | Zod                                                 |
| Deployment  | Vercel + Supabase Cloud                             |

---

## Quick Start

### 1. Create a Supabase project
Go to https://supabase.com → New project.
Copy your Project URL and anon key from Settings → API.

### 2. Run the database migration
In Supabase dashboard → SQL Editor, paste and run:
  supabase/migrations/001_initial.sql

This creates all tables, RLS policies, indexes, and auto-seeds default
categories (Personal, Work, Self-improvement, Social) for every new user.

### 3. Configure environment variables
  cp .env.local.example .env.local

Fill in .env.local:
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

### 4. Install and run
  npm install
  npm run dev

Open http://localhost:3000 — redirects to /login automatically.

---

## Features
- Auth: Signup, login, forgot password
- Tasks: Create / edit / delete with title, description, priority, status, due date, category
- Dashboard: Stats summary (total / pending / completed / high-priority) + recent tasks
- Drag & Drop: Reorder tasks, persisted to DB
- Filters: Search + filter by status / priority / category
- Row Level Security: Every user sees only their own data, enforced at DB level
- Responsive: Works on mobile

---

## Deploy to Vercel
  npx vercel

Set in Vercel dashboard:
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY

Done. Zero server management.

---

## Extending Later
- Email reminders   → Vercel cron + Resend API, check due_date daily
- Task sharing      → task_shares table already in migration
- Mobile app        → Expo + React Native, reuse all hooks and types
- Real-time updates → Supabase supabase.channel() subscriptions
