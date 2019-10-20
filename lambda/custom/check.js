// Populate list of alphabets
function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}
const letter = genCharArray('a', 'z');

var rand_letter = letter[Math.floor(Math.random() * letter.length)];

console.log(rand_letter)