const button = document.getElementById('button');

button.addEventListener('click', (function() {
  let count = 0;

  return function() {
    count += 1;

    if (count === 2) {
      alert('This alert appears every other press!');
      count = 0;
    }
  };
})());

// Function Declarations vs. Function Expressions
// https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/

//An Introduction to IIFEs - Immediately Invoked Function Expressions on A Drip of JavaScript
// http://adripofjavascript.com/blog/drips/an-introduction-to-iffes-immediately-invoked-function-expressions.html

// Immediately-Invoked Function Expression (IIFE) by Ben Alman
// http://benalman.com/news/2010/11/immediately-invoked-function-expression/
