#!/usr/bin/env bash
# PreToolUse guard for read-only subagents (e.g. adversarial-reviewer).
# Blocks Bash commands that modify the repo, the PR or GitHub state.
# Exit 2 = block the call and show stderr to the agent.

cmd=$(jq -r '.tool_input.command // empty')

block() {
  echo "Blocked by readonly-bash-guard: $1. This agent is read-only: it must not edit files, change git state, or act on the PR." >&2
  exit 2
}

# PR / GitHub write actions (approving, commenting, merging, editing...)
if grep -Eq '\bgh\s+pr\s+(review|merge|comment|edit|close|reopen|ready|lock|unlock)\b' <<<"$cmd"; then
  block "gh pr write action"
fi
if grep -Eq '\bgh\s+api\b' <<<"$cmd" && grep -Eq '(-X|--method)\s*(POST|PUT|PATCH|DELETE)|\s-f\s|\s-F\s|--field|--raw-field|--input' <<<"$cmd"; then
  block "gh api write request"
fi

# Git commands that change the working tree, index, refs or remotes.
# (git worktree add/remove is allowed: it is how the agent runs the PR code in isolation.)
if grep -Eq '\bgit\s+(commit|push|merge|rebase|reset|checkout|switch|restore|stash|add|rm|mv|clean|cherry-pick|revert|tag|am|apply|pull)\b' <<<"$cmd"; then
  block "git write command"
fi
if grep -Eq '\bgit\s+branch\s+.*-[dDmMcC]\b' <<<"$cmd"; then
  block "git branch modification"
fi

# File modifications.
if grep -Eq '(^|[;&|]\s*|\s)(rm|mv|cp|touch|mkdir|chmod|chown|truncate|tee|patch)\s' <<<"$cmd"; then
  block "file-modifying command"
fi
if grep -Eq '\bsed\s+(-[a-zA-Z]*i|--in-place)|\bperl\s+-[a-zA-Z]*i' <<<"$cmd"; then
  block "in-place edit"
fi
if sed -E 's#[0-9]*>&[0-9]+##g; s#[0-9]*>[[:space:]]*/dev/null##g; s#=>|->##g' <<<"$cmd" | grep -q '>'; then
  block "output redirection to a file"
fi

exit 0
