# From Salesforce to the Web Stack
## A Four-Week Practical Guide to React, Next.js, PostgreSQL & Vercel

> Build a real full-stack application from zero to deployed in 28 days.  
> Written for developers with Apex experience and zero JavaScript background.

---

## Table of Contents

- [Preface: Before You Begin](#preface-before-you-begin)
- [Week 1 — JavaScript & React](#week-1--javascript--react)
- [Week 2 — Next.js](#week-2--nextjs)
- [Week 3 — PostgreSQL](#week-3--postgresql)
- [Week 4 — Vercel & Production](#week-4--vercel--production)
- [Appendix A: Quick Reference Cheat Sheets](#appendix-a-quick-reference-cheat-sheets)
- [Appendix B: Recommended Resources](#appendix-b-recommended-resources)
- [Appendix C: Apex-to-JavaScript Reference](#appendix-c-apex-to-javascript-reference)

---

# Preface: Before You Begin

## Who This Guide Is For

This guide is written for a developer who can write Apex with some competency, has never written meaningful JavaScript, and has about one hour per day to invest. It does not assume web development experience. It does assume you are comfortable reading and writing code, thinking in objects and methods, and debugging methodically.

The goal is not fluency. The goal is **productive competence** — enough to build a working proof-of-concept application using AI assistance, understand what you are looking at, and make meaningful changes to the output. That is the right target for a role centred on rapid prototyping.

## The Project

Across all four weeks you will build a single application: a **Client Job Tracker** for a small trade business. A plumber, electrician, or builder can use it to log jobs, assign statuses, and view a live dashboard.

This application is deliberately unglamorous. What it provides is **full-stack coverage**: a React frontend, a Next.js routing and API layer, a PostgreSQL database, and a Vercel deployment. Every technology in the target stack is exercised meaningfully.

> **Why this project?**  
> Proof-of-concept work for small businesses almost always involves the same primitives: a list of records, a way to create and update them, and a dashboard view. Master this shape and you can adapt it to any client domain quickly.

## A Realistic Expectation

One hour per day across four weeks is about 28 hours of active learning. That is not enough to master this stack. It is enough to become **dangerous with it** — which is all you need to be effective in the role described.

Use AI assistance heavily throughout this guide. The skill being developed is knowing *what to ask for*, recognising when the output is wrong, and understanding it well enough to change it. Every code sample in this guide can be fed directly to an AI assistant with a prompt like "Explain this line by line" if anything is unclear.

## Environment Setup

**Required installs before Week 1:**

1. [Node.js (LTS)](https://nodejs.org) — the JavaScript runtime
2. [VS Code](https://code.visualstudio.com) — the editor
3. [Git](https://git-scm.com) — version control
4. A free [Neon](https://neon.tech) account — hosted PostgreSQL
5. A free [Vercel](https://vercel.com) account — deployment platform
6. A free [GitHub](https://github.com) account — where your code lives

**Scaffold your project** by opening a terminal and running:

```bash
npx create-next-app@latest job-tracker
```

When prompted:
```
✔ Would you like to use TypeScript? → No
✔ Would you like to use ESLint? → Yes
✔ Would you like to use Tailwind CSS? → Yes
✔ Would you like to use the src/ directory? → No
✔ Would you like to use App Router? → Yes
✔ Would you like to customise the import alias? → No
```

This creates the `job-tracker` folder with everything configured. Open it in VS Code with `code job-tracker`.

> **💡 Running the dev server**  
> `cd job-tracker` then `npm run dev` starts the development server at `http://localhost:3000`. Keep it running while you work — changes appear instantly without reloading.

---

# Week 1 — JavaScript & React

> **Goal:** Understand the language, then the UI layer.

Week 1 has two distinct phases. Days 1–2 cover the JavaScript you need to not be confused by React. Days 3–5 cover React itself. Do not skip the JavaScript days — they are short but they prevent a lot of confusion later.

| Day | Topic | Goal |
|-----|-------|------|
| Day 1 | JavaScript fundamentals I | Variables, functions, arrow syntax |
| Day 2 | JavaScript fundamentals II | Arrays, objects, async/await |
| Day 3 | React: components & JSX | Render a job card from props |
| Day 4 | React: state with useState | Add an interactive status toggle |
| Day 5 | React: useEffect & lists | Render a full job list from an array |

---

## Day 1 — JavaScript Fundamentals I

### Variables

JavaScript has three ways to declare a variable. You will use two of them:

```js
// const — use by default. Cannot be reassigned.
const jobTitle = 'Fix hot water system';

// let — use when the value needs to change.
let status = 'pending';
status = 'complete';  // OK

// var — do not use. It has confusing scoping rules.
// You will see it in older code. Ignore it.
```

> **💡 Apex comparison**  
> This maps directly to Apex. Think of `const` as `final` and `let` as a regular variable declaration. The difference is that in JavaScript, you do not declare the type — JavaScript infers it at runtime.

### Functions and Arrow Syntax

You will write functions two ways. Both do the same thing — React code almost exclusively uses the arrow syntax:

```js
// Traditional function
function formatStatus(status) {
  return status.toUpperCase();
}

// Arrow function — same thing, shorter syntax
const formatStatus = (status) => {
  return status.toUpperCase();
};

// If the function body is a single expression,
// you can drop the braces and return keyword:
const formatStatus = (status) => status.toUpperCase();

console.log(formatStatus('pending'));  // 'PENDING'
```

> **⚠ Watch out**  
> The one-liner form (no braces, implicit return) is idiomatic JavaScript. You will see it constantly in React code. If it is confusing, mentally expand it to the full form with braces and a `return` statement.

> **🛠 Exercise — Day 1**
> Open your browser's DevTools console (`F12` → Console tab). You can run JavaScript directly there — no file needed.
> 1. Declare a `const` for a job title and a `let` for a status. Try reassigning the `const` — read the error message.
> 2. Write `formatStatus` as a traditional function, then rewrite it as an arrow function. Confirm both produce the same output with `console.log`.
> 3. Write a one-liner arrow function `getInitials` that takes a full name string (e.g. `'Jane Smith'`) and returns the initials (e.g. `'JS'`). Hint: `.split(' ')`, `.map()`, and `.join('')`.

---

## Day 2 — JavaScript Fundamentals II

### Arrays and the `.map()` Method

In React, you render lists by transforming an array into JSX using `.map()`. It is the single most important array method you will use:

```js
const jobs = ['Fix hot water', 'Repair roof leak', 'Install lights'];

// .map() runs a function on each item and returns a NEW array.
// It does not modify the original.
const upperCaseJobs = jobs.map((job) => job.toUpperCase());

console.log(upperCaseJobs);
// ['FIX HOT WATER', 'REPAIR ROOF LEAK', 'INSTALL LIGHTS']

// .filter() returns only items where the function returns true
const waterJobs = jobs.filter((job) => job.includes('water'));
// ['Fix hot water']
```

### Objects and Destructuring

A JavaScript object is a collection of key-value pairs — similar to a `Map` in Apex. Destructuring is shorthand for pulling values out of an object:

```js
// An object
const job = {
  id: 1,
  title: 'Fix hot water system',
  status: 'pending',
  client: 'Jane Smith',
};

// Access values with dot notation
console.log(job.title);  // 'Fix hot water system'

// Destructuring — pull out named values in one line
const { title, status } = job;
console.log(title);   // 'Fix hot water system'
console.log(status);  // 'pending'
```

### Async/Await — Talking to APIs and Databases

JavaScript is non-blocking. When you request data from a database or API, the code does not wait — it fires the request and moves on. `async/await` is the modern syntax for handling this cleanly:

```js
// async marks a function as asynchronous
// await pauses execution inside that function until the promise resolves

async function fetchJobs() {
  const response = await fetch('/api/jobs');  // waits for the HTTP response
  const data = await response.json();         // waits for JSON parsing
  return data;
}

// Always wrap await calls in try/catch to handle errors
async function fetchJobsSafely() {
  try {
    const response = await fetch('/api/jobs');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
  }
}
```

> **📝 Note: Promises vs async/await**  
> Promises are the underlying mechanism. `async/await` is syntax sugar on top of them. You will occasionally see `.then()` and `.catch()` in older code — these are the promise chain equivalents of `await` and `catch` blocks. They do the same thing.

> **🛠 Exercise — Day 2**
> In the browser console or a scratch `.js` file:
> 1. Create an array of three job objects, each with `id`, `title`, `status`, and `client` properties.
> 2. Use `.map()` to extract just the `title` from each job into a new array.
> 3. Use `.filter()` to return only jobs where `status === 'pending'`.
> 4. Destructure the first job object into individual variables in a single line.
> 5. Write an `async` function `simulateFetch` that waits 100ms using `await new Promise(resolve => setTimeout(resolve, 100))`, then returns the jobs array. Call it and log the result with `.then(console.log)`.

---

## Day 3 — React: Components and JSX

### What React Is

React is a JavaScript library for building user interfaces. Its core idea: **your UI is a function of your data**. You describe what the UI should look like for a given state, and React handles updating the DOM when that state changes.

A React component is just a JavaScript function that returns JSX — a syntax that looks like HTML but is actually JavaScript:

```jsx
// app/components/JobCard.jsx

// A simple React component.
// Convention: component names start with a capital letter.
function JobCard({ title, status, client }) {
  return (
    <div className="job-card">
      <h2>{title}</h2>
      <p>Client: {client}</p>
      <span>{status}</span>
    </div>
  );
}

// Usage — looks like an HTML tag
<JobCard title="Fix hot water" status="pending" client="Jane Smith" />
```

> **📝 JSX rules to know**
> 1. `className` instead of `class` (`class` is a reserved word in JavaScript)
> 2. Curly braces `{}` embed a JavaScript expression inside JSX
> 3. Every component must return a single root element — wrap siblings in `<div>` or an empty fragment `<>...</>`
> 4. Self-closing tags must have a slash: `<input />` not `<input>`

### Props

Props are arguments passed into a component from its parent — equivalent to method parameters in Apex. The component receives them as a single object, and you destructure the values you need:

```jsx
// Receiving props via destructuring
function JobCard({ title, status }) {
  return <div>{title} — {status}</div>;
}

// Passing props from a parent component
function JobList() {
  return (
    <div>
      <JobCard title="Fix hot water" status="pending" />
      <JobCard title="Repair roof" status="complete" />
    </div>
  );
}
```

> **🛠 Exercise — Day 3**
> 1. Create `app/components/JobCard.jsx` with the `JobCard` component above.
> 2. Open `app/page.jsx` and replace its contents with a `JobList` component that renders three hardcoded `JobCard` components.
> 3. Run `npm run dev` and confirm the cards appear at `http://localhost:3000`.

---

## Day 4 — React: State with useState

### What State Is

State is data that belongs to a component and can change over time. When state changes, React re-renders the component. You declare state with the `useState` hook:

```jsx
// app/components/JobCard.jsx
import { useState } from 'react';

function JobCard({ title, initialStatus }) {
  // useState returns [currentValue, setterFunction]
  // The argument to useState is the initial value
  const [status, setStatus] = useState(initialStatus);

  const toggleStatus = () => {
    if (status === 'pending') {
      setStatus('complete');
    } else {
      setStatus('pending');
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>Status: {status}</p>
      <button onClick={toggleStatus}>Toggle Status</button>
    </div>
  );
}
```

> **⚠ Never mutate state directly**  
> Always use the setter function. `status = 'complete'` will **not** trigger a re-render. `setStatus('complete')` will. This is one of the most common React mistakes.

> **🛠 Exercise — Day 4**
> 1. Update your `JobCard` component to use `useState` for the status.
> 2. Add a button that toggles between `'pending'` and `'complete'`.
> 3. Notice: each card maintains its own independent state.

---

## Day 5 — React: useEffect and Rendering Lists

### Rendering a List with `.map()`

Rather than hardcoding individual `<JobCard />` components, real applications render lists from data using `.map()`:

```jsx
const jobs = [
  { id: 1, title: 'Fix hot water',   status: 'pending',  client: 'Jane Smith' },
  { id: 2, title: 'Repair roof',     status: 'complete', client: 'Bob Jones' },
  { id: 3, title: 'Install lights',  status: 'pending',  client: 'Alice Brown' },
];

function JobList() {
  return (
    <div>
      {jobs.map((job) => (
        // The key prop is required. It helps React track items efficiently.
        // Always use a unique ID, not the array index.
        <JobCard
          key={job.id}
          title={job.title}
          status={job.status}
          client={job.client}
        />
      ))}
    </div>
  );
}
```

### useEffect — Running Code on Load

`useEffect` runs a side effect after the component renders. The most common use is fetching data when a component loads:

```jsx
import { useState, useEffect } from 'react';

function JobList() {
  const [jobs, setJobs] = useState([]);        // start with empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function runs once when the component first mounts
    async function loadJobs() {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
      setLoading(false);
    }

    loadJobs();
  }, []);  // Empty array = run once only. This is important.

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} title={job.title} status={job.status} />
      ))}
    </div>
  );
}
```

> **📝 The dependency array**  
> The second argument to `useEffect` — the `[]` — is the dependency array. An empty array means "run once on mount". If you put a variable in it like `[jobId]`, the effect re-runs whenever that variable changes. Omitting it entirely means "run after every render", which is almost never what you want.

> **🛠 Exercise — Week 1 Final Task**  
> Update your `app/page.jsx` to use `useState` and `useEffect`. For now, fake the API call: instead of `fetch('/api/jobs')`, just call `setJobs(hardcodedJobsArray)` inside `useEffect`. This mimics the pattern you will use in Week 2 when the real API exists. **Goal:** the page renders a job list that comes from state, not from JSX literals.

---

# Week 2 — Next.js

> **Goal:** Routing, server components, and your first API.

Next.js wraps React with a full application framework. This week you will learn its routing system, the distinction between server and client components, and how to write backend API routes. By the end of the week, your job list will be fetching from a real endpoint — one you wrote.

| Day | Topic | Goal |
|-----|-------|------|
| Day 1 | What Next.js adds to React | Understand the App Router structure |
| Day 2 | File-based routing | Create `/jobs` and `/jobs/[id]` pages |
| Day 3 | Server vs Client components | Add `'use client'` where needed |
| Day 4 | API Routes — GET and POST | Build the `/api/jobs` endpoint |
| Day 5 | Connect frontend to API | `useEffect` fetches from your own route |

---

## Day 1 — What Next.js Adds to React

### The Framework Layer

React is a UI library. It renders components. It does not handle routing, API endpoints, server-side rendering, or deployment. Next.js provides all of that on top of React. The stack you are working with uses the **App Router** — the modern approach introduced in Next.js 13.

**What Next.js handles for you:**

- **Routing** — the folder structure inside `app/` defines your URLs automatically
- **API layer** — `route.js` files inside `app/api/` become HTTP endpoints, no separate server needed
- **Server & client rendering** — components can run on the server (faster initial load) or in the browser (interactivity)
- **Build & deployment** — `npm run build` produces an optimised production build; Vercel deploys it with zero configuration

### The App Directory Structure

```
job-tracker/
├── app/
│   ├── layout.jsx            ← Root layout (wraps every page)
│   ├── page.jsx              ← The / route (homepage)
│   ├── jobs/
│   │   ├── page.jsx          ← The /jobs route
│   │   └── [id]/
│   │       └── page.jsx      ← The /jobs/1, /jobs/2 etc. routes
│   └── api/
│       └── jobs/
│           └── route.js      ← GET and POST /api/jobs
├── components/
│   └── JobCard.jsx
└── public/
```

> **💡 The file IS the route**  
> There is no router configuration file. The folder path is the URL. `app/jobs/page.jsx` serves `/jobs`. `app/jobs/[id]/page.jsx` serves `/jobs/anything`. This is the single most important thing to internalise about Next.js routing.

> **🛠 Exercise — Day 1**
> No code to write today — orient yourself in the project instead.
> 1. Open your `job-tracker` folder and locate each file shown in the directory tree above.
> 2. Without looking: what URL does `app/jobs/[id]/page.jsx` serve? What file path would you create to serve `/api/stats`?
> 3. Open `app/layout.jsx`. What does it wrap, and why would a change to it affect every page in the app?
> 4. Run `npm run dev`, open `http://localhost:3000`, then open DevTools → Network tab and reload. This is the request baseline before you add any API routes — keep it in mind for comparison later.

---

## Day 2 — File-Based Routing

### Creating Pages

Create the folder structure, then create a `page.jsx` file inside each folder. That file's default export is the component that renders for that route:

```jsx
// app/jobs/page.jsx — renders at /jobs
export default function JobsPage() {
  return (
    <main>
      <h1>All Jobs</h1>
      {/* Job list will go here */}
    </main>
  );
}
```

### Dynamic Routes

Square brackets in a folder name create a dynamic segment. The value in the URL is available as a prop called `params`:

```jsx
// app/jobs/[id]/page.jsx — renders at /jobs/1, /jobs/42, etc.
export default function JobDetailPage({ params }) {
  // params.id contains the value from the URL
  return (
    <main>
      <h1>Job #{params.id}</h1>
      {/* Job detail will go here */}
    </main>
  );
}
```

### Navigation with Link

Use Next.js's `<Link>` component instead of a plain `<a>` tag. It enables client-side navigation (no full page reload) and prefetching:

```jsx
import Link from 'next/link';

function JobCard({ id, title, status }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{status}</p>
      <Link href={`/jobs/${id}`}>View Details →</Link>
    </div>
  );
}
```

> **📝 Template literals**  
> The backtick syntax `` `/jobs/${id}` `` is a JavaScript template literal — equivalent to `String.format` in other languages. Anything inside `${}` is a JavaScript expression.

> **🛠 Exercise — Day 2**
> 1. Create `app/jobs/page.jsx` with a placeholder heading.
> 2. Create `app/jobs/[id]/page.jsx` that displays `Job #{params.id}`.
> 3. Update your `JobCard` component to wrap its content in a `<Link>` pointing to `/jobs/{id}`.
> 4. Navigate between pages and confirm the URL updates correctly.

---

## Day 3 — Server vs Client Components

### The Key Distinction

This is where Next.js differs most from plain React and where new developers get confused. In the App Router, **all components are Server Components by default**. Server Components run on the server and send plain HTML to the browser. They are faster for initial load but cannot use browser APIs, event handlers, or React hooks like `useState`.

```jsx
// This is a Server Component (default)
// It can use async/await directly — no useEffect needed
// It CANNOT use useState, onClick, or any browser API
export default async function JobsPage() {
  // In Week 3, this will query the database directly.
  // For now, use hardcoded data.
  const jobs = [
    { id: 1, title: 'Fix hot water', status: 'pending' },
  ];

  return (
    <main>
      {jobs.map(job => <p key={job.id}>{job.title}</p>)}
    </main>
  );
}
```

```jsx
// 'use client' makes this a Client Component
// It runs in the browser and CAN use useState, onClick, etc.
// It CANNOT use async/await at the top level or Node.js APIs
'use client';

import { useState } from 'react';

export default function StatusToggle({ initialStatus }) {
  const [status, setStatus] = useState(initialStatus);

  return (
    <button onClick={() => setStatus(status === 'pending' ? 'complete' : 'pending')}>
      {status}
    </button>
  );
}
```

> **💡 A practical rule**  
> Start with every component as a Server Component. Only add `'use client'` when you need interactivity (`onClick`, `onChange`) or hooks (`useState`, `useEffect`). A common pattern is a Server Component page that renders small interactive Client Components inside it.

> **🛠 Exercise — Day 3**
> 1. Your `JobCard` component uses `onClick` on the toggle button. Does it need `'use client'`? Add the directive to the top of the file and confirm the toggle still works.
> 2. Create `app/components/StatusBadge.jsx` as a pure Server Component (no `'use client'`). It receives a `status` prop and renders a `<span>` with the status text. Confirm it has no interactivity and therefore needs no directive.
> 3. In `app/jobs/page.jsx`, temporarily remove `'use client'`. Read the exact error Next.js throws. Put the directive back. This error is one you will encounter regularly — recognising it on sight is useful.

---

## Day 4 — API Routes

### Building the /api/jobs Endpoint

API routes live in `app/api/` and are defined in files called `route.js`. You export named functions for each HTTP method:

```js
// app/api/jobs/route.js

// Hardcoded data for now — Week 3 replaces this with DB queries
const jobs = [
  { id: 1, title: 'Fix hot water system', status: 'pending',  client: 'Jane Smith' },
  { id: 2, title: 'Repair roof leak',     status: 'complete', client: 'Bob Jones' },
  { id: 3, title: 'Install downlights',   status: 'pending',  client: 'Alice Brown' },
];

// GET /api/jobs — returns all jobs
export async function GET() {
  return Response.json(jobs);
}

// POST /api/jobs — creates a new job
export async function POST(request) {
  const body = await request.json();

  // Validate — ensure required fields are present
  if (!body.title || !body.client) {
    return Response.json(
      { error: 'title and client are required' },
      { status: 400 }
    );
  }

  const newJob = {
    id: jobs.length + 1,
    title: body.title,
    client: body.client,
    status: 'pending',
  };

  jobs.push(newJob);  // In-memory only — resets on server restart
  return Response.json(newJob, { status: 201 });
}
```

> **📝 Testing your API**  
> With `npm run dev` running, visit `http://localhost:3000/api/jobs` in your browser — you should see the JSON response. For POST requests, install the **REST Client** extension in VS Code. It lets you write and fire HTTP requests directly from a `.http` file without leaving the editor.

> **🛠 Exercise — Day 4**
> 1. With `npm run dev` running, visit `http://localhost:3000/api/jobs` and confirm you see the hardcoded JSON array.
> 2. Create a file `requests.http` in your project root and test a POST request using REST Client:
>    ```http
>    POST http://localhost:3000/api/jobs
>    Content-Type: application/json
>
>    { "title": "Replace gutters", "client": "Tom Davies" }
>    ```
> 3. After posting, reload the GET URL — the new job should appear. Then restart the dev server (`Ctrl+C`, `npm run dev`) and reload. Notice the new job is gone. This in-memory limitation is exactly what Week 3 fixes.

---

## Day 5 — Connect Frontend to API

### Fetching from Your Own Route

Update your jobs page to fetch from your new API route. Because you need interactivity (state, effect), add `'use client'`:

```jsx
// app/jobs/page.jsx
'use client';

import { useState, useEffect } from 'react';
import JobCard from '@/components/JobCard';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Jobs</h1>
      <div className="grid gap-4">
        {jobs.map(job => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </main>
  );
}
```

> **📝 The spread operator**  
> `{...job}` spreads all properties of the job object as individual props. It is equivalent to writing `id={job.id} title={job.title} status={job.status} client={job.client}`. Convenient when an object's shape matches a component's props exactly.

> **🛠 Exercise — Week 2 Final Task**  
> Your app now has: a `/jobs` page that fetches from `/api/jobs`, a `/jobs/[id]` detail page, and a `JobCard` component with navigation. Add a simple form to the `/jobs` page that submits a new job via `POST` to `/api/jobs`. The form needs two inputs (title and client) and a submit button. After submission, re-fetch the job list so the new job appears. **Hint:** This form must be in a Client Component — it uses state for the input values and an `onSubmit` handler.

---

# Week 3 — PostgreSQL

> **Goal:** Persistent data with a real database.

This week replaces the in-memory hardcoded data with a real PostgreSQL database. You will write SQL to define your schema and query your data, and connect it to your Next.js API routes. By the end of the week, data will persist across server restarts.

| Day | Topic | Goal |
|-----|-------|------|
| Day 1 | PostgreSQL & SQL basics | Write `CREATE TABLE` and basic queries |
| Day 2 | Neon setup | Create a hosted DB and connect from Next.js |
| Day 3 | GET with real data | Replace hardcoded data in `GET /api/jobs` |
| Day 4 | POST, UPDATE, DELETE | Full CRUD via SQL |
| Day 5 | Environment variables | Secure credentials for local and production |

---

## Day 1 — PostgreSQL and SQL Basics

### If You Know SOQL, You Know Most of This

SOQL was modelled on SQL. The differences are mostly syntax rather than concept. The key additions are that SQL can modify data (`INSERT`, `UPDATE`, `DELETE`) and defines its own schema.

```sql
-- Create the jobs table
-- SERIAL = auto-incrementing integer (like an autonumber ID)
-- NOT NULL = required field
-- DEFAULT = value used if none is provided
CREATE TABLE jobs (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  client_name TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending',
  notes       TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- SELECT (equivalent to SOQL SELECT)
SELECT * FROM jobs;
SELECT id, title, status FROM jobs WHERE status = 'pending';
SELECT * FROM jobs ORDER BY created_at DESC;

-- INSERT (no equivalent in SOQL — SOQL is query-only)
INSERT INTO jobs (title, client_name, status)
VALUES ('Fix hot water', 'Jane Smith', 'pending');

-- UPDATE
UPDATE jobs SET status = 'complete' WHERE id = 1;

-- DELETE
DELETE FROM jobs WHERE id = 1;
```

> **💡 SQL is case-insensitive for keywords**  
> `SELECT`, `select`, and `Select` all work. Convention is uppercase keywords. Column and table names are case-sensitive in PostgreSQL when quoted, but lowercase by convention.

> **🛠 Exercise — Day 1**
> Write these queries now so you are ready to run them the moment your Neon database is up tomorrow.
> 1. Write the `CREATE TABLE` statement from memory, then check your work against the version above.
> 2. Write a `SELECT` that returns only jobs with `status = 'in_progress'`, ordered by `created_at` descending.
> 3. Write an `INSERT` that adds a job with title `'Rewire kitchen'` for client `'Sarah Lee'`.
> 4. Write an `UPDATE` that sets job `id = 3` to `status = 'complete'`.
> 5. Write a `SELECT` that returns the count of jobs for each status value (hint: `GROUP BY`).

---

## Day 2 — Neon Setup and Connection

### Creating Your Database

Neon is a serverless PostgreSQL provider with a generous free tier — ideal for development and small projects. It also integrates directly with Vercel for one-click production setup.

1. Go to [neon.tech](https://neon.tech) and sign up with your GitHub account.
2. Create a new project — name it `job-tracker`.
3. In the Neon dashboard, open the SQL Editor and paste the `CREATE TABLE` statement from Day 1. Run it.
4. Click **Connection Details** and copy the connection string — it looks like:  
   `postgresql://user:password@host/database`

### Connecting from Next.js

```bash
# Install the Neon serverless driver
npm install @neondatabase/serverless
```

```bash
# .env.local — this file is never committed to Git
# Next.js automatically loads it in development
DATABASE_URL=postgresql://user:password@host/database
```

```js
// lib/db.js — a shared database connection module
import { neon } from '@neondatabase/serverless';

// process.env reads from .env.local in development
// and from Vercel environment variables in production
const sql = neon(process.env.DATABASE_URL);

export default sql;
```

> **⚠ Never commit `.env.local`**  
> Add `.env.local` to your `.gitignore` file (it should be there by default from `create-next-app`). The `DATABASE_URL` contains your database password. If it is ever committed to a public repository, rotate the password immediately in the Neon dashboard.

> **🛠 Exercise — Day 2**
> 1. In the Neon SQL editor, run the `CREATE TABLE` statement from Day 1.
> 2. Insert at least three jobs using `INSERT` statements.
> 3. Run `SELECT * FROM jobs ORDER BY created_at DESC` and confirm your rows appear.
> 4. Run `git status` in your terminal and confirm `.env.local` does **not** appear in the tracked files list.

---

## Day 3 — Replacing Hardcoded Data

### GET /api/jobs with Real Queries

Update your API route to query the database. The Neon driver uses tagged template literals — the `` sql`` `` syntax — which automatically parameterises values, preventing SQL injection:

```js
// app/api/jobs/route.js
import sql from '@/lib/db';

export async function GET() {
  try {
    // sql`` is a tagged template literal.
    // The driver sends this as a parameterised query — no SQL injection risk.
    const jobs = await sql`
      SELECT * FROM jobs
      ORDER BY created_at DESC
    `;
    return Response.json(jobs);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
```

### GET /api/jobs/[id] — Single Record

```js
// app/api/jobs/[id]/route.js
import sql from '@/lib/db';

export async function GET(request, { params }) {
  try {
    // Variables in tagged template literals are automatically
    // escaped — no SQL injection risk
    const jobs = await sql`
      SELECT * FROM jobs WHERE id = ${params.id}
    `;

    if (jobs.length === 0) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    return Response.json(jobs[0]);
  } catch (error) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
```

> **🛠 Exercise — Day 3**
> 1. Update `GET /api/jobs` to query the database.
> 2. Insert two or three jobs manually in the Neon SQL editor.
> 3. Confirm that `http://localhost:3000/api/jobs` returns those jobs.
> 4. Confirm that `http://localhost:3000/jobs` renders them correctly.

---

## Day 4 — Full CRUD

### POST — Create a Job

```js
// Add to app/api/jobs/route.js
export async function POST(request) {
  try {
    const { title, client_name, notes } = await request.json();

    if (!title || !client_name) {
      return Response.json(
        { error: 'title and client_name are required' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO jobs (title, client_name, notes)
      VALUES (${title}, ${client_name}, ${notes})
      RETURNING *
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
```

### PATCH — Update Status

```js
// app/api/jobs/[id]/route.js — add PATCH method
export async function PATCH(request, { params }) {
  try {
    const { status } = await request.json();

    const validStatuses = ['pending', 'in_progress', 'complete'];
    if (!validStatuses.includes(status)) {
      return Response.json({ error: 'Invalid status' }, { status: 400 });
    }

    const result = await sql`
      UPDATE jobs
      SET status = ${status}
      WHERE id = ${params.id}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    return Response.json(result[0]);
  } catch (error) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
```

> **📝 `RETURNING *`**  
> The `RETURNING *` clause tells PostgreSQL to return the affected rows after the `INSERT` or `UPDATE`. Without it, the query returns nothing. This is a PostgreSQL extension — not all databases support it.

> **🛠 Exercise — Day 4**
> 1. Implement `DELETE /api/jobs/[id]`. It should delete the row and return `204 No Content` on success, or `404` if the id does not exist:
>    ```js
>    export async function DELETE(request, { params }) {
>      const result = await sql`DELETE FROM jobs WHERE id = ${params.id} RETURNING id`;
>      if (result.length === 0) return Response.json({ error: 'Not found' }, { status: 404 });
>      return new Response(null, { status: 204 });
>    }
>    ```
> 2. Add a `DELETE` request to your `requests.http` file and test it against a real job id.
> 3. Verify the row is gone by running `SELECT * FROM jobs` in the Neon SQL editor.

---

## Day 5 — Environment Variables

### Local vs Production

Environment variables keep secrets out of your codebase. Next.js has a straightforward hierarchy:

```bash
# .env.local — local development only, never committed to Git
DATABASE_URL=postgresql://...     # Your Neon database

# In production (Vercel), environment variables are set in the
# Vercel dashboard under Project → Settings → Environment Variables.
# You will set DATABASE_URL there in Week 4.

# Accessing in code:
process.env.DATABASE_URL

# IMPORTANT: Only variables prefixed with NEXT_PUBLIC_ are
# exposed to the browser. DATABASE_URL stays server-side only.
```

> **🛠 Exercise — Week 3 Final Task**
> 1. Implement `POST /api/jobs` and `PATCH /api/jobs/[id]`.
> 2. Update your frontend form to `POST` to the API.
> 3. Add a status dropdown to the job detail page that sends a `PATCH` request when changed.
> 4. Confirm that changes persist after refreshing the page — data is now in the database.

---

# Week 4 — Vercel & Production

> **Goal:** Deploy, debug, and ship.

Week 4 is about getting the application live. Vercel is purpose-built for Next.js — deployment is intentionally frictionless. The more valuable learning this week comes from the real-world issues you will encounter when running in production: missing environment variables, database connection limits, and errors that only appear outside your local machine.

| Day | Topic | Goal |
|-----|-------|------|
| Day 1 | GitHub setup | Push your project to a repository |
| Day 2 | Vercel deployment | Live URL with automatic deploys |
| Day 3 | Production environment | Set `DATABASE_URL`, fix what breaks |
| Day 4 | Tailwind polish | Make the UI presentable for a demo |
| Day 5 | Review & extend | Consolidate and add a dashboard view |

---

## Day 1 — Pushing to GitHub

### Setting Up Version Control

If you have not initialised Git already, do so now. Vercel deploys from a Git repository — this is required, not optional:

```bash
# Initialise Git in your project folder (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create a new repository on github.com, then connect it:
git remote add origin https://github.com/YOUR_USERNAME/job-tracker.git
git branch -M main
git push -u origin main
```

> **💡 Check your `.gitignore`**  
> Before pushing, confirm that `.env.local` is listed in `.gitignore`. Run `git status` — it should **not** appear in the list of tracked files. The `create-next-app` scaffold adds it automatically, but verify.

---

## Day 2 — Deploying to Vercel

### The Deployment Process

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New Project**.
3. Import your `job-tracker` repository.
4. Leave the build settings as defaults — Vercel detects Next.js automatically.
5. Do **not** add environment variables yet — click Deploy.
6. Vercel builds and deploys. You get a live URL at `job-tracker-[hash].vercel.app`.

The app will be live but broken — the database queries will fail because `DATABASE_URL` is not set in the production environment. That is Day 3's work. Seeing the app live and broken is part of the process.

### How Vercel Deployments Work

```
Git push to main branch
    ↓
Vercel detects the push via webhook
    ↓
Vercel runs: npm run build
    ↓
Build succeeds → deployed to production URL
    ↓
Old deployment kept as fallback (instant rollback available)

Pull requests → Vercel creates a unique preview URL per branch
```

> **💡 Preview deployments are powerful**  
> Every pull request on GitHub gets its own temporary URL. This means you can share a working version of a feature for review before merging it. For proof-of-concept work, this is extremely useful — send a client a preview URL without touching the main deployment.

---

## Day 3 — Production Environment Variables

### Connecting the Production Database

You have two options:

- **Option A (recommended for POC):** Use the same Neon database as development.
- **Option B:** Create a separate Neon project for production and use its connection string.

Steps:
1. In Vercel, go to your project → **Settings** → **Environment Variables**.
2. Add `DATABASE_URL` → paste your Neon connection string → Save.
3. Go to **Deployments** → click the three-dot menu on the latest deployment → **Redeploy**.
4. Visit the live URL. Jobs should now load from the database.

### Reading Vercel Deployment Logs

When things break in production, the first place to look is the Function Logs:

- Vercel Dashboard → your project → **Logs** tab
- Filter by `Error` to see only failures
- Each API route call is logged — you can see the exact error message and stack trace

> **⚠ Connection pool limits**  
> Serverless environments create a new database connection per request. Neon's free tier has connection limits. If you hit "too many connections" errors, switch to Neon's pooler endpoint — find it in the Neon dashboard under **Connection Details** → **Connection pooling**.

---

## Day 4 — Tailwind CSS: Making It Presentable

### Tailwind Basics

Tailwind is a utility-first CSS framework. Instead of writing CSS files, you apply pre-built classes directly in your JSX. It comes pre-configured with `create-next-app`:

```jsx
// Without Tailwind — unstyled
function JobCard({ title, status, client }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{client}</p>
      <span>{status}</span>
    </div>
  );
}

// With Tailwind utility classes
function JobCard({ title, status, client }) {
  const statusColour = status === 'complete'
    ? 'bg-green-100 text-green-800'
    : 'bg-yellow-100 text-yellow-800';

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-gray-500 text-sm mb-3">{client}</p>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColour}`}>
        {status}
      </span>
    </div>
  );
}
```

> **📝 Reading Tailwind classes**  
> The classes follow a consistent pattern: `p-4` = padding 1rem, `mb-3` = margin-bottom 0.75rem, `text-lg` = font-size large, `rounded-lg` = border-radius large, `bg-green-100` = green background at 10% shade. The [Tailwind docs](https://tailwindcss.com/docs) are searchable and exhaustive.

### A Basic Page Layout

```jsx
export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">Job Tracker</h1>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">All Jobs</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + New Job
          </button>
        </div>
        {/* Job list here */}
      </main>
    </div>
  );
}
```

> **🛠 Exercise — Day 4**
> 1. Apply Tailwind classes to your `JobCard` component to match the styled version above — border, padding, shadow, and status badge.
> 2. Apply the page layout above to `app/jobs/page.jsx` — header, max-width container, and the "New Job" button placement.
> 3. Open DevTools and switch to a mobile viewport (or narrow your browser window). Change `grid-cols-4` in `StatsBar` to `grid-cols-2 sm:grid-cols-4` so the stats stack neatly on small screens.
> 4. Push to GitHub — Vercel should deploy the updated styles automatically. Confirm on the live URL.

---

## Day 5 — Dashboard and Consolidation

### Adding a Summary Dashboard

A dashboard view puts the application in genuine proof-of-concept territory. A counts summary by status is achievable with one SQL query:

```js
// app/api/stats/route.js
import sql from '@/lib/db';

export async function GET() {
  try {
    const stats = await sql`
      SELECT
        COUNT(*) FILTER (WHERE status = 'pending')     AS pending,
        COUNT(*) FILTER (WHERE status = 'in_progress') AS in_progress,
        COUNT(*) FILTER (WHERE status = 'complete')    AS complete,
        COUNT(*)                                        AS total
      FROM jobs
    `;
    return Response.json(stats[0]);
  } catch (error) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
```

```jsx
// components/StatsBar.jsx
'use client';

import { useEffect, useState } from 'react';

export default function StatsBar() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(setStats);
  }, []);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {[
        { label: 'Total',       value: stats.total,       colour: 'blue' },
        { label: 'Pending',     value: stats.pending,     colour: 'yellow' },
        { label: 'In Progress', value: stats.in_progress, colour: 'purple' },
        { label: 'Complete',    value: stats.complete,    colour: 'green' },
      ].map(({ label, value, colour }) => (
        <div key={label} className={`bg-${colour}-50 border border-${colour}-200 rounded-lg p-4`}>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}
```

> **🛠 Exercise — Week 4 Final Task**
> 1. Add the `StatsBar` component to your `/jobs` page above the job list.
> 2. Confirm the counts update when you add a new job or change a status.
> 3. Push to GitHub — Vercel deploys automatically.
> 4. Share the live URL. You have a full-stack application.

---

# Appendix A: Quick Reference Cheat Sheets

## JavaScript

```js
// Variables
const x = 1;                      // immutable binding
let y = 2;                         // mutable binding

// Arrow functions
const add = (a, b) => a + b;
const greet = (name) => { return 'Hello ' + name; };

// Template literals
const msg = `Hello ${name}, you have ${count} jobs`;

// Destructuring
const { title, status } = job;
const [first, ...rest] = array;

// Spread operator
const newArray = [...existingArray, newItem];
const newObj = { ...existingObj, updatedKey: newValue };

// Optional chaining (safe property access)
const city = user?.address?.city;  // undefined if any step is null/undefined

// Nullish coalescing
const label = status ?? 'unknown'; // 'unknown' if status is null or undefined

// Async/await
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
```

## React

```jsx
// Component with props
function Card({ title, subtitle }) {
  return <div><h2>{title}</h2><p>{subtitle}</p></div>;
}

// State
const [value, setValue] = useState('');
setValue('new value');

// Effect on mount
useEffect(() => { /* runs once */ }, []);

// Effect when dependency changes
useEffect(() => { /* runs when id changes */ }, [id]);

// Conditional rendering
if (loading) return <p>Loading...</p>;
{error && <p className="text-red-500">{error}</p>}
{items.length > 0 ? <List items={items} /> : <p>No items</p>}

// List rendering
{items.map(item => <Card key={item.id} {...item} />)}

// Event handlers
<button onClick={() => handleClick(id)}>Click</button>
<input value={text} onChange={(e) => setText(e.target.value)} />
<form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
```

## Next.js

```jsx
// Server Component (default) — can use async/await directly
export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}

// Client Component — add 'use client' for hooks and events
'use client';
export default function InteractivePage() { ... }

// API Route
export async function GET() { return Response.json(data); }
export async function POST(request) {
  const body = await request.json();
  return Response.json(result, { status: 201 });
}

// Dynamic route params
export async function GET(request, { params }) {
  const { id } = params;
}

// Navigation
import Link from 'next/link';
<Link href={`/jobs/${id}`}>View</Link>

// Programmatic navigation
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/jobs');
```

## PostgreSQL

```sql
-- Create table
CREATE TABLE jobs (id SERIAL PRIMARY KEY, title TEXT NOT NULL, ...);

-- Select
SELECT * FROM jobs;
SELECT id, title FROM jobs WHERE status = 'pending';
SELECT * FROM jobs ORDER BY created_at DESC LIMIT 10;

-- Insert
INSERT INTO jobs (title, client_name) VALUES ('Fix pipe', 'Bob');
INSERT INTO jobs (title, client_name) VALUES ('Fix pipe', 'Bob') RETURNING *;

-- Update
UPDATE jobs SET status = 'complete' WHERE id = 1 RETURNING *;

-- Delete
DELETE FROM jobs WHERE id = 1;

-- Aggregate
SELECT COUNT(*) FROM jobs;
SELECT status, COUNT(*) FROM jobs GROUP BY status;
SELECT COUNT(*) FILTER (WHERE status = 'pending') AS pending FROM jobs;
```

---

# Appendix B: Recommended Resources

## Official Documentation

- **React** — [react.dev/learn](https://react.dev/learn) — the official tutorial is genuinely excellent
- **Next.js** — [nextjs.org/docs](https://nextjs.org/docs) — App Router section; [nextjs.org/learn](https://nextjs.org/learn) for a project-based course
- **PostgreSQL** — [postgresql.org/docs](https://postgresql.org/docs) and [postgresqltutorial.com](https://postgresqltutorial.com)
- **Neon** — [neon.tech/docs/guides/nextjs](https://neon.tech/docs/guides/nextjs) — covers the exact setup in this guide
- **Vercel** — [vercel.com/docs/frameworks/nextjs](https://vercel.com/docs/frameworks/nextjs)
- **Tailwind** — [tailwindcss.com/docs](https://tailwindcss.com/docs) — use the search, it is fast

## Supplementary Learning

- **[javascript.info](https://javascript.info)** — the best free JavaScript reference; use it to look up anything in this guide that needs more depth
- **[Josh W. Comeau's blog](https://joshwcomeau.com)** — exceptionally clear explanations of React concepts
- **[Fireship on YouTube](https://www.youtube.com/@Fireship)** — short, dense explainers on web technology; the "100 seconds" series gives fast context on any tool

## VS Code Extensions to Install

- **ESLint** — catches errors as you type
- **Prettier** — auto-formats your code on save
- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **REST Client** — fire HTTP requests to your API routes from inside VS Code

## Browser DevTools

Press `F12` → **Network tab** to see every API call your app makes, including request and response bodies. This is indispensable for debugging — if your frontend isn't getting what it expects, the Network tab tells you exactly what the server returned.

---

# Appendix C: Apex-to-JavaScript Reference

| Concept | Apex | JavaScript / React |
|---------|------|--------------------|
| Variable (immutable) | `final String x = 'a';` | `const x = 'a';` |
| Variable (mutable) | `String x = 'a';` | `let x = 'a';` |
| Null check | `if (x != null)` | `if (x !== null)` or `if (x)` |
| String interpolation | `'Hello ' + name` | `` `Hello ${name}` `` |
| List iteration | `for (String s : list)` | `array.map(s => ...)` |
| List filter | Manual loop | `array.filter(s => condition)` |
| Async operation | `Future` / `Queueable` | `async/await` |
| Error handling | `try/catch` | `try/catch` (identical) |
| Object / Map | `Map<String, Object>` | `const obj = { key: value }` |
| HTTP response | `RestResponse` | `Response.json(data)` |
| Environment config | Named Credentials | `process.env.VAR_NAME` |
| UI components | LWC | React components |
| Data binding | Reactive property | `useState` hook |
| Lifecycle on load | `connectedCallback` / `@wire` | `useEffect` with `[]` |
