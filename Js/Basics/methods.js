let calculator = {
  num: 55,

  add: function (num1, num2) {
    return num1 + num2;
  },

  sub: function (num1, num2) {
    return num1 - num2;
  },

  mul: function (num1, num2) {
    return num1 * num2;
  },
};

console.log(calculator.sub(calculator.num, 5));
console.log(calculator.add(calculator.num, 50));
console.log(calculator.mul(9, 2));
