module.exports = {
  parser: '@typescript-eslint/parser',
  ignorePatterns: ["**/*.js", "**/*.d.ts"],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    // 競合を避けるため、prettierは一番最後に書く
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'unused-imports'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // 絶対パスでのモジュールの読み込みをokにする
    'import/no-unresolved': 'off',
    // importの順番を整理する
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '~/**',
            group: 'external',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    // 「import Link from 'next/link'」で引っかかるため無効化
    'no-submodule-imports': 'off',
    // if文内のcontinueをokにする
    'no-continue': 'off',
    // for (const a of A) を許可
    'no-restricted-syntax': 'off',
    // console.errorを許容する
    'no-console': ['error', {allow: ['info', 'warn', 'error']}],
    // 未使用のimportの削除
    'unused-imports/no-unused-imports': 'error',
    // any を ok にする
    "@typescript-eslint/no-explicit-any": "off",
  }
}
