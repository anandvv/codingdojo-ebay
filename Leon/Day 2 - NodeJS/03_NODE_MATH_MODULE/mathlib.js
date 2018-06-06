module.exports = function (){
  return {
    add: function(num1, num2) {
        return num1 + num2;
    },
    multiply: function(num1, num2) {
         return num1 * num2;
    },
    square: function(num) {
         return Math.pow(num, 2);
    },
    random: function(num1, num2) {
         return Math.floor(Math.random() * num2) + num1;
    }
  }
};
