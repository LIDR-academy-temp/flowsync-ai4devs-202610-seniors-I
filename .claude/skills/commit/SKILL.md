---
name: commit
description: Create a Conventional Commits formatted commit message for staged changes
---

# commit

Create a Conventional Commits formatted commit message for staged changes.

## What this skill does

When invoked with `/commit`, this skill will:

1. **Check for staged changes** using `git diff --staged`
2. **Analyze the changes** to determine the appropriate commit type and scope
3. **Generate a commit message** following Conventional Commits format
4. **Create the commit** with the generated message

## Important constraints

- **DO NOT run `git add`** if there are no staged changes - just inform the user
- **DO NOT push** to remote - only create the local commit
- Commit message first line must be **max 72 characters**
- Use **imperative mood** for the description (e.g., "add", "fix", "update", not "added", "fixed", "updated")

## Commit message format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Allowed types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring (no functional changes)
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates, tooling

### Allowed scopes

- `backend`: Changes in the `backend/` directory
- `frontend`: Changes in the `frontend/` directory
- If changes span both: use `backend,frontend` or pick the primary scope

### Examples

```
feat(frontend): add login form component
fix(backend): validate email format in signup
docs(frontend): update README with setup instructions
refactor(backend): extract auth logic to service
test(frontend): add unit tests for login form
chore(backend): update dependencies
```

## Step-by-step instructions

### Step 1: Check for staged changes

Run `git diff --staged` to see what changes are prepared:

```bash
git diff --staged --stat
git diff --staged
```

### Step 2: Validate staged changes exist

If the output is empty:
- Inform the user: "No staged changes found. Please stage your changes with `git add <files>` before using /commit."
- **STOP** - do not proceed further

### Step 3: Analyze the staged changes

Based on the diff output, determine:

1. **Scope**:
   - If all files are in `backend/`: scope is `backend`
   - If all files are in `frontend/`: scope is `frontend`
   - If files span both: use the primary scope or `backend,frontend`

2. **Type**:
   - New files or features: `feat`
   - Bug fixes: `fix`
   - Documentation (*.md, comments): `docs`
   - Code restructuring without behavior change: `refactor`
   - Test files (*.test.*, *.spec.*): `test`
   - Config, dependencies, tooling: `chore`

3. **Description**:
   - Short, imperative summary of what the change does
   - Start with lowercase
   - No period at the end
   - Max 72 characters for the full first line (including type and scope)

### Step 4: Generate commit message

Create a commit message in this format:

```
<type>(<scope>): <description>
```

Examples based on common scenarios:
- Added login component: `feat(frontend): add login form with validation`
- Fixed auth bug: `fix(backend): validate email before saving user`
- Updated docs: `docs(frontend): document component props`
- Refactored code: `refactor(backend): extract validator logic`

### Step 5: Create the commit

Use the Bash tool to create the commit with the generated message:

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>
EOF
)"
```

**IMPORTANT**: Use a HEREDOC to ensure proper formatting, especially if the message contains special characters.

### Step 6: Confirm success

After the commit is created:
1. Show the commit message that was used
2. Run `git log -1 --oneline` to confirm the commit was created
3. **DO NOT push** - remind the user they can push manually if needed

Output something like:
```
✓ Commit created successfully:
  <commit-hash> <type>(<scope>): <description>

The commit is ready. You can push it manually with: git push
```

## Example invocation

```
/commit
```

## Error handling

- **No staged changes**: Inform user to run `git add` first, do not add files automatically
- **Git errors**: Show the error message and suggest troubleshooting steps
- **Cannot determine scope**: Ask the user to clarify or default to the most changed directory
- **Message too long**: Truncate description to fit 72 character limit, show full description in commit body if needed

## Success criteria

The skill successfully completes when:
1. Staged changes are detected
2. A valid Conventional Commits message is generated
3. The commit is created locally
4. The user is informed of success (no push is performed)
