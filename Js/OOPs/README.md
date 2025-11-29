# OOPs Concepts in JavaScript

To Structure our code.

## 1. Object Prototypes

**Prototypes** are the mechanism by which JavaScript objects inherit features from one another.

It is like a single **template object** that all objects inherit methods and properties from without having their own copy.

### 1.1 Accessing Prototype

- `arrr.__proto__` (reference)

- `Array.prototype` (actual object)

- `String.prototype` (actual object of String)

### 1.2 Example of adding a method to the Array prototype

```javascript
let arr = [1, 2, 3, 4, 5];

arr.sayHello = () => {
  console.log("Hello ! Good Morning");
};
```

Now, if we call `arr.sayHello()`, it will log `Hello ! Good Morning`.

> Here if we create another array, it will not have the `sayHello` method because we added it to a specific array instance. We need to add it to the Array prototype to make it available to all array instances.

```javascript
Array.prototype.sayHello = () => {
  console.log("Hello ! Good Morning from Array Prototype");
};
```

Now, if we create any array and call `sayHello()`, it will work.

```javascript
let newArr = [10, 20, 30];
newArr.sayHello(); // Logs: Hello ! Good Morning from Array Prototype
```

---

## 2. Factory Functions

> **Note:** Less commonly used in modern JavaScript due to the introduction of classes.

A function that creates objects.

```javascript
function createPerson(name, age) {
  const person = {
    name: name,
    age: age,
    greet() {
      console.log(`Hi, I'm ${this.name}`);
    },
  };
  return person;
}

let person1 = createPerson("Alice", 30);
person1.greet(); // Hi, I'm Alice

let person2 = createPerson("Bob", 25);
person2.greet(); // Hi, I'm Bob
```

Here, `createPerson` is a factory function that returns a new person object each time it is called.

```Output
Hi, I'm Alice
Hi, I'm Bob
```

---

## 3. Constructors

- It starts with a capital letter.

- It doesn't return anything.

- It uses the `this` keyword to set properties and methods.

### 3.1 `new` Operator

The `new` operator lets developers create an instance of a user-defined object typw or of one of the vuilt-in object types that has a constructor function.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log(`Hi, I'm ${this.name}`);
};

let person1 = new Person("Charlie", 28);
person1.greet(); // Hi, I'm Charlie

let person2 = new Person("Diana", 22);
person2.greet(); // Hi, I'm Diana

console.log(person2.age); // 22
```

[more about new operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)

---

## 4. Classes

> **Note:** Classes are best to use in modern JavaScript for OOPs.

**Classes** are a **template** for creating objects.

The **constructor** method is a special method for creating and initializing an object instance of that class.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

let person1 = new Person("Maria", 35);
person1.greet(); // Hi, I'm Maria

let person2 = new Person("John", 40);
person2.greet(); // Hi, I'm John

console.log(person1.age); // 35
```

---

## 5. Inheritance

**Inheritance** is a mechanism that allows us to create new classes on the basis of already exixting classes.

### Structure

```javascript
class Parent {
  constructor(para1, para2) {
    // parent class code
  }
}

class Child extends Parent {
  constructor(para1, para2, para3) {
    super(para1, para2);
    // child class code
  }
}
```

> Here, `Child` class inherits properties and methods from the `Parent` class using the `extends` keyword.

### Example

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, age, marks) {
    super(name, age);
    this.marks = marks;
  }
}

class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }
}

let student1 = new Student("Alice", 20, 95);
student1.greet(); // Hi, I'm Alice

let teacher1 = new Teacher("Mr. Smith", 45, "Mathematics");
console.log(teacher1.subject); // Mathematics
```

---
