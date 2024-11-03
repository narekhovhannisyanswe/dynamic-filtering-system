import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  { languageOptions: { globals: globals.browser } },
  {
    files: ["src/**/*.{js,mjs,cjs,jsx}"],
    ignores: ["**/node_moules/**", "**/.next/**", "**/dist/**", "**/build/**"],
    plugins: { "next/next": nextPlugin },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      "no-console": "warn",
      quotes: ["error", "single"],
      semi: ["error", "always"],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "max-len": [
        "error",
        { code: 120, ignoreComments: true, ignoreStrings: true },
      ],
    },
    settings: { react: { version: "detect" } },
  },
];
