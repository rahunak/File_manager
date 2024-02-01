function formattedOuptut(maxLengthOfWord, word) {
  const paddingLeft = Math.floor(((maxLengthOfWord + 2) - word.toString().length) / 2);
  const paddingRight = Math.ceil(((maxLengthOfWord + 2) - word.toString().length) / 2);
  return `${' '.repeat(paddingLeft)}${word}${' '.repeat(paddingRight)}`;
  // console.log('\x1b[32m%s\x1b[0m', `|${' '.repeat(padding)}${word}${' '.repeat(padding)}|`);
}
function currentPathMessage() {
  console.log('You are currently in:', process.cwd());
}
export { formattedOuptut, currentPathMessage };
