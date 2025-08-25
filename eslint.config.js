// eslint.config.js

import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // Global ignores
  {
    ignores: ['node_modules', 'dist', 'eslint.config.js'],
  },

  // ========= Base Configurations =========
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // Use type-aware linting
  reactPlugin.configs.flat.recommended,
  reactHooksPlugin.configs.flat.recommended,
  jsxA11yPlugin.configs.flat.recommended,

  // ========= Main Configuration for TS/TSX files =========
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        // Link the parser to your tsconfig.json
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: { version: 'detect' },
      // Configure import plugin to resolve TypeScript paths
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    // Your custom rules and overrides
    rules: {
      // My Recommended Overrides & Additions
      'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
      'react/jsx-uses-react': 'off',     // Not needed with new JSX transform
      'react/prop-types': 'off',         // Handled by TypeScript
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
        },
      ],
      'react/jsx-props-no-spreading': 'off',
      'react-refresh/only-export-components': 'warn',
    },
  },

  // Prettier config must be the last one
  eslintConfigPrettier,
);