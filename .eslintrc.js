module.exports = {
  "extends": ["standard"],
  "parser": "babel-eslint",
  "plugins": [
    "standard",
    "import",
  ],
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
  },
  "rules": {
    "comma-dangle": ["error", "always-multiline"],
  },
}
