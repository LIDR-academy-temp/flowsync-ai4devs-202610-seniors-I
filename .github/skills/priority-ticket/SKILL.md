---
name: priority-ticket
description: 'Find my highest-priority "To Do" Jira ticket, translate it to English if needed, extract its acceptance criteria, draft an implementation plan, get it approved, and move the ticket to In Progress. Use when the user asks what to work on next, to pick up a ticket, or invokes /priority-ticket.'
argument-hint: '(optional) Jira project key to restrict the search, e.g. "FLOW"'
---

# Priority Ticket

Picks the most urgent ticket assigned to the user, turns it into an actionable plan, and marks
it as started — without writing any code.

## When to Use
- The user asks "what should I work on next?" / "pick up a ticket for me".
- The user invokes `/priority-ticket` directly.
- The user wants a Jira ticket's acceptance criteria turned into an implementation plan before
  any code is written.

## Prerequisites
- The `jira` MCP server (`mcp-atlassian`) must be connected. Its tools are prefixed `jira_*`
  (e.g. `jira_search`, `jira_get_issue`, `jira_get_transitions`, `jira_transition_issue`).
- If those tools aren't available, tell the user the Jira MCP server isn't connected in this
  session and stop — don't try to guess ticket data.

## Procedure

1. **Identify the current user.** Call `jira_get_user_profile` (or `jira_search` with
   `assignee = currentUser()`, which resolves it implicitly) to get the account used for
   "assigned to me" filtering.

2. **Find candidate tickets.** Call `jira_search` with JQL:
   ```
   assignee = currentUser() AND statusCategory = "To Do" ORDER BY priority DESC, created ASC
   ```
   - "To Do" means the status category, not a literal status name — projects may call it
     "Pendiente", "Backlog", "Open", etc. Rely on `statusCategory` to stay language-agnostic.
   - Request `priority`, `summary`, `description`, `status`, `issuetype`, and `labels` fields.

3. **Pick the highest priority ticket.** The JQL already sorts by priority, so take the first
   result. If several tickets share the top priority, prefer the oldest (`created ASC` already
   breaks the tie); if still ambiguous, ask the user to confirm which one to use.

4. **Translate if needed.** If the ticket's summary/description (or acceptance criteria) is in
   Spanish or any non-English language, translate it to English before presenting it. Keep the
   ticket key (e.g. `FLOW-123`) and any code/field names untranslated. Show the translated
   version; optionally note the original language once.

5. **Extract the acceptance criteria.** Look, in order, in:
   - A dedicated "Acceptance Criteria" custom field (check via `jira_get_issue` field list).
   - A section inside the description titled "Acceptance Criteria" / "Criterios de aceptación".
   - Checklists or bullet lists describing expected/given-when-then behavior.
   If no explicit acceptance criteria exist, derive a reasonable set from the description and
   flag that they were inferred, not quoted from the ticket.

6. **Draft an implementation plan.** Using the ticket summary, description, and acceptance
   criteria, produce a structured plan covering:
   - A one-line restatement of the goal.
   - The acceptance criteria (translated), each mapped to how it will be satisfied/verified.
   - Concrete implementation steps (files/areas likely touched, based on repo context if
     available).
   - Risks, open questions, or missing information worth flagging.
   - A validation step (tests/lint/manual check) per the repo's conventions.

7. **Get approval before changing anything in Jira.** Present the plan to the user and ask
   them to approve it (or request changes) before touching the ticket status.

8. **On approval, transition the ticket.** Call `jira_get_transitions` to find the transition
   id that leads to an "In Progress" style status, then call `jira_transition_issue` with that
   id. Confirm the new status back to the user.

9. **Stop there.** Show the final plan and the new ticket status. Do **not** start implementing
   the plan (no code changes) unless the user explicitly asks for that as a separate step.

## Output Format
Report, in this order: ticket key + translated title, priority, link, acceptance criteria list,
the implementation plan, and the transition result.
