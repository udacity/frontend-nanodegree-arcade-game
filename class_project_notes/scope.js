const myName = 'Andrew'; // Global variable

function introduceMyself() {
    const you = 'student'; // Parent function variable

    function introduce() {
        // Child function has access to Global and Parent variables
        console.log(`Hello, ${you}, I am ${myName}!`);
    }

    return introduce();
}

introduceMyself();


/*
* Example (way simplified) of scope in nested (Parent/Child) variables
*
* Because JavaScript is function-scoped, a function has access to all it's own
* variables as well as all the global variables outside of it.
*/

const num1 = 5;

function functionOne() {
  const num2 = 10;

  function functionTwo(num3) {
    const num4 = 35;

    return num1 + num2 + num3 + num4;
  }

  return functionTwo(0);
}

console.log(functionOne()); // functionTwo has access to all the variables



//    💡 Block-Scoping 💡

/*    ES6 syntax allows for additional scope while declaring variables with the
* let and const keywords. These keywords are used to declare block-scoped
* variables in JavaScript, and largely replace the need for var.
*
*   From MDN:
*   - let
*    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
*
*    -const
*    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
*/
