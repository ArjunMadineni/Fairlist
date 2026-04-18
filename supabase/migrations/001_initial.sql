-- ============================================================
-- TaskFlow — Supabase SQL Migration
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------
-- CATEGORIES
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  color       TEXT NOT NULL DEFAULT '#7c6dfa',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own categories"
  ON categories FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- -----------------------------------------------
-- TASKS
-- -----------------------------------------------
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE task_status   AS ENUM ('pending', 'in_progress', 'completed');

CREATE TABLE IF NOT EXISTS tasks (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  title         TEXT NOT NULL,
  description   TEXT,
  priority      task_priority NOT NULL DEFAULT 'medium',
  status        task_status   NOT NULL DEFAULT 'pending',
  due_date      DATE,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own tasks"
  ON tasks FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- -----------------------------------------------
-- TASK SHARES (optional collaborative feature)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS task_shares (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id         UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  shared_with     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  permission      TEXT NOT NULL DEFAULT 'view' CHECK (permission IN ('view', 'edit')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(task_id, shared_with)
);

ALTER TABLE task_shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Task owners manage shares"
  ON task_shares FOR ALL
  USING (
    auth.uid() = (SELECT user_id FROM tasks WHERE id = task_id)
    OR auth.uid() = shared_with
  );

-- -----------------------------------------------
-- INDEXES
-- -----------------------------------------------
CREATE INDEX idx_tasks_user_id     ON tasks(user_id);
CREATE INDEX idx_tasks_status      ON tasks(status);
CREATE INDEX idx_tasks_priority    ON tasks(priority);
CREATE INDEX idx_tasks_due_date    ON tasks(due_date);
CREATE INDEX idx_tasks_sort_order  ON tasks(sort_order);
CREATE INDEX idx_categories_user   ON categories(user_id);

-- -----------------------------------------------
-- SEED default categories for new users (trigger)
-- -----------------------------------------------
CREATE OR REPLACE FUNCTION seed_default_categories()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO categories (user_id, name, color) VALUES
    (NEW.id, 'Personal',         '#7c6dfa'),
    (NEW.id, 'Work',             '#3b82f6'),
    (NEW.id, 'Self-improvement', '#10b981'),
    (NEW.id, 'Social',           '#f59e0b');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION seed_default_categories();
