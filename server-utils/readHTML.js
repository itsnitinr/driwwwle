const fs = require('fs').promises;

const readHTML = async (path) => {
  try {
    const html = await fs.readFile(path, { encoding: 'utf-8' });
    return html;
  } catch (err) {
    console.error(err);
    throw new Error('There was an error');
  }
};

module.exports = readHTML;
