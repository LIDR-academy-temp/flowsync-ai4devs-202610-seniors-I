---
name: priority-ticket
description: Starts the next task from the FlowSync Jira board. Fetches the highest-priority ticket assigned to the current user in "To Do", summarizes its acceptance criteria, enters plan mode to propose an implementation, iterates until the user approves the plan, and only then moves the ticket to "In Progress". Use when the user runs /priority-ticket or asks to pick up their next Jira ticket.
disable-model-invocation: true
allowed-tools: mcp__atlassian__getAccessibleAtlassianResources, mcp__atlassian__searchJiraIssuesUsingJql, mcp__atlassian__getJiraIssue, mcp__atlassian__getTransitionsForJiraIssue
---

# Priority ticket

Jira configuration for this repo:

- Project key: `FLOW` (board "FlowSync")
- Source status: `To Do`. Target status after approval: `In Progress`

## Hard rules

- **Do not move the ticket before the user approves the plan.** `mcp__atlassian__transitionJiraIssue` is called once, after approval, and never earlier.
- **Do not leave plan mode until the user approves.** Only the user's approval of `ExitPlanMode` ends planning. If they reject it or ask for changes, stay in plan mode.
- Do not write or edit code anywhere in this workflow. It ends when the ticket is in "In Progress", and implementation starts only when the user asks for it.

## Workflow

Copy this checklist and track your progress:

```
Priority ticket progress:
- [ ] Step 1: Fetch the highest-priority ticket
- [ ] Step 2: Summarize acceptance criteria
- [ ] Step 3: Enter plan mode
- [ ] Step 4: Explore the codebase and draft the plan
- [ ] Step 5: Get plan approval (loop until approved)
- [ ] Step 6: Move the ticket to In Progress and verify
```

### Step 1: Fetch the highest-priority ticket

1. Get the `cloudId` from `mcp__atlassian__getAccessibleAtlassianResources`. Use the resource whose scopes include `read:jira-work`.
2. Search with `mcp__atlassian__searchJiraIssuesUsingJql` using exactly this query:

   ```
   project = FLOW AND assignee = currentUser() AND status = "To Do" ORDER BY priority DESC, created ASC
   ```

   Request the fields `summary`, `priority`, `status` and `issuetype`. The first result is the ticket to work on: highest priority, oldest first on ties.
3. If there are no results, tell the user that no ticket assigned to them is in "To Do" and **stop**. Do not enter plan mode.
4. Read the full ticket with `mcp__atlassian__getJiraIssue` (`responseContentFormat: "markdown"`).

### Step 2: Summarize acceptance criteria

Show the user:

- Key, title, priority and link (`webUrl`)
- A one or two sentence summary of the description
- The acceptance criteria as a numbered list. Take them from the "Criterios de aceptación" / "Acceptance criteria" section of the description. If there is no such section, say so and list the criteria you inferred, marked as inferred.

If other tickets tie on the top priority, mention them in one line.

### Step 3: Enter plan mode

Call `EnterPlanMode`. Everything until approval happens in plan mode (read-only).

### Step 4: Explore the codebase and draft the plan

Read the code the ticket touches before proposing anything. Follow `CLAUDE.md`, and verify every API contract against the backend source (routes, validators, transformers) rather than the ticket text, because tickets often leave out fields the backend requires. Call out every gap between the ticket and the code.

Write the plan with this structure:

```markdown
# <KEY>: <title>

## Acceptance criteria → implementation
| # | Criterion | How it is met |

## Gaps between ticket and code
<what the ticket does not say and how the plan handles it; "None" if none>

## Changes
<files to create/modify, grouped by area, with one line each on what changes>

## Verification
<how each criterion will be checked: commands to run, manual steps>
```

### Step 5: Get plan approval (loop until approved)

1. Present the plan with `ExitPlanMode`.
2. **Rejected or changes requested:** you are still in plan mode. Apply the user's feedback, revise the plan, and call `ExitPlanMode` again. Repeat until it is approved.
3. **Approved:** go to Step 6.

### Step 6: Move the ticket to In Progress and verify

1. Call `mcp__atlassian__getTransitionsForJiraIssue` and pick the transition whose target status (`to.name`) is `In Progress`. Do not hardcode the transition id.
2. Call `mcp__atlassian__transitionJiraIssue` with that id.
3. Confirm the response shows `status.name` = `In Progress`. If the transition is missing or fails, report the error and the transitions that are available. Do not report success.
4. Tell the user the ticket is in progress (key + link). Do not start implementing until they ask.
