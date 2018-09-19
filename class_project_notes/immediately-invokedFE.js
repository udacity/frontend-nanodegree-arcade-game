// Immediately-Invoked Function Expressions: Structure and Syntax
//
// An immediately-invoked function expression, or IIFE (pronounced iffy),
// is a function that is called immediately after it is defined.

(function sayHi(){
    alert('Hi there!');
  }
)();

// alerts 'Hi there!'


(function (name){
    alert(`Hi, ${name}`);
  }
)('Andrew');

// alerts 'Hi, Andrew'


(function (x, y){
    console.log(x * y);
  }
)(2, 3);



// 💡 Alternative Syntax for IIFE's 💡
// The entire expression is wrapped in the main/first set of parantheses.
(function sayHi(){
   alert('Hi there!');
}());

// alerts 'Hi there!'
