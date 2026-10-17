---
name: commit
description: Creates a Conventional Commits 1.0.0 commit (`type(scope): description`) from the currently staged changes only. Analyzes the staged diff, picks the type and scope, writes the message following the repo's conventions, and verifies the result. Use when the user runs /commit or asks to commit staged changes, and as the commit step when closing a task.
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
---

# Commit

## Current state

- Staged files: !`git diff --cached --stat`
- Unstaged/untracked (NOT part of this commit): !`git status --short`
- Recent subjects (match their style): !`git log --format=%s -15`

## Hard rules

- **Commit only what is staged.** Never run `git add`, `git commit -a`, or pass paths to `git commit`. Unstaged and untracked files stay out of the commit.
- If nothing is staged, tell the user and **stop**. Do not stage anything on their behalf.
- Never use `--no-verify`, `--amend`, or `--no-gpg-sign`. If a hook fails, report the output and stop. Do not retry by bypassing it.
- One commit per invocation.

## Workflow

1. **Read the staged diff** with `git diff --cached`. Skip the body of lockfiles (`package-lock.json`) and generated files. Their names in the stat are enough.
2. **Check that it is a single logical change.** If the staged changes mix unrelated concerns (e.g. a feature plus an unrelated docs fix), propose how to split them into separate commits and ask before committing. The spec's guidance is to make multiple commits rather than force one type over several changes.
3. **Choose the type** (see the table below).
4. **Choose the scope.** Use a noun for the area of the codebase, derived from the paths:
   - `frontend/**` → `frontend`
   - `backend/**` → `backend`
   - `.claude/**`, `.mcp.json`, `CLAUDE.md`, `AGENTS.md` → `harness`
   - A narrower noun is fine when it is clearer (e.g. `auth`), but stay consistent with `git log`. If the change spans several areas evenly, omit the scope.
5. **Write the message** (see "Message format").
6. **Commit** with a heredoc so the formatting is preserved:

   ```bash
   git commit -F - <<'EOF'
   feat(frontend): añade pantalla de login

   Llama a POST /api/v1/auth/login y guarda el token recibido.
   EOF
   ```

7. **Verify** with `git log -1 --format=%B` and `git status --short`. Report the commit hash and subject. If the commit failed, show the error and do not claim success.

## Types

| Type | Use when the staged change… |
|---|---|
| `feat` | adds a new feature (spec: MUST) |
| `fix` | fixes a bug (spec: MUST) |
| `refactor` | restructures code without changing behavior |
| `perf` | improves performance |
| `test` | adds or fixes tests only |
| `docs` | changes documentation only |
| `style` | formatting only, no logic change |
| `build` | changes build system or dependencies |
| `ci` | changes CI configuration |
| `chore` | anything else that does not touch src or tests (tooling, config, harness) |

## Message format

```
<type>(<scope>)[!]: <description>

[optional body]

[optional footer(s)]
```

- **Description:** written in the language and style of recent `git log` subjects (in this repo: Spanish, lowercase, imperative or present tense, no trailing period). Keep it ≤ 72 characters and describe *what* changes.
- **Body:** optional. Add one when the *why* is not obvious from the description. It starts one blank line after the description and is free-form paragraphs.
- **Footers:** one blank line after the body, in `Token: value` or `Token #value` format, with `-` instead of spaces in the token (e.g. `Refs: FLOW-5`). Reference the Jira ticket when the work comes from one.
- **Breaking changes:** add `!` before the colon (`feat(backend)!: …`) and/or a `BREAKING CHANGE: <what breaks and how to migrate>` footer. `BREAKING CHANGE` is always uppercase.
- Keep any trailer lines (e.g. `Co-Authored-By:`) that session or user instructions require, as the last footers.

## Examples

```
feat(frontend): añade pantalla de registro con confirmación de contraseña
```

```
fix(frontend): muestra error claro cuando el email ya está registrado

El backend devuelve 422 con errors[].field = "email"; antes se mostraba
un error genérico.

Refs: FLOW-5
```

```
chore(harness): añade skill /commit para conventional commits
```

```
feat(backend)!: exige passwordConfirmation en signup

BREAKING CHANGE: los clientes deben enviar passwordConfirmation en
POST /api/v1/auth/signup.
```
