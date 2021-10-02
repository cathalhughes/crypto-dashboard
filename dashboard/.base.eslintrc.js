// 'use strict';

// // All rules explained here: http://eslint.org/docs/rules/
// // Basically:
// //   "rule-name": 0 // disable rule
// //   "rule-name": 1 // enable rule as a warning (ie. warns you, but keeps going)
// //   "rule-name": 2 // enable rule as an error (shows error & stops right there)
// // Also:
// //   "rule-name": [2, 'always'] // enable rule as error, with the option 'always'
// //   "rule-name": [2, { boolean: false, awesome: true }] // enable rule as error, with an object for the options

// // NOTE: Some of the rules below are commented out.  We should discuss these as a team, and figure out which ones we want to enable as the default ow-labs ruleset.  Then we'll remove the rest.
// module.exports = {
//     extends: ['plugin:vue/recommended', '@vue/prettier', 'airbnb-base', 'prettier'],
//     plugins: ['prettier'],
//     rules: {
//         'comma-dangle': [
//             'error',
//             {
//                 // Override functions to 'never' as this breaks pre-ES2017
//                 arrays: 'always-multiline',
//                 objects: 'always-multiline',
//                 imports: 'always-multiline',
//                 exports: 'always-multiline',
//                 functions: 'never',
//             },
//         ],
//         'consistent-return': 0, // In an ideal world we should aim to re-enable this one soon.
//         'func-names': 0, // We should maybe aim to re-enable this one soon as well
//         'no-useless-call': 2,
//         'prefer-destructuring': 0,
//         'prefer-promise-reject-errors': 0,
//         'no-underscore-dangle': ['error', { allow: ['_id'] }], // stop errors on mongo _id's
//         'object-shorthand': 2,
//         'no-param-reassign': 0,
//         'arrow-body-style': 0,
//         'no-trailing-spaces': 0,
//         'space-infix-ops': 2,
//         'object-curly-newline': 0,
//         curly: 2,
//         'import/no-extraneous-dependencies': 0, // causing issues with mongodb - ticket opened to resolve
//         'prefer-arrow-callback': 0,
//         'lines-between-class-members': ['error', 'always'],
//         'linebreak-style': 0, // Causes problems on windows builds - should fix in .gitattributes longer-term
//         'vue/require-default-prop': 0, // At time of moving to vue/recommended there were too many places to change this
//         'vue/require-prop-types': 0, // At time of moving to vue/recommended there were too many places to change this
//         // 'vue/padding-line-between-blocks': ['error', 'always'],
//         // 'vue/html-self-closing': [
//         //     'error',
//         //     {
//         //         html: {
//         //             void: 'always',
//         //             normal: 'always',
//         //             component: 'always',
//         //         },
//         //         svg: 'always',
//         //         math: 'always',
//         //     },
//         // ],
//     },
//     env: {
//         node: true,
//     },
//     globals: {
//         logger: false, // "logger" is our global winston instance.  "false" means code can't overwrite it.
//         koe: false,
//     },
//     parserOptions: {
//         parser: 'babel-eslint',
//         ecmaVersion: 6,
//         sourceType: 'script', // change to module once we move to ecmascript modules
//     },
// };
