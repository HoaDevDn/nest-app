import prettierPlugin from 'eslint-plugin-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import unusedImportPlugin from 'eslint-plugin-unused-imports';

export default [
  {
    files: ['**/*.ts'], // Áp dụng cho các file .ts
    languageOptions: {
      parser: typescriptParser, // Sử dụng parser của TypeScript
      ecmaVersion: 2021, // Sử dụng ES2021
      sourceType: 'module', // Hỗ trợ import/export
      globals: {
        window: true,
        document: true,
        describe: true,
        test: true,
        expect: true,
        navigator: true,
        DOCUMENT_URL: true,
        NODE_ENV: true,
        PORT: true,
        $: true,
        localStorage: true,
        sessionStorage: true,
        Blob: true,
        Image: true,
        process: true,
        __dirname: true,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      '@typescript-eslint': typescriptPlugin,
      'unused-imports': unusedImportPlugin,
    },
    // settings: {
    //   'import/resolver': {
    //     node: {
    //       extensions: ['.js', '.ts'],
    //     },
    //     typescript: {
    //       alwaysTryTypes: true,
    //     },
    //   },
    // },
    rules: {
      semi: ['error', 'always'], // Bắt buộc dấu chấm phẩy
      quotes: ['error', 'single'], // Bắt buộc dấu nháy đơn
      '@typescript-eslint/no-unused-vars': ['error'], // Không cho phép biến không được sử dụng,
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-inferrable-types': [
        2,
        {
          ignoreParameters: true,
          ignoreProperties: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          endOfLine: 'auto',
        },
      ],
      // 'import/no-unresolved': [
      //   2,
      //   {
      //     ignore: ['virtual:pwa-register'],
      //   },
      // ],
      // 'import/extensions': [
      //   'error',
      //   'ignorePackages',
      //   { js: 'never', ts: 'never' },
      // ],
      'import/named': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-ins (like fs, path)
            'external', // External modules (from node_modules)
            'internal', // Aliased imports or any other custom groups
            'parent', // Imports from parent directories (../)
            'sibling', // Imports from the same directory (./)
            'index', // Imports from index files
            'object', // Imports that use object destructuring
            'type', // Type imports
          ],
          pathGroups: [
            {
              pattern: 'configs/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'core/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'modules/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          named: true,
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'max-lines': [
        2,
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-params': [2, 3],
      'max-depth': [2, 4],
      'max-statements': [2, 30],
      'max-statements-per-line': [2, { max: 1 }],
      'no-console': ['warn', { allow: ['error'] }],
      'linebreak-style': [0, { allow: ['windows'] }],
      'quote-props': [0, 'always'],
    },
  },
  {
    ignores: ['node_modules', 'dist'], // Bỏ qua các thư mục này
  },
];
