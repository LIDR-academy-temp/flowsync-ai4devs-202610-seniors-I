---
name: priority-ticket
description: Take the highest-priority Jira ticket assigned to me in the "To Do" column of the FLOW project, read it and the related code, plan its implementation in plan mode, and move the ticket to "In Progress" once the plan is approved.
disable-model-invocation: true
---

# /priority-ticket

Turns the top FLOW ticket into an approved implementation plan.

## Jira context

- MCP server: `atlassian-aturchenko` (project-scoped, `.mcp.json`). Use only its tools (`mcp__atlassian-aturchenko__*`), never the `claude_ai_Atlassian` connector, which points at a different site.
- `cloudId`: `aturchenko.atlassian.net`
- Project: `FLOW` — board https://aturchenko.atlassian.net/jira/software/projects/FLOW/boards/1

If a call fails with "isn't explicitly granted by the user", stop and tell the user to re-authenticate `atlassian-aturchenko` in `/mcp` and grant access to the `aturchenko` site.

## Steps

### 1. Find the ticket

Search with `searchJiraIssuesUsingJql`:

```
project = FLOW AND assignee = currentUser() AND statusCategory = "To Do" ORDER BY priority DESC, rank ASC
```

Take the first result: highest priority, ties broken by board order. If there are no results, say so and stop. Don't fall back to unassigned tickets or other columns.

### 2. Read the ticket

Fetch it with `getJiraIssue` (`responseContentFormat: "markdown"`, include comments). Show the user:

- key, summary, priority and link (`https://aturchenko.atlassian.net/browse/<KEY>`)
- a short summary of the description
- the acceptance criteria as a numbered list, as written

### 3. Read the related code

Start from `CLAUDE.md`, then read the code the ticket touches: for each acceptance criterion, find the routes, controllers, validators, transformers and existing frontend files involved. The ticket is written in product language and may not state everything the code requires (required fields, validation limits, response envelope, auth header, error shapes). Find those in the code, not by guessing, and write down every gap between the ticket and the code.

Also look at the conventions the plan must follow: folder layout, naming, imports, TS/lint config, and how existing docs are written.

### 4. Plan in plan mode

Enter plan mode (`EnterPlanMode`) and write the plan in the same language as the ticket. It contains:

1. **Ticket** — key, title, link.
2. **Acceptance criteria → solution** — each criterion and how the plan meets it.
3. **Contract found in the code** — what the ticket doesn't say but the code requires, with `file:line` references.
4. **Files** — each file to create or modify, with a one-line reason; the count.
5. **Steps** — in implementation order, including any dependencies or setup (e.g. UI library init).
6. **Verification** — the project's own commands (lint, build/typecheck, tests) plus a manual check per acceptance criterion.
7. **Open questions / risks** — only real ones.

Follow the project's code style and existing patterns, plus the process rules in `CLAUDE.md`. Don't add scope the ticket doesn't ask for.

Submit it with `ExitPlanMode` for approval.

### 5. On approval, move the ticket

Only after the user approves the plan:

1. `getTransitionsForJiraIssue` on the ticket.
2. Pick the transition whose target status is in the "In Progress" category (named "In Progress" or "En curso"). If none exists, list the available transitions and ask.
3. `transitionJiraIssue` with that transition id.
4. Confirm: `<KEY> → <new status>`.

If the plan is rejected, don't move the ticket; revise the plan with the user's feedback and submit it again.

Then stop and wait for the user to say to start implementing.
