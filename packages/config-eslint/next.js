const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    ...[
      "@vercel/style-guide/eslint/node",
      "@vercel/style-guide/eslint/typescript",
      "@vercel/style-guide/eslint/browser",
      "@vercel/style-guide/eslint/react",
      "@vercel/style-guide/eslint/next",
    ].map(require.resolve),
    "turbo",
  ],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call":"off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-useless-template-literals":"off",
    "@typescript-eslint/no-unsafe-assignment":"off",
    "@typescript-eslint/no-unsafe-argument":"off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "no-undef":"off",
    "@typescript-eslint/no-unsafe-argument":"off",
    "@typescript-eslint/prefer-optional-chain":"off",
    "@typescript-eslint/consistent-indexed-object-style":"off",
    "jsx-a11y/img-redundant-alt":"off",
    "jsx-a11y/heading-has-content":"off",
    "@typescript-eslint/no-unnecessary-condition":"off",
    "@typescript-eslint/no-unsafe-return":"off",
    "@typescript-eslint/no-empty-function":"off",
    "prefer-rest-params":"off",
    "@typescript-eslint/ban-ts-comment":"off",
    "func-names": "off",
    "no-multi-assign": "off",
    "no-param-reassign": "off",
    "@typescript-eslint/no-explicit-any":"off",
    "turbo/no-undeclared-env-vars": "off",
    "@typescript-eslint/no-shadow":"off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-empty-interface":"off",
    "@typescript-eslint/no-non-null-assertion":"off",
    "@typescript-eslint/naming-convention": "off",
    "no-unused-vars": "off"
  },
};
