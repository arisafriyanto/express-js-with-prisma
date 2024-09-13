function reverseAlphabet(input) {
    let letters = input.replace(/[0-9]/g, '');
    let numbers = input.replace(/[a-zA-Z]/g, '');

    let reversedLetters = letters.split('').reverse().join('');

    return reversedLetters + numbers;
}

const input = 'NEGIE1';
const result = reverseAlphabet(input);

console.log(result);
