function longest(sentence) {
    const words = sentence.split(' ');

    const longestWord = words.reduce((long, current) => {
        return current.length > long.length ? current : long;
    }, '');

    return `${longestWord}: ${longestWord.length} character`;
}

const sentence = 'Saya sangat senang mengerjakan soal algoritma';
console.log(longest(sentence));
