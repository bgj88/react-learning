// node "Tutorial Docs\scratch.js"

let getInitials = (name) => name.split(' ').map(word => word[0]).join();

let jane = 'Jane Sarah Eva Smith';

//-----

let initials = getInitials(jane);

console.log(initials);
