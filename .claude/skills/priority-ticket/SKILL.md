---
name: priority-ticket
description: Get the highest priority ticket from Jira FLOW project and create an implementation plan
---

# priority-ticket

Get the highest priority ticket from Jira FLOW project and create an implementation plan.

## What this skill does

When invoked with `/priority-ticket`, this skill will:

1. **Find the highest priority ticket** assigned to you in the FLOW project that is in the first board column (To Do status)
2. **Show a summary** of the ticket with its acceptance criteria
3. **Enter plan mode** to propose an implementation approach by exploring the actual project code (e.g., backend validators, existing components)
4. **Wait for approval** before taking any action
5. **Move the ticket to In Progress** only after you approve the plan

## Important constraints

- **DO NOT write any code** before the user approves the plan
- **DO NOT move the ticket** to In Progress before the user approves the plan
- Always query the actual Jira project statuses instead of assuming status names
- Explore the real codebase (validators, models, transformers, existing components) to fill gaps not specified in the ticket

## Step-by-step instructions

### Step 1: Query Jira project metadata

First, get the actual statuses and their categories from the FLOW project to identify which status represents "To Do":

```
Use mcp__atlassian__getVisibleJiraProjects to find the FLOW project
The cloudId should be: 765fde6d-5ecd-467e-b2a6-e87f22682832
Look for project with key "FLOW"
```

### Step 2: Search for highest priority ticket

Use JQL to find tickets assigned to current user in "To Do" status, ordered by priority:

```
Use mcp__atlassian__searchJiraIssuesUsingJql with:
- cloudId: 765fde6d-5ecd-467e-b2a6-e87f22682832
- jql: assignee = currentUser() AND project = FLOW AND status = "To Do" ORDER BY priority ASC, updated DESC
- maxResults: 10
```

**Important**: Priority ordering in Jira is ASC (ascending) because lower priority IDs = higher priority (e.g., Highest=1, High=2, Medium=3, Low=4, Lowest=5).

### Step 3: Select the highest priority ticket

From the results, take the first ticket (it will be the highest priority due to the ORDER BY clause).

### Step 4: Show ticket summary

Display a clear summary with:
- Ticket key and title
- Status
- Priority
- Description
- Acceptance criteria (extracted from the description)
- Link to the ticket

### Step 5: Explore the codebase for context

Before creating the plan, explore the relevant parts of the codebase:

- **For backend-related tickets**: Check validators in `backend/app/validators/`, models in `backend/app/models/`, transformers in `backend/app/transformers/`
- **For frontend-related tickets**: Check existing components, validators requirements from backend
- **For auth-related tickets**: Check `backend/app/validators/user.ts` for exact field requirements (signupValidator, loginValidator)

Use the Task tool with subagent_type=Explore to efficiently explore the codebase.

### Step 6: Enter plan mode

Use the ExitPlanMode tool to:
1. Present a detailed implementation plan based on the ticket requirements AND the actual codebase
2. Break down the work into specific, actionable steps
3. Reference the actual validators, models, or components you found
4. Specify what needs to be created vs. what exists
5. Include any technical decisions (routing library, state management, component structure)

The plan should be clear, specific, and grounded in the real project structure.

### Step 7: Wait for user approval

**CRITICAL**: Stop here and wait for the user to review and approve the plan. Do NOT proceed to the next step without explicit approval.

Output a message like:
```
Please review the plan above. If you approve it, I will:
1. Move ticket {TICKET-KEY} to "In Progress"
2. Begin implementation following the approved plan

Reply with "approve" or "yes" to proceed, or provide feedback to adjust the plan.
```

### Step 8: After approval - Move ticket to In Progress

Only after the user explicitly approves the plan:

1. Get available transitions for the ticket:
```
Use mcp__atlassian__getTransitionsForJiraIssue with:
- cloudId: 765fde6d-5ecd-467e-b2a6-e87f22682832
- issueIdOrKey: {TICKET-KEY}
```

2. Find the transition to "In Progress" (or similar status like "In Development")

3. Execute the transition:
```
Use mcp__atlassian__transitionJiraIssue with:
- cloudId: 765fde6d-5ecd-467e-b2a6-e87f22682832
- issueIdOrKey: {TICKET-KEY}
- transition: { id: {TRANSITION-ID} }
```

4. Confirm the ticket was moved successfully

## Example invocation

```
/priority-ticket
```

## Error handling

- If no tickets found in "To Do" status: inform the user and suggest checking the backlog
- If multiple tickets have the same priority: pick the most recently updated one
- If Jira API fails: show a clear error message with troubleshooting steps
- If the user rejects the plan: ask for feedback and revise the plan accordingly

## Success criteria

The skill successfully completes when:
1. The highest priority ticket is identified and summarized
2. A detailed, code-aware implementation plan is presented
3. The user approves the plan
4. The ticket is moved to "In Progress" in Jira
5. Claude is ready to begin implementation following the approved plan
