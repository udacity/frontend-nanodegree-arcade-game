let string = 'orange'; // Immutable primative

function changeToApple(string) {
  string = 'apple';
}

changeToApple(string);

console.log(string);

// Instantiate object from exsiting object (pass object by reference)
const oven = {
  type: 'clay',
  temperature: 400
};

const newOven = oven;
newOven.temperature += 50;

console.log(oven.temperature); // Original object is updated
