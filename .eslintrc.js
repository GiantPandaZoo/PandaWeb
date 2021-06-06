// .eslintrc.js

// https://eslint.org/docs/rules/
// https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js
// https://cloud.tencent.com/developer/doc/1078

module.exports = {
    env: {
        browser: true,
        jest: true,
    },
    globals: {
        React: true,
        ReactDOM: true,
        mountNode: true,
        document: true,
        i18n: true,
        navigator: true,
        node: true,
        require: false,
        window: true,
        $: true,
    },
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            legacyDecorators: true,
            jsx: true,
        },
    },
    //
    extends: ['react-app', 'prettier', 'prettier/react'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'warn',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'no-duplicate-imports': 'error',

        'arrow-body-style': 'off',
        'brace-style': ['warn', '1tbs', {allowSingleLine: true}],
        camelcase: ['warn', {allow: ["^UNSAFE_"]}],
        'block-scoped-var': 'error',
        'class-methods-use-this': 'off',
        complexity: ['warn', 20],
        'consistent-return': 'off',
        'dot-notation': 'warn',
        'func-names': 'off',
        'guard-for-in': 'warn',
        'generator-star-spacing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-redeclare': ['error', {builtinGlobals: false}],
        'linebreak-style': 'off',
        'max-len': 'off',
        'max-depth': ['error', 6],
        'max-params': ['warn', 5],
        'max-statements': ['error', 50],
        'new-cap': 'error',
        'no-var': 'error',
        'no-proto': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-console': 'off',
        'no-shadow': 'off',
        'no-unused-expressions': 'off',
        'no-use-before-define': ['warn', {functions: false}],
        'no-prototype-builtins': 'warn',
        'no-param-reassign': 'warn',
        // 'no-restricted-globals': 'off',
        'no-else-return': 'off',
        'no-return-assign': 'off',
        'no-return-await': 'off',
        'no-plusplus': ['off', {allowForLoopAfterthoughts: true}],
        'no-await-in-loop': 'warn',
        'no-bitwise': 'warn',
        'no-confusing-arrow': 'error',
        'no-eq-null': 'error',
        'no-floating-decimal': 'warn',
        'no-lonely-if': 'warn',
        'object-curly-newline': 'off',
        'prefer-destructuring': 'off',
        'prefer-arrow-callback': 'warn',
        'prefer-template': 'error',
        'require-await': 'error',
        'valid-jsdoc': [
            'warn',
            {
                requireReturn: false,
                requireReturnDescription: false,
                requireReturnType: false,
            },
        ],

        'react/boolean-prop-naming': 'off',
        'react/default-props-match-prop-types': 'off',
        'react/destructuring-assignment': 'off',
        'react/display-name': 'off',
        'react/forbid-component-props': 'off',
        'react/forbid-elements': 'off',
        'react/forbid-prop-types': 'off',
        'react/no-array-index-key': 'off',
        'react/no-children-prop': 'error',
        'react/no-danger': 'off',
        'react/no-danger-with-children': 'warn',
        'react/no-deprecated': 'error',
        'react/no-did-mount-set-state': 'off',
        'react/no-did-update-set-state': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-find-dom-node': 'error',
        // 'react/no-is-mounted': 'error',
        'react/no-multi-comp': [
            'warn',
            {
                ignoreStateless: true,
            },
        ],
        'react/no-redundant-should-component-update': 'error',
        'react/no-render-return-value': 'warn',
        'react/no-set-state': 'off',
        'react/no-string-refs': 'error',
        'react/no-unescaped-entities': 'error',
        'react/no-unknown-property': 'error',
        'react/no-unused-prop-types': 'off',
        'react/no-unused-state': 'off',
        'react/no-will-update-set-state': 'error',
        'react/prefer-es6-class': 'off',
        'react/prefer-stateless-function': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/require-optimization': 'off',
        'react/self-closing-comp': 'warn',
        'react/sort-comp': 'warn',
        'react/sort-prop-types': 'off',
        'react/style-prop-object': 'error',
        'react/void-dom-elements-no-children': 'error',
        'react/jsx-boolean-value': 'off',
        'react/jsx-closing-bracket-location': [
            'warn',
            {
                nonEmpty: false,
                selfClosing: 'line-aligned',
            },
        ],
        'react/jsx-closing-tag-location': 'off',
        'react/jsx-curly-spacing': [
            'warn',
            {
                when: 'never',
                attributes: {
                    allowMultiline: true,
                },
                children: true,
                spacing: {
                    objectLiterals: 'never',
                },
            },
        ],
        'react/jsx-equals-spacing': ['error', 'never'],
        'react/jsx-filename-extension': 'off',
        'react/jsx-first-prop-new-line': 'off',
        'react/jsx-handler-names': 'off',
        'react/jsx-max-props-per-line': 'off',
        'react/jsx-no-bind': 'off',
        'react/jsx-no-literals': 'off',
        'react/jsx-sort-props': 'off',
        'react/jsx-one-expression-per-line': 'off',

        'jsx-a11y/label-has-associated-control': 'warn',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'i18n/no-chinese-character': 'off',
    },
};
