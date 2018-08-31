// A function that takes other functions as arguments (and/or returns a function,
// as we learned in the previous section) is known as a higher-order function.
// A function that is passed as an argument into another function is called a callback function.

// Example callback function use
function each(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      console.log(array[i]);
    }
  }
}

function isPositive(n) {
  return n > 0;
};

console.log('Positive Numbers: ');
each([-2, 7, 11, -4, -10], isPositive); // Output: 7, 11


// Array Methods - function passed in forEach() loops
console.log('Odd Numbers:');
[1, 5, 2, 4, 6, 3].forEach(function (n) { // anonymous function
  if (n % 2 !== 0) {
    console.log(n);
  }
});

[1, 5, 2, 4, 6, 3].forEach(function logIfOdd(n) { // named function
  if (n % 2 !== 0) {
    console.log(n);
  }
});

function ifOdd(n) {
    if (n % 2 !== 0) {
        console.log(n);
    }
};

console.log('More odd numbers...'); // previously defined function passed in forEach()
[1, 3, 5, 4, 6, 2, 0].forEach(ifOdd);
