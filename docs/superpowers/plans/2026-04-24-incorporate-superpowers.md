# Superpowers Incorporation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a high-discipline development environment using the Superpowers workflow.

**Architecture:** Initialize a Git repository and set up root-level instructions (`GEMINI.md`) that point to the Superpowers skills stored in `.agent/skills/superpowers/`.

**Tech Stack:** Git, Markdown

---

### Task 1: Git Foundations

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Initialize Git repository**
Run: `git init`
Expected: "Initialized empty Git repository"

- [ ] **Step 2: Create .gitignore**
```text
.DS_Store
node_modules/
dist/
build/
.env
*.log
```
Run: `cat > .gitignore <<EOF
.DS_Store
node_modules/
dist/
build/
.env
*.log
EOF`

- [ ] **Step 3: Initial Commit**
Run: `git add . && git commit -m "chore: initial commit with superpowers workspace setup"`
Expected: Commit successful.

---

### Task 2: Instructional Layer

**Files:**
- Create: `GEMINI.md`

- [ ] **Step 1: Create root GEMINI.md**
Content will import the Superpowers GEMINI configuration and set project-specific rules.

```markdown
# Project Instructions

@.agent/skills/superpowers/GEMINI.md

## Core Directives
- ALWAYS strictly follow the Superpowers skills in \`.agent/skills/superpowers/\`.
- Use TDD (Test-Driven Development) for all code changes.
- Never skip Brainstorming for new features.
- Design files go to \`docs/superpowers/specs/\`.
- Planning files go to \`docs/superpowers/plans/\`.

## Current Focus
- Incorporating Superpowers workflow.
- Ready to use \`design-prompt-master\` once setup is complete.
```

- [ ] **Step 2: Verify GEMINI.md exists**
Run: `ls -la GEMINI.md`

---

### Task 3: Structure Verification

**Files:**
- Create: `docs/superpowers/specs/.gitkeep`
- Create: `docs/superpowers/plans/.gitkeep`

- [ ] **Step 1: Create directory structure**
Run: `mkdir -p docs/superpowers/specs docs/superpowers/plans`

- [ ] **Step 2: Add .gitkeep to ensure directories are tracked**
Run: `touch docs/superpowers/specs/.gitkeep docs/superpowers/plans/.gitkeep`

- [ ] **Step 3: Final Commit**
Run: `git add . && git commit -m "feat: complete superpowers incorporation infrastructure"`
