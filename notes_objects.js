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
    console.log('Hi there, ' + this.name + '!');
  }
};


developer.sayHello();

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
