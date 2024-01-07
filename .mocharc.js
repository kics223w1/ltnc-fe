module.exports = {
  diff: true,
  extension: ['ts', 'js'], // include extensions
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 10000,
  ui: 'bdd',
};
