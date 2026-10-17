---
name: commit
description: Commit the uncommitted changes as Conventional Commits (`tipo(scope): descripción`), split into several commits by feature or app when the changes cover unrelated things.
disable-model-invocation: true
---

# /commit

Commits every uncommitted change (staged, unstaged and untracked) as one or more Conventional Commits.

## Message format

```
tipo(scope): descripción
```

- **tipo**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **scope**: optional, lowercase. Use the area the change belongs to: `frontend`, `backend`, `harness` (anything under `.claude/`, `.mcp.json`, `CLAUDE.md`, `AGENTS.md`), or a narrower feature such as `auth`. Leave it out only if the commit spans the whole repo.
- **descripción**: in Spanish, like the existing history (`git log`), lowercase, imperative or descriptive, no trailing period, ≤72 characters for the whole first line.
- A body is optional. Add one only when the _why_ isn't obvious from the diff; separate it with a blank line.
- Breaking changes: `tipo(scope)!:` plus a `BREAKING CHANGE:` footer.
- Never add `Co-Authored-By` or any Claude attribution line.

## Steps

1. Inspect: `git status --porcelain`, `git diff`, `git diff --cached`, and read untracked files. Check `git log --oneline -10` to match the repo's wording.
2. If there is nothing to commit, say so and stop.
3. Leave out anything that shouldn't be committed (`.env`, secrets, build output, `node_modules`, local DB files, editor files). If you find one, list it and don't stage it. Don't edit `.gitignore` unless asked.
4. Group the changes:
   - One coherent change → one commit.
   - Unrelated changes → one commit per group. Group by feature first, then by app (`frontend/` vs `backend/`), then by kind (code vs docs vs harness/config). A feature that needs edits in both apps and its own docs stays in **one** commit.
   - Don't split just to make more commits: a few related files belong together.
   - Every commit should build on its own: a dependency/lockfile change goes with the code that needs it.
5. When there is more than one commit, show the plan first (each message and its files) and then carry it out.
6. For each group: `git add -- <files>` (never `git add -A` or `.` when splitting), then `git commit -m "<message>"`. To commit only part of a file, stage the specific hunks with `git apply --cached` on a patch; `git add -p` is interactive and doesn't work here.
7. If a pre-commit hook fails, fix the cause and create a new commit. Never use `--no-verify` and never `--amend` a commit you didn't just create in this run.
8. Finish with `git log --oneline -<n>` for the new commits and `git status --short` to show nothing is left (or what was left out on purpose and why).

Don't push.
