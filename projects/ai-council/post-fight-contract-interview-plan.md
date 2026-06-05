# Post-Fight Contract Interview Plan

## Goal

Turn the live debate into an agent-ready software contract.

The debate decides what is worth building. The post-fight interview converts that judgment into a buildable contract by asking the user to confirm or correct only the assumptions the system cannot safely infer.

This should feel like a boxing post-fight interview:

- The fight is over.
- The commentators know what happened.
- The champion still gets the final word.
- The interviewer asks pointed questions, not a blank intake form.

Every question should be pre-answered with the council's best suggested answer. The user can accept, edit, mark unknown, or reject the assumption.

## Product Shape

After final synthesis, the experience should move into a new phase:

```text
Post-Fight Interview
```

Working line:

```text
The council has a likely build contract. Confirm the assumptions it cannot prove.
```

The user should not be asked generic open-ended questions. Each prompt should include:

- Question.
- Suggested answer.
- Why the council thinks this is the answer.
- Confidence.
- Whether it blocks contract generation.
- Accept / Edit / Mark unknown / Reject controls.

This should be a same-session mode shift, not a separate route. The fight stage should dim down into a quieter confirmation surface after the verdict/scorecard has landed. Keep it in `/session/:sessionId` as a continuation of the event-sourced session experience.

Do not invent a new interaction model if the human gate already works. The post-fight interview is the gate's second act: the council proposes build assumptions, and the user rules on them.

Example:

```text
Section: Users and Buyer

Question
Who is the first buyer?

Suggested answer
Independent clinic owners or practice managers at specialty clinics with high prior-auth volume.

Why this is suggested
Models A and C converged on independent specialty clinics. Model B warned that RCM vendors or MSOs may be the real economic buyer.

Confidence
Medium

Action
Accept | Edit | Mark unknown | Reject
```

## Keep It Bounded

This is not a second intake process.

Rules:

- Ask only questions needed to create a build contract.
- Prefer defaults for stack and infrastructure.
- Default the UI to "needs attention" items, not the full assumption list.
- Force user attention only when an answer changes architecture, UX scope, compliance, integrations, or agent tasking.
- Let the user accept all high-confidence assumptions in one action.
- Keep low-confidence or disputed assumptions visible.
- Allow contract generation with "unknown" answers, but clearly mark resulting open decisions.
- Do not re-ask decisions the user already made at the human gate. Gate rulings should flow into the interview as accepted assumptions.

## Default Build Stack

The app should maintain project defaults so the user is not asked about stack every time.

Suggested initial defaults:

```text
Frontend: Next.js, React, TypeScript
Backend: Next.js route handlers / server services
Database: PostgreSQL
ORM: Prisma
Runtime/dev: Node.js
Packaging: Docker Compose
Testing: Playwright e2e, TypeScript typecheck, ESLint
Auth: app login required by default
Deployment target: single VPS/container-friendly app unless changed
```

These can live in settings later. For v1, hard-code them as contract defaults and expose them in the post-fight interview as a single editable "Build stack" assumption.

## Contract Writer Model

Use a high-end model for final contract generation. This is not a cheap moderator task.

Recommended default:

```text
CONTRACT_WRITER_PROVIDER=openai
CONTRACT_WRITER_MODEL=gpt-5.5
```

Fallback:

```text
CONTRACT_WRITER_MODEL=gpt-5.4
```

Do not use the fastest/smallest model for final contract writing. This artifact becomes the source of truth for downstream build agents, so quality and coherence matter more than a few seconds of latency.

The contract writer is not Model A/B/C and should not appear as a fourth combatant. Treat it as:

```text
The Commissioner / Contract Clerk
```

The moderator conducts the post-fight interview. The Commissioner writes and sanctions the official contract. Keep these as two distinct non-combatant roles:

- Moderator: asks and explains the pre-answered questions.
- Commissioner: writes the final build contract from accepted terms.

It writes the contract from:

- Final synthesis.
- Claims and human decisions.
- Moderator reports.
- Debate transcript summaries.
- Accepted post-fight interview assumptions.
- Defaults.
- Open questions marked unknown.

## Contract Readiness Sections

The post-fight interview should produce assumptions for these sections:

1. Product intent
2. Primary users and economic buyer
3. MVP scope
4. Non-goals
5. UX routes and screens
6. Core workflows
7. Data model
8. Integrations
9. Build stack and infrastructure
10. Security, privacy, and compliance
11. Operational/admin requirements
12. Acceptance criteria and test plan
13. Agent task breakdown
14. Open decisions

## Suggested Question Types

Use structured question cards. Good question categories:

```ts
type ContractInterviewSection =
  | "product_intent"
  | "users_buyer"
  | "mvp_scope"
  | "non_goals"
  | "ux_routes"
  | "workflows"
  | "data_model"
  | "integrations"
  | "stack_infrastructure"
  | "security_compliance"
  | "operations"
  | "acceptance_tests"
  | "agent_tasks"
  | "open_decisions";

type ContractAssumptionStatus =
  | "suggested"
  | "accepted"
  | "edited"
  | "unknown"
  | "rejected";

interface ContractAssumption {
  id: string;
  section: ContractInterviewSection;
  question: string;
  suggestedAnswer: string;
  finalAnswer?: string;
  rationale: string;
  confidence: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
  blocksContract: boolean;
  status: ContractAssumptionStatus;
  sourceEventIds?: string[];
  sourceClaimIds?: string[];
}
```

## Backend Plan

### 1. Add Contract Interview Persistence

Add a persistent model or JSON artifact. Prefer explicit rows if time permits:

```prisma
model ContractInterview {
  id        String   @id @default(uuid())
  sessionId String
  runId     String?
  status    String   @default("draft")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  items     ContractInterviewItem[]
}

model ContractInterviewItem {
  id            String   @id @default(uuid())
  interviewId   String
  section       String
  question      String
  suggestedAnswer String
  finalAnswer   String?
  rationale     String
  confidence    String
  impact        String
  blocksContract Boolean @default(false)
  status        String   @default("suggested")
  sourceEventIds Json?
  sourceClaimIds Json?
  orderIndex    Int
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

If schema churn is too expensive for v1, store it as `ContractArtifact.structuredJson.postFightInterview`, but the row model is better for editing and reruns.

### 2. Generate Suggested Answers

Backend service:

```ts
generatePostFightInterview(sessionId, runId)
```

Inputs:

- Latest completed debate run.
- Folded debate state.
- Final synthesis.
- Human decisions.
- Claims.
- Moderator reports.
- Existing app/stack defaults.

Output:

- 10 to 18 assumption cards.
- Most should be pre-accepted or high-confidence suggested.
- Only 3 to 7 should usually need user attention.

Generation strategy:

- Use deterministic defaults for stack/infrastructure.
- Use claims and human decisions for scope/non-goals.
- Use synthesis and moderator reports for product intent and risks.
- Use a high-end model or GPT mini for assumption generation depending on quality needs.

Recommended v1:

- Generate assumptions deterministically where possible.
- Use `gpt-5.4-mini` or current moderator model for the assumption draft.
- Use `gpt-5.5` only for final contract writing.

### 3. Add API Endpoints

Suggested endpoints:

```text
POST /api/sessions/:sessionId/contract-interview/generate
GET  /api/sessions/:sessionId/contract-interview
PATCH /api/sessions/:sessionId/contract-interview/items/:itemId
POST /api/sessions/:sessionId/contract-interview/accept-all-safe
POST /api/sessions/:sessionId/contract/generate-from-interview
```

PATCH item body:

```ts
{
  status: "accepted" | "edited" | "unknown" | "rejected";
  finalAnswer?: string;
}
```

### 4. Add Event Stream Hooks

Because the live experience is event-sourced, also append events so the stage can transition cleanly:

```ts
interface ContractInterviewStartedEvent {
  type: "contract_interview_started";
  interviewId: string;
}

interface ContractInterviewItemsGeneratedEvent {
  type: "contract_interview_items_generated";
  interviewId: string;
  items: ContractAssumption[];
}

interface ContractInterviewItemUpdatedEvent {
  type: "contract_interview_item_updated";
  interviewId: string;
  item: ContractAssumption;
}

interface ContractWritingStartedEvent {
  type: "contract_writing_started";
  providerKey: string;
  modelId: string;
}

interface ContractTokenDeltaEvent {
  type: "contract_token_delta";
  delta: string;
}

interface ContractCompletedEvent {
  type: "contract_completed";
  contractId: string;
  markdown: string;
  structured: BuildContract;
  dealSheet: ContractDealSheet;
  providerKey: string;
  modelId: string;
  latencyMs?: number;
  tokenUsage?: TokenUsage;
}
```

Events are useful for the stage, but the canonical state should still be persisted in DB tables/artifacts.

### 5. Contract Writer Service

Add a service separate from the old legacy `generateContract`:

```ts
generateBuildContractFromInterview(sessionId, runId, interviewId)
```

Use `CONTRACT_WRITER_PROVIDER` and `CONTRACT_WRITER_MODEL`.

Output schema:

```ts
interface BuildContract {
  title: string;
  productGoal: string;
  users: Array<{ role: string; needs: string[]; permissions?: string[] }>;
  mvpScope: string[];
  nonGoals: string[];
  uxRoutes: Array<{ route: string; purpose: string; primaryActions: string[] }>;
  workflows: Array<{ name: string; steps: string[]; successState: string }>;
  dataModel: Array<{ entity: string; fields: string[]; relationships: string[] }>;
  integrations: Array<{ system: string; direction: string; notes: string }>;
  stack: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
    testing: string[];
  };
  securityPrivacy: string[];
  acceptanceCriteria: string[];
  agentTasks: Array<{ agent: "backend" | "frontend" | "qa" | "security" | "devops"; tasks: string[] }>;
  openDecisions: string[];
}

interface ContractDealSheet {
  productGoal: string;
  primaryUsers: string[];
  mvp: string[];
  stack: string[];
  agentSplit: Array<{ agent: string; headline: string }>;
  openDecisionCount: number;
}
```

Also produce Markdown with stable headings so agents can consume it directly.

## Frontend Plan

### Entry Point

After final synthesis, show a new post-fight transition:

```text
Post-Fight Interview
The council has enough to draft a build contract. Confirm the assumptions before the Commissioner writes it.
```

Buttons:

- Review the contract terms
- Generate now - accept all suggestions

Do not show a third "skip" button in the primary action cluster. Leaving the phase or going home is the skip path.

### Interview UI

Use the human-gate interaction DNA: one primary card, a section/milestone rail, provenance, and strong verb buttons. The user already learned this pattern during the fight.

Default view:

```text
Needs a ruling
```

That means the user lands on blocking, low-confidence, edited, rejected, or disputed assumptions first. High-confidence assumptions should be summarized as already accepted from the fight, with an option to expand.

Card controls:

- Accept
- Edit
- Mark unknown
- Reject

Bulk controls:

- Accept all high-confidence assumptions
- Show only items needing attention
- Show all assumptions

Provenance should be visible but compact. Use "Corner notes" for the rationale. If provider reveal is off, cite Model A/B/C. If provider reveal is on, cite the provider names consistently with the rest of the stage.

Important UX rule:

The user should feel like they are reviewing the council's homework, not filling out a form.

### Contract Preview

Once ready:

- Show "The Commissioner is writing the contract..." while GPT-5.5 runs.
- Stream Markdown if feasible.
- Show a deal sheet first: product goal, users, MVP, stack, agent split, and open decision count.
- Render final contract with section navigation.
- Include "Send to agents" / "Export Markdown" actions.
- Use a restrained "sanctioned" / official seal treatment in the UI, not inside the exported contract.

### Boxing Language

Use the theme without making the product silly:

- "Post-Fight Interview"
- "Commissioner's Contract"
- "Official Decision"
- "Corner notes"
- "Needs a ruling"
- "Accepted by the corner"
- "Corner notes"
- "The Commissioner's Contract"
- "Send to the team"

Avoid overdoing it in the contract itself. The exported contract should be professional and agent-ready.

## Contract Quality Bar

The generated contract is good only if a backend and frontend agent can build from it without returning for obvious missing context.

Required checks before contract completion:

- Includes concrete user roles.
- Includes at least one route/screen map.
- Includes MVP and non-goals.
- Includes data entities.
- Includes integrations, even if "none for MVP."
- Includes stack defaults.
- Includes security/compliance requirements.
- Includes acceptance criteria.
- Includes backend/frontend task split.
- Lists unresolved decisions explicitly.

If these sections are missing, the contract writer should repair before returning.

## MVP Implementation Order

1. Backend: add contract interview generation and persistence.
2. Backend: add contract writer using high-end OpenAI model.
3. Frontend: add post-fight interview cards after synthesis.
4. Frontend: add contract preview/export flow.
5. Tests: replay fixture with generated assumptions.
6. Tests: contract generation smoke with a fake writer or deterministic fallback.

## Open Decisions

1. Should the post-fight interview auto-start after synthesis, or wait for a button?
   - Recommendation: wait for a button in v1. Let the verdict and scorecard breathe.

2. Should contract generation be allowed if blocking items are unknown?
   - Recommendation: yes, but list them in `openDecisions`.

3. Should GPT-5.5 write from full transcript or summarized state?
   - Recommendation: summarized state plus selected excerpts. Full transcript can be too noisy and expensive.

4. Should the old legacy contract pipeline remain?
   - Recommendation: keep it temporarily, but make the new post-fight contract the primary path.

5. Should the final contract expose provider names?
   - Recommendation: no by default. It should cite "Model A/B/C" unless provider reveal is enabled.

6. Should the final contract include a deal sheet?
   - Recommendation: yes. The deal sheet is the audience-readable payoff; the full contract is the agent-readable artifact.
