function formattedOuptut(maxLengthOfWord, word) {
  const paddingLeft = Math.floor(((maxLengthOfWord + 2) - word.toString().length) / 2);
  const paddingRight = Math.ceil(((maxLengthOfWord + 2) - word.toString().length) / 2);
  return `${' '.repeat(paddingLeft)}${word}${' '.repeat(paddingRight)}`;
}
function currentPathMessage() {
  console.log('You are currently in:', process.cwd());
}
export { formattedOuptut, currentPathMessage };
