/*

Create an object called `chameleon` with two properties:

1. `color`, whose value is initially set to 'green' or 'pink'
2. `changeColor`, a function which changes `chameleon`'s `color` to 'pink'
    if it is 'green', or to 'green' if it is 'pink'

*/

const chameleon = {
    color: 'green',
    changeColor: function () {
        if (this.color == 'green') {
            this.color = 'pink';
          }
        else {
            this.color = 'green';
            }
    }
};

console.log(chameleon.color);
chameleon.changeColor();
console.log(chameleon.color);
chameleon.changeColor();
console.log(chameleon.color);

/*
*   Defining Methods on MDN
*   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Defining_methods
*
*   "this" in Methods
*   https://javascript.info/object-methods#this-in-methods
*/ 