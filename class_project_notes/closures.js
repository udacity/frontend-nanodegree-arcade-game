// What is the output of result(10); ?

function outerFunction() {
  let num1 = 5;

  return function(num2) {
    console.log(num1 + num2);
  };
}

let result = outerFunction();

result(10);


/*

Declare a function named `expandArray()` that:

* Takes no arguments
* Contains a single local variable, `myArray`, which points to [1, 1, 1]
* Returns an anonymous function that directly modifies `myArray` by
  appending another `1` into it
* The returned function then returns the value of `myArray`

*/

function expandArray() {
    let myArray = [1, 1, 1];

    return function() {
        myArray.push(1);

        return myArray;
    }
}

let array = expandArray();
console.log(array());


//  💡 Summary, Closures 💡

// A closure refers to the combination of a function and the lexical environment
// in which that function was declared. Every time a function is defined,
// closure is created for that function.

// Closures on MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
