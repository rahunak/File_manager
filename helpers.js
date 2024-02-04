function formattedOuptut(maxLengthOfWord, word) {
  const paddingLeft = Math.floor(((maxLengthOfWord + 2) - word.toString().length) / 2);
  const paddingRight = Math.ceil(((maxLengthOfWord + 2) - word.toString().length) / 2);
  return `${' '.repeat(paddingLeft)}${word}${' '.repeat(paddingRight)}`;
}
function currentPathMessage() {
  console.log('You are currently in:', process.cwd());
}
function isArgsOK(input, expectArgsCount) {
  console.log('input', input, 'expectArgsCount', expectArgsCount + 1, '=', input.trim().split(' ').length);
  if (input.trim().split(' ').length === expectArgsCount + 1) {
    return true;
  }

  return false;
}

export { formattedOuptut, currentPathMessage, isArgsOK };
