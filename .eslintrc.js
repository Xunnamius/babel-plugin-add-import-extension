'use strict';

const plugins = ['unicorn', '@typescript-eslint', 'import'];

const xtends = [
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:import/errors',
  'plugin:import/warnings',
  'plugin:import/typescript',
  'plugin:unicorn/recommended'
];

const environment = {
  es2022: true,
  node: true
  // * Instead of including more options here, enable them on a per-file basis
};

const rules = {
  'no-console': 'warn',
  'no-return-await': 'warn',
  'no-await-in-loop': 'warn',
  'import/no-unresolved': ['error', { commonjs: true }],
  'no-extra-boolean-cast': 'off',
  'no-empty': 'off',
  '@typescript-eslint/camelcase': 'off',
  '@typescript-eslint/no-require-imports': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/prefer-ts-expect-error': 'warn',
  '@typescript-eslint/no-misused-promises': ['error'],
  '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
  '@typescript-eslint/ban-ts-comment': [
    'warn',
    {
      'ts-expect-error': 'allow-with-description',
      minimumDescriptionLength: 6
    }
  ],
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_+',
      varsIgnorePattern: '^_+',
      caughtErrorsIgnorePattern: String.raw`^ignored?\d*$`,
      caughtErrors: 'all'
    }
  ],
  // ? Ever since v4, we will rely on TypeScript to catch these
  'no-undef': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  // ? I'll be good, I promise
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/consistent-type-imports': [
    'error',
    { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' }
  ],
  '@typescript-eslint/consistent-type-exports': [
    'error',
    { fixMixedExportsWithInlineTypeSpecifier: true }
  ],
  'no-unused-vars': 'off',
  'unicorn/no-keyword-prefix': 'warn',
  'unicorn/prefer-string-replace-all': 'warn',
  // ? Handled by integration tests
  'unicorn/prefer-module': 'off',
  // ? I am of the opinion that there is a difference between something being
  // ? defined as nothing and something being undefined
  'unicorn/no-null': 'off',
  // ? If MongoDB can get away with "DB" in its name, so can we. Also,
  // ? unnecessary underscores are a big no-no.
  'unicorn/prevent-abbreviations': [
    'warn',
    {
      checkFilenames: false,
      replacements: {
        args: false,
        str: false,
        fn: false,
        db: false,
        dir: false,
        dist: false,
        tmp: false,
        pkg: false,
        src: false,
        dest: false,
        obj: false,
        val: false,
        env: false
      },
      ignore: [/stderr/i]
    }
  ],
  // ? Actually, I rather like this curt syntax
  'unicorn/no-await-expression-member': 'off',
  // ? Between disabling this and disabling no-empty-function, I choose this
  'unicorn/no-useless-undefined': 'off',
  // ? Not sure why this isn't the default
  'unicorn/prefer-export-from': ['warn', { ignoreUsedVariables: true }],
  // ? Yeah, I read The Good Parts too, I know what I'm doing
  'unicorn/consistent-function-scoping': 'off',
  // ? It's 2022. Use Prettier
  'unicorn/no-nested-ternary': 'off',
  // ? `Array.from` communicates intent much better than `[...]`
  'unicorn/prefer-spread': 'off',
  // ? Not realistic when using TypeScript
  'unicorn/prefer-native-coercion-functions': 'off',
  // ? Premature optimization is evil
  'unicorn/no-array-for-each': 'off',
  // ? Lol, no
  'unicorn/explicit-length-check': 'off',
  // ? I don't think so
  'unicorn/no-negated-condition': 'off'
};

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins,
  extends: xtends,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    },
    project: 'tsconfig.eslint.json'
  },
  env: environment,
  rules,
  overrides: [
    {
      files: ['*.test.*'],
      plugins: [...plugins, 'jest'],
      env: { ...environment, jest: true },
      extends: [...xtends, 'plugin:jest/all', 'plugin:jest/style'],
      rules: {
        ...rules,
        'jest/prefer-importing-jest': 'off',
        'jest/lowercase': 'off',
        'jest/consistent-test-it': 'off',
        'jest/require-top-level-describe': 'off',
        'jest/valid-describe': 'off',
        'jest/no-hooks': 'off',
        'jest/require-to-throw-message': 'off',
        'jest/prefer-called-with': 'off',
        'jest/prefer-spy-on': 'off',
        'jest/no-if': 'off',
        'jest/no-disabled-tests': 'warn',
        'jest/no-commented-out-tests': 'warn',
        'jest/no-alias-methods': 'off',
        'jest/max-expects': 'off',
        'jest/prefer-mock-promise-shorthand': 'off',
        'jest/no-conditional-in-test': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/prefer-each': 'off',
        'jest/prefer-snapshot-hint': 'off'
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/extensions': ['.ts', '.tsx', '.js', '.jsx'],
    // ? Switch parsers depending on which type of file we're looking at
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.cts', '.mts'],
      '@babel/eslint-parser': ['.js', '.jsx', '.cjs', '.mjs']
    },
    'import/resolver': {
      node: {},
      typescript: {}
    },
    'import/ignore': [
      // ? Don't go complaining about anything that we don't own
      '.*/node_modules/.*',
      '.*/bin/.*'
    ]
  },
  ignorePatterns: [
    'coverage',
    'dist',
    'fixtures',
    '__fixtures__',
    '__snapshots__',
    'test/integration/assets'
  ]
};
