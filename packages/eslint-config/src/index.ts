import path from 'node:path'
import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
// @ts-expect-error -- no types
import eslintPluginNext from '@next/eslint-plugin-next'
// @ts-expect-error -- no types
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginDeprecation from 'eslint-plugin-deprecation'
import eslintPluginImport from 'eslint-plugin-import-x'
import eslintPluginReact from 'eslint-plugin-react'
// @ts-expect-error -- no types
import * as eslintPluginReactCompiler from 'eslint-plugin-react-compiler'
// @ts-expect-error -- no types
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginSonarJs from 'eslint-plugin-sonarjs'
// @ts-expect-error -- no types
import eslintPluginTailwindCss from 'eslint-plugin-tailwindcss'
// @ts-expect-error -- no types
import eslintPluginTsSortKeys from 'eslint-plugin-typescript-sort-keys'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'
import type { Config } from 'typescript-eslint'

const TAILWIND_CONFIG = {
  extends: [eslintPluginTailwindCss.configs['flat/recommended']],
  rules: {
    'tailwindcss/classnames-order': 'off', // conflicts with prettier-plugin-tailwindcss
    'tailwindcss/enforces-negative-arbitrary-values': 'error',
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/migration-from-tailwind-2': 'error',
    'tailwindcss/no-custom-classname': 'error'
  }
}

const REACT_COMPILER_RESTRICT = {
  name: 'react',
  importNames: ['memo', 'useCallback', 'useMemo', 'forwardRef']
}

const config: Config = tseslint.config(
  includeIgnoreFile(path.resolve('.gitignore')),
  { ignores: ['**/generated-page-map.ts', '**/next-env.d.ts'] },
  // Rules for all files
  {
    files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintPluginUnicorn.configs['flat/recommended'],
      eslintConfigPrettier
    ],
    plugins: {
      import: eslintPluginImport,
      sonarjs: eslintPluginSonarJs
    },
    rules: {
      'no-extra-boolean-cast': ['error', { enforceForInnerExpressions: true }],
      'prefer-object-has-own': 'error',
      'logical-assignment-operators': [
        'error',
        'always',
        { enforceForIfStatements: true }
      ],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-lonely-if': 'error',
      'prefer-destructuring': [
        'error',
        { VariableDeclarator: { object: true } }
      ],
      'import/no-duplicates': 'error',
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      'object-shorthand': ['error', 'always'],
      '@typescript-eslint/prefer-for-of': 'error',
      quotes: ['error', 'single', { avoidEscape: true }], // Matches Prettier, but also replaces backticks
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_' // allow underscores in destructuring
        }
      ],
      'prefer-object-spread': 'error',
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'sonarjs/no-small-switch': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'sonarjs/no-unused-collection': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'unicorn/switch-case-braces': ['error', 'avoid'],
      // todo: enable
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',

      'unicorn/no-hex-escape': 'off', // todo
      'unicorn/escape-case': 'off', // todo
      'unicorn/consistent-function-scoping': 'off', // todo
      'unicorn/prefer-module': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-top-level-await': 'off', // Check if possible to refactor without breaking

      'unicorn/prevent-abbreviations': 'off', // Too many cases
      'unicorn/explicit-length-check': 'off', // I don't like
      'unicorn/no-null': 'off', // I don't like
      'unicorn/prefer-global-this': 'off', // Bundlers are smarter with window
      'unicorn/prefer-optional-catch-binding': 'off' // catch by @typescript-eslint/no-unused-vars
    }
  },
  // Rules for React files
  {
    files: ['{packages,examples,docs}/**'],
    extends: [
      // @ts-expect-error
      eslintPluginReact.configs.flat.recommended,
      // @ts-expect-error
      eslintPluginReact.configs.flat['jsx-runtime']
    ],
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      '@next/next': eslintPluginNext
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginNext.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/no-unknown-property': ['error', { ignore: ['jsx'] }],
      'react-hooks/exhaustive-deps': 'error',
      'react/self-closing-comp': 'error',
      'no-restricted-syntax': [
        'error',
        {
          // ❌ useMemo(…, [])
          selector:
            'CallExpression[callee.name=useMemo][arguments.1.type=ArrayExpression][arguments.1.elements.length=0]',
          message:
            "`useMemo` with an empty dependency array can't provide a stable reference, use `useRef` instead."
        },
        {
          // ❌ z.object(…)
          selector: 'MemberExpression[object.name=z] > .property[name=object]',
          message: 'Use z.strictObject is more safe.'
        }
      ],
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.tsx', '.jsx'], allow: 'as-needed' }
      ],
      'react/jsx-curly-brace-presence': 'error',
      'react/jsx-boolean-value': 'error'
    },
    settings: {
      react: { version: 'detect' }
    }
  },
  // Rules for TypeScript files
  {
    files: ['**/*.{ts,tsx,cts,mts}'],
    plugins: {
      deprecation: eslintPluginDeprecation,
      'typescript-sort-keys': eslintPluginTsSortKeys
    },
    // TODO: fix errors
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking'
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    },
    rules: {
      ...eslintPluginDeprecation.configs.recommended.rules,
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      'prefer-destructuring': 'off',
      '@typescript-eslint/prefer-destructuring': [
        'error',
        { VariableDeclarator: { object: true } }
      ],
      '@typescript-eslint/no-unnecessary-condition': 'error'
    }
  },
  {
    files: ['packages/**'],
    plugins: {
      'react-compiler': eslintPluginReactCompiler
    },
    rules: {
      'no-restricted-imports': ['error', REACT_COMPILER_RESTRICT],
      'react-compiler/react-compiler': 'error'
    }
  },
  // ⚙️ nextra-theme-docs
  {
    ...TAILWIND_CONFIG,
    files: ['packages/nextra-theme-docs/**'],
    settings: {
      tailwindcss: {
        callees: ['cn'],
        whitelist: [
          'nextra-navbar',
          'nextra-navbar-blur',
          'nextra-sidebar',
          'nextra-breadcrumb',
          'nextra-sidebar-footer',
          'nextra-toc'
        ]
      }
    },
    rules: {
      ...TAILWIND_CONFIG.rules,
      'no-restricted-imports': [
        'error',
        { name: 'next/link', message: 'Use `<Anchor>` instead' },
        REACT_COMPILER_RESTRICT
      ],
      // False positive due Tailwind CSS v4
      'tailwindcss/no-custom-classname': 'off'
    }
  },
  // ⚙️ nextra-theme-blog
  {
    ...TAILWIND_CONFIG,
    files: ['packages/nextra-theme-blog/**'],
    rules: {
      ...TAILWIND_CONFIG.rules,
      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Use `<Link>` from `next-view-transitions` instead'
        },
        {
          name: 'next/navigation',
          importNames: ['useRouter'],
          message:
            'Use `useTransitionRouter` from `next-view-transitions` instead'
        }
      ],
      // False positive due Tailwind CSS v4
      'tailwindcss/no-custom-classname': 'off'
    }
  },
  // ⚙️ nextra
  {
    ...TAILWIND_CONFIG,
    files: ['packages/nextra/**'],
    settings: {
      tailwindcss: {
        callees: ['cn'],
        whitelist: [
          'nextra-code',
          'nextra-filetree',
          'nextra-bleed',
          'nextra-skip-nav',
          'nextra-search-results'
        ]
      }
    },
    rules: {
      ...TAILWIND_CONFIG.rules,
      'import/extensions': ['error', 'ignorePackages'],
      // False positive due Tailwind CSS v4
      'tailwindcss/no-custom-classname': 'off'
    }
  },
  // ⚙️ Docs
  {
    ...TAILWIND_CONFIG,
    files: ['docs/**'],
    settings: {
      tailwindcss: {
        callees: ['cn'],
        whitelist: [
          'dash-ring',
          'theme-1',
          'theme-2',
          'theme-3',
          'theme-4',
          'subtitle',
          'headline',
          'content-container',
          'feat-darkmode',
          'features-container',
          // New in TailwindCSS v4
          'z-1',
          'z-2',
          '.*nextra-focus' // I can't ignore colon `:`, use `*` instead
        ],
        cssFiles: [
          'docs/app/globals.css',
          'docs/app/_components/features/style.module.css',
          'packages/nextra-theme-docs/dist/style.css'
        ]
      },
      next: { rootDir: 'docs' }
    }
  },
  // ⚙️ SWR-site example
  {
    ...TAILWIND_CONFIG,
    files: ['examples/swr-site/**'],
    settings: {
      tailwindcss: {
        cssFiles: [
          'examples/swr-site/app/[lang]/styles.css',
          'examples/swr-site/app/_components/features.css',
          'packages/nextra-theme-docs/dist/style.css'
        ],
        whitelist: [
          '.*nextra-focus' // I can't ignore colon `:`, use `*` instead
        ]
      },
      next: { rootDir: 'examples/swr-site' }
    }
  },
  // ⚙️ blog example
  {
    files: ['examples/blog/**'],
    settings: {
      next: { rootDir: 'examples/blog' }
    }
  },
  // ⚙️ docs example
  {
    files: ['examples/docs/**'],
    settings: {
      next: { rootDir: 'examples/docs' }
    }
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'no-var': 'off'
    }
  }
)

export default config
