const myNewFancyObject = new Object();

    Object.keys(myNewFancyObject); // empty as object has no keys
    Object.values(myNewFancyObject); // empty as object has no keys or values

const dictionary = {
  car: 'automobile',
  apple: 'healthy snack',
  cat: 'cute furry animal',
  dog: 'best friend',
  mouse: 2
};

let dictionary_values = Object.values(dictionary); // new array of Oject.values

const result = [];
for (const name in dictionary) {
    result.push(name)
}

console.log(dictionary_values);
console.log(result);

const triangle = {
  type: 'polygon',
  sides: 3,
  sumOfAngles: 180,
  equilateral: true,
  equiangular: true
};

let triangle_keys = Object.keys(triangle);
console.log(triangle_keys);

/*
*
*    Object.keys() returns an array of a given object's own keys (property names).
*    Object.values() returns an array of a given object's own values (property values).
*
*
*    Object.keys() on MDN
*    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
*
*    Object.values() on MDN
*    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
*
*    Browser Compatibility
*    http://tokenposts.blogspot.com.au/2012/04/javascript-objectkeys-browser.html
*
*/


//    JavaScript: The Good Parts by Douglas Crockford: http://javascript.crockford.com/
//    JavaScript: The Good Parts via Goodreads: https://www.goodreads.com/book/show/2998152-javascript
