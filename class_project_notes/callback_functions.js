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


// map()
const names = ['David', 'Richard', 'Veronika', 'Stephanie'];
const nameLengths = names.map(function(name) {
    return name.length;
});

console.log(nameLengths);

// From Callbacks quiz
/* Using map()
 *
 * Using the musicData array and map():
 *   - Return a string for each item in the array in the following format:
 *     <album-name> by <artist> sold <sales> copies
 *   - Store the returned data in a new albumSalesStrings variable
 *
 * Note:
 *   - Do not delete the musicData variable
 *   - Do not alter any of the musicData content
 *   - Do not format the sales number; leave it as a long string of digits
 */

const musicData = [
    { artist: 'Adele', name: '25', sales: 1731000 },
    { artist: 'Drake', name: 'Views', sales: 1608000 },
    { artist: 'Beyonce', name: 'Lemonade', sales: 1554000 },
    { artist: 'Chris Stapleton', name: 'Traveller', sales: 1085000 },
    { artist: 'Pentatonix', name: 'A Pentatonix Christmas', sales: 904000 },
    { artist: 'Original Broadway Cast Recording',
      name: 'Hamilton: An American Musical', sales: 820000 },
    { artist: 'Twenty One Pilots', name: 'Blurryface', sales: 738000 },
    { artist: 'Prince', name: 'The Very Best of Prince', sales: 668000 },
    { artist: 'Rihanna', name: 'Anti', sales: 603000 },
    { artist: 'Justin Bieber', name: 'Purpose', sales: 554000 }
];

const albumSalesStrings = musicData.map(function(album) {
    return album.name + " by " + album.artist + " sold " + album.sales + " copies";
});

console.log(albumSalesStrings);
