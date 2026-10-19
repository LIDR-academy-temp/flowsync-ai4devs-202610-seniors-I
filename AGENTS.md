# Agents

Custom agents available in this repository (`.github/agents/*.agent.md`), with what each one
does and when to use it. Keep this file in sync whenever an agent is added, renamed, or
removed.

## Adversarial Reviewer

File: [.github/agents/adversarial-reviewer.agent.md](.github/agents/adversarial-reviewer.agent.md)

**What it does:** Reviews a pull request adversarially — it actively tries to break the change
(edge cases, malformed input, race conditions, auth/permission bypasses, error-handling gaps)
instead of just reading the diff and nodding along. It runs the test suite and small throwaway
probe scripts to verify claims rather than speculate, and ranks findings by severity
(🔴 Critical / 🟠 High / 🟡 Medium / ⚪ Low) with a verified-vs-suspected breakdown.

**What it does not do:** It is strictly read-only — no `edit` tool and no write-capable GitHub
tools, so it cannot modify files, push commits, or leave GitHub review comments. It only
reports findings back in chat.

**When to use it:**
- "Review this PR", "try to break this", "stress-test this change".
- Automatically, as the required last step of the [code change workflow](.github/copilot-instructions.md#code-change-workflow)
  after a pull request is opened.
