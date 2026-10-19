---
name: commit
description: 'Prepare a git commit for the current working tree changes: review the diff, decide what to stage, draft a Conventional Commits-style message (type(scope): summary + body) that reflects what actually changed, get approval, and create the commit. Use when the user asks to commit, prepare a commit, write a commit message, or invokes /commit.'
argument-hint: '(optional) scope or message hint, e.g. "backend" or "fix the auth validator bug"'
---

# Commit

Turns the current uncommitted changes into a well-formed, reviewed git commit — it never
invents a message first and asks later; the message is derived from the actual diff.

## When to Use
- The user asks to commit changes, "prepare a commit", or write a commit message.
- The user invokes `/commit` directly, optionally with a scope/topic hint as argument.
- After a chunk of work is done and ready to be checkpointed.

## Procedure

1. **Inspect the repo state.**
   - `git status --porcelain` to see staged, modified, and untracked files.
   - `git diff` (unstaged) and `git diff --cached` (staged) to see actual content changes.
   - If there are no changes at all (nothing staged, nothing modified, nothing untracked),
     say so and stop — don't fabricate a commit.

2. **Decide what belongs in the commit.**
   - Group changes that form one coherent unit of work; if the working tree clearly contains
     unrelated changes (e.g. an unrelated feature plus a stray debug file), flag the split and
     ask the user whether to commit everything or only part of it.
   - Call out anything that looks like it shouldn't be committed: build artifacts, local env
     files, editor/session scratch files, stray zero-byte or oddly-named files, anything that
     matches patterns conspicuously absent from `.gitignore`. Ask before including these.
   - Default to staging all remaining, intentional changes (`git add -A` or targeted
     `git add <paths>`) once confirmed — don't silently leave relevant files unstaged.

3. **Classify the change.** From the diff content (not just file names), determine:
   - **Type**: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`, `build`, `perf`.
   - **Scope**: the affected area, inferred from path/conventions (e.g. `backend`, `frontend`,
     a specific module, or omitted if repo-wide).
   - Check `git log --oneline -15` once to match the repo's existing convention (this repo uses
     Conventional Commits, e.g. `fix(backend): ...`, `docs: ...`, subjects are commonly in
     Spanish — match the language and style already used in recent history).

4. **Draft the commit message.**
   - Header: `type(scope): short imperative summary` (≤ 72 chars, no trailing period).
   - Body (when the change isn't trivial): bullet points explaining *why*, not just *what* —
     mirror the detail level seen in `git log`/`git show` for recent commits in this repo.
   - Do not mention files that weren't actually changed, and do not pad the body with
     boilerplate — only describe what the diff shows.
   - Append the required trailer on its own line at the end:
     ```
     Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
     ```

5. **Present the plan and get approval.** Show: the list of files to be staged, the full
   drafted commit message, and anything excluded/flagged in step 2. Ask the user to approve,
   edit the message, or adjust the file list before committing.

6. **On approval, stage and commit.**
   - Stage the approved files.
   - Create the commit with the approved message (use `git commit -F -` or a heredoc so
     multi-line bodies and the trailer are preserved exactly — don't rely on multiple `-m`
     flags that could reformat spacing).

7. **Confirm the result.** Show `git log -1 --stat` (or equivalent) so the user can verify the
   commit was created as intended.

8. **Do not push.** Pushing to a remote is a separate, explicit step — stop once the local
   commit is created unless the user asks to push too.

## Notes
- Never commit secrets (`.env` values, API tokens, credentials) — if a diff appears to contain
  one, stop and warn the user instead of committing it.
- If the user supplied an argument hint (scope or message intent), use it to steer the
  type/scope/summary, but still verify it matches what the diff actually contains.
