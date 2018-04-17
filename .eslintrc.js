module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "comma-dangle": [
          "error",
          "never"
        ],
        "comma-style": [
            "error", "last"
        ],
        "eqeqeq": [
            "error",
            "smart"
        ],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-console": [
          "warn"
        ],
        "no-else-return": [
            "error",
            { "allowElseIf": true }
        ],
        "no-unused-vars": [
          "warn"
        ],
        "prefer-const": [
            "error"
        ],
        "quotes": [
            "error",
            "single",
            { "allowTemplateLiterals": true }
        ],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/no-unused-prop-types": "error",
        "react/no-unused-state": "error",
        "react/prop-types": "error",
        "semi": [
            "error",
            "always"
        ],
        "sort-imports": [
            "error",
            { "ignoreCase": true }
        ]
    }
};
