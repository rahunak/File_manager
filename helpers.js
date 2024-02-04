/**
 * Generates a formatted output with padding for a given word.
 *
 * @param {number} maxLengthOfWord - the maximum length of the word
 * @param {string} word - the word to be formatted
 * @return {string} the formatted output with padding
 */
function formattedOuptut(maxLengthOfWord, word) {
  let paddingLeft = Math.floor(((maxLengthOfWord + 2) - word.toString().length) / 2);
  let paddingRight = Math.ceil(((maxLengthOfWord + 2) - word.toString().length) / 2);
  paddingLeft <= 0 ? paddingLeft = 0 : paddingLeft;
  paddingRight <= 0 ? paddingRight = 0 : paddingRight;
  return `${' '.repeat(paddingLeft)}${word}${' '.repeat(paddingRight)}`;
}

/**
 * Logs the current working directory path to the console.
 *
 * @return {void}
 */
function currentPathMessage() {
  console.log('You are currently in:', process.cwd());
}

/**
 * Check if the input arguments count is as expected.
 *
 * @param {string} input - the input arguments
 * @param {number} expectArgsCount - the expected number of arguments
 * @return {boolean} true if the input arguments count is as expected, false otherwise
 */
function isArgsOK(input, expectArgsCount) {
  if (input.trim().split(' ').length === expectArgsCount + 1) {
    return true;
  }

  return false;
}

export { formattedOuptut, currentPathMessage, isArgsOK };
