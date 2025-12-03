class Person {
  constructor(name, age, department) {
    this.name = name;
    this.age = age;
    this.department = department;
  }

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, age, id, department) {
    super(name, age, department);
    this.id = id;
  }
}

class Teacher extends Person {
  constructor(name, age, department, subject) {
    super(name, age, department);
    this.subject = subject;
  }
}

const p1 = new Student("John", 20, "S123", "Computer Science");
const p2 = new Teacher("Ms. Smith", 35, "CSE", "Algorithms");

p1.greet();
console.log(p1);

p2.greet();
console.log(p2);

const p3 = new Teacher("Mr. Brown", 45, "Math", ["Calculus", "Algebra"]);
p3.greet();
console.log(p3);

const p4_subjects = [
  "Quantum Mechanics",
  "Thermodynamics",
  "Optics",
  "Electromagnetism",
];
const p4 = new Teacher("Dr. Green", 50, "Physics", p4_subjects);
p4.greet();
console.log(p4);
