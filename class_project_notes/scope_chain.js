// Scope Chain

/* Whenever your code attempts to access a variable during a function call,
* the JavaScript interpreter will always start off by looking within
* its own local variables. If the variable isn't found, the search will continue
* looking up what is called the scope chain. Let's take a look at an example:
*/

function one() {
  two();
  function two() {
    three();
    function three() {
      // function three's code here
    }
  }
}

one(); // one() calls two() calls three()


const symbol = '¥';

function displayPrice(price) {
  const symbol = '$';
  console.log(symbol + price);
}

displayPrice('80');

// ---

let n = 8;

function functionOne() {
  let n = 9;

  function functionTwo() {
    let n = 10;
    console.log(n);  // First log
  }

  functionTwo();

  console.log(n);  // Second log
}

functionOne();

console.log(n);  // Third log
