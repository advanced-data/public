# LMS Research Notes

Assumption: by `LMS`, I mean `learning management system`.
Context: this version is framed for an MSP, meaning a managed service provider.

## Short Definition

An LMS is a software platform used to create, deliver, manage, and track learning content and learning activity. In practice, it is the system instructors, trainers, students, and admins use to run courses, assignments, grading, communication, and reporting.  

Sources: [Blackboard](https://www.blackboard.com/learning-management-system/what-is-an-lms), [TechTarget](https://www.techtarget.com/searchcio/definition/learning-management-system), [Moodle](https://moodle.com/us/products/lms/)

## MSP Lens

For an MSP, an LMS is usually less about traditional school-style classes and more about operational training and skill development.

Common MSP use cases:

- New-hire onboarding for help desk, NOC, SOC, field techs, and account teams.
- Role-based technical training for cloud, security, networking, and Microsoft or other vendor stacks.
- Process training for ticket handling, escalation, documentation, and QA.
- Compliance and policy training.
- Recurring continuing education to keep certifications and product knowledge current.
- Career pathing from junior technician to senior engineer, team lead, or specialist.
- Client-facing training, such as customer onboarding, adoption, and end-user enablement.
- Sales and business development training, including discovery, proposal writing, and service positioning.

What matters most in an MSP-oriented LMS:

- Learning paths with prerequisites and required sequences.
- Role-based requirements and completion rules.
- Fast onboarding content that can be reused for each new hire.
- Ongoing updates for changing tools, vendor certifications, and internal SOPs.
- Reporting that shows who is compliant, who is overdue, and where skill gaps exist.
- Separation between onboarding paths and continuing education paths.

If the group is asking for "paths" and "requirements," that usually means:

- `Paths` = structured learning sequences by role, skill, or career stage.
- `Requirements` = mandatory modules, certifications, policy acknowledgements, or skill gates before promotion or access.

## What An LMS Usually Looks Like

Most LMS products converge on a similar structure:

- A global dashboard showing current courses as cards, tiles, or a course list.
- A course navigation menu, often on the left side.
- A main content area that shows modules, weekly sections, topics, or course items.
- A sidebar or drawer for calendar, upcoming work, activity, recent announcements, or blocks.
- A gradebook view with students in rows and assignments/items in columns.

The exact visual style changes by product, but the layout pattern is usually:

1. `Dashboard`
2. `Course shell`
3. `Content organizer`
4. `Assignment / quiz / file pages`
5. `Grades / analytics`
6. `Messaging / announcements / calendar`

### Typical Course Shell

A course usually has:

- A home page or course landing page.
- A set of modules, sections, or topics.
- Content items such as files, pages, quizzes, assignments, forums, and links.
- Progress, due dates, and completion indicators.
- Links to gradebook, calendar, discussion, and announcements.

Examples:

- Moodle course pages are built from central sections plus optional blocks and a course index. [Managing a Moodle course](https://docs.moodle.org/en/Managing_a_Moodle_course), [Course formats](https://docs.moodle.org/en/Course_formats), [Blocks](https://docs.moodle.org/en/Blocks)
- Canvas uses a global dashboard, a course navigation menu, and modules to organize content. [Course Navigation Menu](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-use-the-Course-Navigation-Menu-as-an-instructor/ta-p/941), [What are Modules?](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6), [Calendar](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-is-the-Calendar/ta-p/76)
- Blackboard Ultra centers all course content in the main page and uses a left navigation area plus a gradebook and activity stream. [Navigate Inside an Ultra Course](https://help.blackboard.com/Learn/Instructor/Ultra/Getting_Started/Navigate_Inside_a_Course), [Activity](https://help.blackboard.com/Learn/Instructor/Ultra/Getting_Started/Navigate_Outside_a_Course/Activity_Stream)

## Core Feature Set

### 1. Course authoring

Instructors typically can:

- Create courses.
- Add modules, sections, or weekly topics.
- Upload files and create pages.
- Add assignments, quizzes, discussions, and external tools.
- Reorder content by drag-and-drop or section controls.

Sources:

- [Moodle Managing a course](https://docs.moodle.org/en/Managing_a_Moodle_course)
- [Canvas Modules](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6)
- [Blackboard Ultra course content](https://help.blackboard.com/Learn/Instructor/Ultra/Getting_Started/Navigate_Inside_a_Course)

### 2. Assignments and assessment

An LMS usually supports:

- Assignment submission.
- Due dates and availability windows.
- Quizzes or tests.
- Rubrics or marking guides.
- Inline or attached feedback.
- Multiple attempts in some systems.

Sources:

- [Blackboard gradebook and grading tasks](https://help.blackboard.com/Learn/Instructor/Ultra/Grade/Navigate_Grading)
- [Moodle grade items](https://docs.moodle.org/en/Grade_items)
- [Canvas Gradebook](https://community.canvaslms.com/docs/DOC-26349-how-do-i-use-the-gradebook)

### 3. Gradebook

The gradebook is one of the defining LMS features. It typically shows:

- Students listed in rows.
- Activities/assignments in columns.
- Current grade, overall grade, or calculated totals.
- Missing, late, or needs-grading indicators.
- Export/import options in many platforms.

Sources:

- [Blackboard gradebook](https://help.blackboard.com/Learn/Instructor/Ultra/Grade/Navigate_Grading)
- [Moodle Grades](https://docs.moodle.org/en/Grades)
- [Canvas Gradebook](https://community.canvaslms.com/docs/DOC-26349-how-do-i-use-the-gradebook)

### 4. Communication

Common communication tools:

- Announcements.
- Inbox/messages.
- Discussion forums.
- Calendar reminders.
- Activity streams or notifications.

Sources:

- [Canvas Inbox](https://community.canvaslms.com/docs/DOC-26370-how-do-i-use-the-Inbox-as-an-instructor)
- [Canvas Calendar](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-is-the-Calendar/ta-p/76)
- [Blackboard Activity Stream](https://help.blackboard.com/Learn/Instructor/Ultra/Getting_Started/Navigate_Outside_a_Course/Activity_Stream)

### 5. Progress tracking

Many LMS products track:

- Completion status.
- Access or last-access history.
- Progress through sections or activities.
- Upcoming deadlines.
- Activity dates and submission counts.

Sources:

- [Moodle Tracking progress](https://docs.moodle.org/en/Tracking_progress)
- [Moodle Activities overview](https://docs.moodle.org/en/Activities_overview)
- [Blackboard progress tracking](https://help.blackboard.com/Learn/Student/Ultra/Courses/Progress_Tracking)

### 6. Roles and enrollment

An LMS usually distinguishes:

- Admins.
- Instructors / teachers.
- Students.
- Observers / parents / reviewers in some deployments.
- Managers or trainers in corporate setups.

It also usually handles:

- Manual or automatic enrollment.
- Grouping and sectioning.
- Permissions by role.

Sources:

- [Managing a Moodle course](https://docs.moodle.org/en/Managing_a_Moodle_course)
- [Canvas Observer guide](https://community.canvaslms.com/html/assets/Canvas_Observer_Guide.pdf)
- [Blackboard Ultra student help](https://help.blackboard.com/Learn/Student/Ultra)

## MSP-Specific Structure

For an MSP, the LMS structure usually breaks into these buckets:

### 1. Onboarding

- Company orientation.
- Security and compliance.
- Tools and systems access.
- Ticketing workflow.
- Escalation paths.
- Internal documentation standards.

### 2. Role Paths

- Help desk path.
- Field service path.
- Systems engineer path.
- Security path.
- Account management path.
- Sales engineering or business development path.

### 3. Continued Education

- Quarterly refreshers.
- Vendor updates.
- Certification prep.
- Incident review training.
- New service launches.
- Policy changes.

### 4. Client Enablement

- Customer onboarding.
- Admin training for client systems.
- End-user adoption content.
- Product or service how-tos.

### 5. Business Development

- Discovery call training.
- Proposal and scope training.
- Solution positioning.
- Cross-sell and upsell training.
- Partner/vendor program training.

## Common Layout Patterns

### Moodle

Moodle is the most configurable-looking of the major LMSes I checked. Its common visual pattern is:

- Center column for course sections.
- Optional blocks in a side drawer or side columns.
- Course index for quick navigation.
- Highly configurable course formats: custom sections, weekly sections, single activity, and more.

Sources:

- [Course homepage](https://docs.moodle.org/en/Course_sections)
- [Course formats](https://docs.moodle.org/en/Course_formats)
- [Blocks](https://docs.moodle.org/en/Blocks)

### Canvas

Canvas tends to look cleaner and more minimal:

- Global dashboard with course cards.
- Global navigation for account-wide areas.
- Course navigation menu on the left.
- Modules as the primary content organizer.
- Calendar and to-do surfaces tightly linked to assignments.

Sources:

- [Course Navigation Menu](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-use-the-Course-Navigation-Menu-as-an-instructor/ta-p/941)
- [What are Modules?](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6)
- [Card View Dashboard](https://community.canvaslms.com/t5/Canvas-Basics-Guide/How-do-I-view-my-courses-in-the-Card-View-Dashboard/ta-p/618765)

### Blackboard Ultra

Blackboard Ultra is more content-first:

- Main course content occupies the center.
- Items open in a panel overlay.
- Navigation exposes content, calendar, announcements, discussions, gradebook, messages, analytics, and groups.
- Activity stream surfaces new work and submissions.

Sources:

- [Navigate Inside an Ultra Course](https://help.blackboard.com/Learn/Instructor/Ultra/Getting_Started/Navigate_Inside_a_Course)
- [Activity Stream](https://help.blackboard.com/Learn/Instructor/Ultra/Getting_Started/Navigate_Outside_a_Course/Activity_Stream)

## Integrations and Standards

LMS platforms usually need to connect to the rest of an institution or company. Common integration points include:

- SIS or student records.
- HR systems.
- CRMs.
- Video tools.
- Collaboration tools like Zoom or Microsoft Teams.
- External content or assessment tools.

Common standards and content formats:

- LTI for external tool integrations.
- SCORM for packaged learning content.
- API-based syncing and provisioning.

Sources:

- [Blackboard LMS overview](https://www.blackboard.com/learning-management-system/what-is-an-lms)
- [Moodle SCORM module](https://docs.moodle.org/21/en/mod/scorm/index)
- [Moodle Creating SCORM Content](https://docs.moodle.org/502/en/Tools_for_creating_SCORM_content)

## Accessibility

Accessibility is a major LMS requirement, not an optional add-on.

Common expectations include:

- Keyboard navigation.
- Screen reader support.
- Captions and alt text.
- High-contrast and responsive layouts.
- Clear focus states and readable form controls.

Moodle explicitly documents WCAG 2.2 alignment and accessibility authoring support. Blackboard also calls out accessibility features such as screen reader compatibility, alternative text, closed captions, and adjustable interfaces. Canvas documentation also includes accessibility guidance in its course and student materials.

Sources:

- [Moodle Accessibility](https://docs.moodle.org/en/Accessibility)
- [Moodle Accessibility developer resources](https://docs.moodle.org/dev/Accessibility)
- [Blackboard LMS overview](https://www.blackboard.com/learning-management-system/what-is-an-lms)
- [Canvas basics guide](https://community.canvaslms.com/html/assets/Canvas_Basics_Guide.pdf)

## Common User Journeys

### Employee or Technician

1. Open dashboard.
2. Enter a role-based learning path.
3. Complete required onboarding modules.
4. Review SOPs, job aids, and certification content.
5. Submit knowledge checks or assessments.
6. Track completion, compliance, and skill progress.
7. Return later for refresher or advanced training.

### Manager or Trainer

1. Create or edit course content.
2. Set availability, due dates, and completion rules.
3. Build learning paths by role or department.
4. Review submissions and completion status.
5. Assign refresher training or corrective training.
6. Track participation, compliance, and progress.
7. Communicate with the team.

### Admin

1. Manage users and enrollments.
2. Configure roles and permissions.
3. Connect institutional systems.
4. Control themes, plugins, and integrations.
5. Review reports, logs, and usage data.

## Practical Takeaways

If you are designing or evaluating an LMS, the recurring patterns are:

- Courses or learning paths are the primary unit.
- Content is grouped into modules, sections, or steps.
- Rules for prerequisites, completion, and mandatory training matter more than school-style grading.
- Messaging and calendar surfaces reduce missed work.
- Accessibility and integration support are core requirements.
- Reporting should show completion, compliance, and skill progression.
- Different vendors mostly differ in visual density, flexibility, and how opinionated the course layout is.

## Source List

- Blackboard: [What is an LMS?](https://www.blackboard.com/learning-management-system/what-is-an-lms)
- TechTarget: [Learning management system definition](https://www.techtarget.com/searchcio/definition/learning-management-system)
- Moodle: [Moodle LMS product page](https://moodle.com/us/products/lms/)
- Moodle Docs: [Managing a Moodle course](https://docs.moodle.org/en/Managing_a_Moodle_course)
- Moodle Docs: [Course formats](https://docs.moodle.org/en/Course_formats)
- Moodle Docs: [Grades](https://docs.moodle.org/en/Grades)
- Moodle Docs: [Accessibility](https://docs.moodle.org/en/Accessibility)
- Canvas Community: [Course Navigation Menu](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-use-the-Course-Navigation-Menu-as-an-instructor/ta-p/941)
- Canvas Community: [Modules](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6)
- Canvas Community: [Gradebook](https://community.canvaslms.com/docs/DOC-26349-how-do-i-use-the-gradebook)
- Canvas Community: [Calendar](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-is-the-Calendar/ta-p/76)
- Blackboard Help: [Ultra course navigation](https://help.blackboard.com/Learn/Instructor/Ultra/Getting_Started/Navigate_Inside_a_Course)
- Blackboard Help: [Gradebook](https://help.blackboard.com/Learn/Instructor/Ultra/Grade/Navigate_Grading)

## Note

This is a research summary, not a product benchmark. If you want, I can turn it into a stricter spec next, such as:

- `MSP LMS requirements doc`
- `LMS feature checklist`
- `LMS wireframe outline`
- `LMS comparison matrix`
- `LMS product requirements doc`
