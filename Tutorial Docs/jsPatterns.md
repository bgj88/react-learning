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
