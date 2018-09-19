// JavaScript functions can:
//
//     1. Be stored in variables
//     2. Be returned from a function.
//     3. Be passed as arguments into another function.


// A function stred as a variable
const returnsAFunction = function() {
    return function () {
        console.log('Hello from inside a function!');
    };
}

// Store and call the function
const newFunction = returnsAFunction();
newFunction();

// Call the outer and inner functions in one statement
returnsAFunction()();

// Tested all the code below in FireFox console :-)
// A function returning another functions
function alertThenReturn() {
  alert('Message 1!');

  return function () {
    alert('Message 2!');
  };
}

// We can assign this returned funciton to a variable
const returnedFunction = alertThenReturn();

// And, then we can execute the returned function
returnedFunction();

// Call the outside and innder function together
alertThenReturn()();

/*

Declare a function named `higherOrderFunction` that takes no arguments,
and returns an anonymous function.

The returned function itself takes no arguments as well, and simply
returns the number 8.

*/

const higherOrderFunction = function () {
    return function () {
        return 8;
    }
}
