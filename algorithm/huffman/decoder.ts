const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
});

const data = [];
rl.on('line', line => {
  data.push(line.toString());
}).on('close', () => {
  const rows = data.filter(Boolean);
  const codes = rows.slice(1, rows.length - 1);
  const parsedCodes = codes
    .map(code => code.split(': '))
    .sort((a, b) => (a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1));
  const codesMap = parsedCodes.reduce((acc, [letter, value]) => {
    acc[value] = letter;
    return acc;
  }, {});
  const line = rows[rows.length - 1];

  const res = [];
  let codeTemplate = '';
  for (const char of line) {
    codeTemplate += char;
    if (codesMap[codeTemplate]) {
      res.push(codesMap[codeTemplate]);
      codeTemplate = '';
    }
  }
  console.log(res.join(''));
});
