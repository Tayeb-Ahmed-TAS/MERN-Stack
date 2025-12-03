const student = {
  name: "Shradha",
  age: 23,
  eng: 23,
  math: 93,
  phy: 97,
  getAvg() {
    let avg = (this.eng + this.math + this.phy) / 3;

    return `${this.name} got average marks = ${avg}`;
  },
};

console.log(student.getAvg());
