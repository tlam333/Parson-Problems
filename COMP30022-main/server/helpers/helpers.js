/**
 * Joins an array of code lines into a single string suitable for execution.
 * @param {Array} codeLines - The array of code lines.
 * @returns {String} - The joined code string.
 */
const joinCodeLines = (codeLines) => {
    return codeLines.map(line => line.replace(/"/g, '\\"')).join('\n');
}

module.exports = { joinCodeLines };
