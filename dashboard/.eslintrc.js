// const _ = require('lodash');
// const path = require('path');
// const baseEslint = require('./.base.eslintrc');

// // All rules explained here: http://eslint.org/docs/rules/
// module.exports = {
//     // Extend the base eslint rules, otherwise the vue plugin performs several resets.
//     rules: _.extend(baseEslint.rules, {
//         'no-console': 0, // Allow console.* on browsers
//         'no-invalid-this': 0, // Used extensively on vue components
//         'vue/require-v-for-key': 0, // valid-v-for ensures there is a key when rendering custom components. This sometimes is a pain due to simple arrays being iterated
//         'vue/max-attributes-per-line': 0, // seems a pain, unsure we want that style
//         // 'import/extensions': [
//         //     'error',
//         //     'ignorePackages',
//         //     {
//         //         js: 'never',
//         //         vue: 'never',
//         //     },
//         // ],
//     }),
//     env: {
//         es6: true,
//         browser: true,
//         commonjs: true,
//         node: false, // Disable node env for browsers.  NOTE: This doesn't work yet, will be fixed in future eslint version.
//     },
//     parserOptions: {
//         sourceType: 'module',
//     },
//     settings: {
//         // 'import/extensions': ['.js', '.vue'],
//         'import/resolver': {
//             webpack: {
//                 config: path.join(`${__dirname}/../build/webpack.config.js`), // eslint-disable-line no-undef
//             },
//         },
//     },
// };
