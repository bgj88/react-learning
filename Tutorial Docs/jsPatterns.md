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
