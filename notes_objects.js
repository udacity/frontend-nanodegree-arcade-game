let string = 'orange'; // Immutable primative

function changeToApple(string) {
  string = 'apple'; // Only in function scope
}

changeToApple(string);

console.log(string); // Variable has not been updated

// Instantiate object from exsiting object (pass object by reference)
const oven = {
  type: 'clay',
  temperature: 400
};

const newOven = oven;
newOven.temperature += 50;

console.log(oven.temperature); // Original object is updated


/*
*   The 'delete' operator on MDN
*   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
*/


// Calling Methods

const developer = {
  name: 'Andrew',
  sayHello: function () {
    console.log('Hi there, ' + this.name + '!'); // Using this keyword
  }
};

const bell = {
  color: 'gold',
  ring: function () {
    console.log('Ring ring ring!');
  }
};

developer.sayHello();
bell.ring();

// Passing arguments into Methods

const another_developer = {
  name: 'Andrew',
  sayHello: function () {
    console.log('Hi there!');
  },
  favoriteLanguage: function (language) {
    console.log(`My favorite programming language is ${language}`);
  }
};

another_developer.favoriteLanguage('JavaScript');


// Calling a method inside an array
const myArray = [ function alerter() { console.log('Hello!'); } ]; // alert('Hello!'); did NOT work in Atom console :-/

myArray[0]();


// Using a method to change the object
const tree = {
  type: 'redwood',
  leaves: 'green',
  height: 80,
  age: 15,
  growOneFoot: function () {
    this.height += 1;
  }
};

tree.growOneFoot();
console.log(tree.height);