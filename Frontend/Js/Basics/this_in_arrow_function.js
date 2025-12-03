let students = {
  name: "John",
  marks: 95,
  prop: this, // Global Scope
  getName: function () {
    console.log(this); // Object Scope
    return this.name; // Object Scope
  },
  getMarks: () => {
    console.log(this); // Parent's Scope ( Parent is Global Scope here ) -> window
    return this.marks; // Parent's Scope ( Parent is Global Scope here ) -> window.marks
  },
  getInfo1: function () {
    setTimeout(() => {
      console.log(this); // Object Scope
    }, 2000);
  },
  getInfo2: function () {
    setTimeout(function () {
      console.log(this); // Global Scope
    }, 2000);
  },
};

console.log("Normal Function ......");

console.log(students.getName()); // John

console.log("Arrow Function ......");

console.log(students.getMarks()); // undefined

students.getInfo1(); // {name: 'John', marks: 95, prop: Window, getName: ƒ, getMarks: ƒ, …}

students.getInfo2(); // Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
