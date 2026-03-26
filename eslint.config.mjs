// @ts-check

import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tailwind from 'eslint-plugin-tailwindcss';
import prettier from 'eslint-config-prettier';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(
  // 対象外ファイル
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'prisma/migrations/**',
    ],
  },

  // 基本ルール（JS + TypeScript推奨）
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Tailwind CSS クラス順序チェック
  ...tailwind.configs['flat/recommended'],

  // プロジェクト共通設定
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // Tailwind CSS
      'tailwindcss/classnames-order': 'warn',

      // コード品質
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'eqeqeq': ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },

  // shadcn/ui 生成コンポーネント（Tailwind v4クラスを使用するため除外）
  {
    files: ['src/components/ui/**/*.tsx'],
    rules: {
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-unnecessary-arbitrary-value': 'off',
    },
  },

  // テストファイルの緩和設定
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },

  // Prettierと競合するESLintルールを無効化（末尾に配置）
  prettier,
);
