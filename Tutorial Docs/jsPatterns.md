# JS Patterns & Aha Moments

Patterns, gotchas, and mental model shifts coming from Apex.

---

## Arrays and Map — not what you expect from Apex

In Apex, if you split a string you get a `List<String>`, and `Map` is a key-value data structure. In JavaScript these concepts are separate and the naming is confusing at first.

`.split()` returns an **array** directly — no separate container needed:

```js
let name = 'Jane Smith';
name = name.split(' ');
console.log(name);    // ['Jane', 'Smith']
console.log(name[0]); // 'Jane'
console.log(name[1]); // 'Smith'
```

`.map()` is **not** a data structure — it is a method that transforms every item in an array and returns a new array:

```js
const names = ['Jane', 'Smith'];
const upper = names.map((name) => name.toUpperCase());
// ['JANE', 'SMITH']
```

| Apex | JavaScript |
|------|------------|
| `String.split()` → `List<String>` | `.split()` → array `[]` |
| `Map<String, Object>` | `{}` plain object, or `new Map()` |
| `List` loop / `forEach` | `.map()`, `.filter()`, `.forEach()` |

---

## Pure functions — transform input, return output

In Apex it is common to pass a variable into a method, mutate it inside, and read the changed value afterwards. In JavaScript (and especially React) the preferred pattern is a **pure function**: take input, return a transformed version, no side effects.

```js
// Do this
function formatStatus(status) {
    return status.toUpperCase();
}
const result = formatStatus('pending'); // 'PENDING'

// Not this — mutating inside the function only changes the local copy
function formatStatus(status) {
    status = status.toUpperCase(); // outer variable unchanged
}
```

The function does not need to know what variable is passed in — it is agnostic. The same function works on any string:

```js
console.log(formatStatus('pending'));  // 'PENDING'
console.log(formatStatus('complete')); // 'COMPLETE'
console.log(formatStatus(anyString));  // works on anything
```

This matters a lot in React — mutating variables directly instead of using return values is one of the most common sources of bugs.

---

## Type-checking arrays (Apex `List<String>` equivalent)

Plain JS arrays enforce nothing — `const initials = []; initials.push(42);` is perfectly legal even if every other value is a string. To get Apex-`List<String>`-like defensiveness, options range from manual to full type systems:

**Runtime check (only catches it when the code actually runs):**

```js
function pushString(array, value) {
  if (typeof value !== 'string') {
    throw new TypeError('Expected a string');
  }
  array.push(value);
}
```

**`// @ts-check` + JSDoc `@type` (catches it in the editor, no build step):**

```js
// @ts-check

/** @type {string[]} */
const initials = [];

initials.push('J');   // fine
initials.push(42);    // VS Code flags this as a type error
```

**Important:** the `@type` comment is purely *positional* — it applies only to the declaration immediately following it, not to every array in the file. Each array that needs checking needs its own comment directly above it, with nothing in between:

```js
/** @type {string[]} */
const initials = [];

/** @type {number[]} */
const scores = [];

const untyped = []; // no comment above it — no protection
```

**Full TypeScript** (`.ts` file) gives the same protection without JSDoc, at the cost of needing a compile step:

```ts
const initials: string[] = [];
initials.push(42); // compile error
```

| Apex | JavaScript |
|------|------------|
| `List<String>` (type-safe at compile time) | Plain array — no protection by default |
| — | Runtime `typeof` check before `.push()` |
| — | `// @ts-check` + `/** @type {string[]} */` (editor-time check on a `.js` file) |
| — | TypeScript `.ts` file with `: string[]` (compile-time check) |

---

## Terminology: passing functions into functions (`.map()` and friends)

Apex doesn't have a clean equivalent for this — it's a different paradigm, not just different naming.

- **`.map()` itself** — a **method** (same word as Apex; a function attached to an object, here the Array prototype), and specifically a **higher-order function**: a function that takes another function as an argument (or returns one).
- **The function passed into it** (e.g. `word => word[0]`) — a **callback function** (or just **callback**): a function handed to another function, to be *called back* by that function later, rather than called directly by you.
- **Why this is possible at all** — JavaScript functions are **first-class citizens** (first-class values). A function can be assigned to a variable, stored in an array, passed as an argument, or returned from another function — exactly like a string or number. There's no separate restricted category for "callable things."

```js
const double = (x) => x * 2;      // a function, stored in a variable like any other value

function applyTwice(fn, value) {  // "fn" is a parameter whose value happens to be a function
  return fn(fn(value));
}

console.log(applyTwice(double, 5)); // 20 — double(double(5))
```

`values.map(someFunction)` isn't "call this function" — it's "here is a function *as data*; call it yourself, once per element, whenever you're ready."

| Concept | Term |
|---|---|
| `.map()` | method / higher-order function |
| `word => word[0]` passed into `.map()` | callback function |
| Functions behaving like any other value (assignable, passable, returnable) | first-class citizens / first-class functions |

---

## Filter on one attribute, return another — order matters

`.filter()` and `.map()` can each only see what they're given. To filter on one attribute (e.g. `status`) but return a different one (e.g. `title`), **filter first while you still have the full object**, then **map second** to extract just the field you want:

```js
let pendingJob = projectJobs
  .filter((job) => job.status.includes('Pending'))  // decide, using the full object
  .map((job) => job.title);                          // extract, from the filtered results
```

Written explicitly with a loop and an `if`, for readability:

```js
function getPendingJobTitles(jobs) {
  const pendingTitles = [];

  for (const job of jobs) {
    if (job.status.includes('Pending')) {   // filter step
      pendingTitles.push(job.title);        // map step
    }
  }

  return pendingTitles;
}
```

Mental model: filter always goes first, because it needs the whole object to make its decision; once filtered, map is free to shrink each item down to just the one attribute you actually want.

`.includes()` does a substring match (`'Pending Review'` would also match) — use `job.status === 'Pending'` for an exact match instead.

---

## Looping without an index — `for...of` (Apex's colon-loop equivalent)

Apex's `for (String job : jobs)` maps directly onto JavaScript's `for...of` — no index variable, no `.length`, no `jobs[i]`:

```js
// Apex
for (Job job : jobs) {
    if (job.status.contains('Pending')) {
        pendingTitles.add(job.title);
    }
}

// JavaScript
for (const job of jobs) {
  if (job.status.includes('Pending')) {
    pendingTitles.push(job.title);
  }
}
```

**Trap:** `for...in` looks similar but is a *different* loop — it iterates over **keys/indices**, not values. On an array it yields `'0', '1', '2'` (as strings), not the actual elements. For arrays/lists, `for...of` is almost always what you want.

| Apex | JavaScript |
|------|------------|
| `for (String job : jobs)` | `for (const job of jobs)` |
| index-based `for (Integer i = 0; i < jobs.size(); i++)` | `for (let i = 0; i < jobs.length; i++)` (rarely needed unless you need the index) |
| — (no equivalent commonly used) | `for...in` — iterates keys/indices, not values; avoid for arrays |

---

## Where does state live? — per-item vs per-collection

When a list of components is built from `.map()`, it's easy to lose track of which piece of state belongs where. The rule: **state lives at the level of the thing it describes.**

- **Per-item state** — a property of *one* instance (e.g. "is this job pending or complete") → lives inside the item component itself. Each instance manages its own copy independently.
- **Per-collection state** — a property of the *list as a whole* (e.g. "what jobs exist", "have we finished loading them") → lives inside the component that owns the `.map()`. An individual item component has no way to hold "the whole list" — it only ever knows the one item it was handed via props.

```jsx
// Per-collection state — lives where the .map() lives
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setJobs(hardCodedJobsArray);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return jobs.map((job) => (
    <JobCard key={job.id} title={job.title} status={job.status} client={job.client} />
  ));
}

// Per-item state — lives inside the item component
function JobCard({ title, status: initialStatus, client }) {
  const [status, setStatus] = useState(initialStatus); // this card's own toggle
  return (/* ... */);
}
```

The two never conflict — they're just state describing different-sized things, sitting at different levels of the component tree.

| Apex/LWC | JavaScript / React |
|---|---|
| Controller/parent holds the queried `List<Job>` | Parent component holds `jobs` array in `useState` |
| Each `c-job-item` element manages its own local `@track` property | Each `JobCard` manages its own local `useState` |
| `@wire`/`connectedCallback` loads the collection once | `useEffect(() => {...}, [])` on the parent loads the collection once |

---
