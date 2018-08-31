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

each([-2, 7, 11, -4, -10], isPositive); // Output: 7, 11


// Array Methods