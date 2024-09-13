function countSameWords(input, query) {
    let output = [];

    query.forEach((q) => {
        let count = input.filter((i) => i === q).length;
        output.push(count);
    });

    return output;
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

console.log(countSameWords(INPUT, QUERY));
