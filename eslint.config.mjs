import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";
import tailwindPlugin from "eslint-plugin-tailwindcss"

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {languageOptions: {globals: globals.browser}},
    {
        files: ["src/**/*.{js,mjs,cjs,jsx}"],
        ignores: ["**/node_moules/**", "**/.next/**", "**/dist/**", "**/build/**"],
        plugins: {
            "@next/next": nextPlugin,
            react: pluginReact,
            tailwindcss: tailwindPlugin
        },
        rules: {

            "no-unused-vars": "warn",
            "no-console": "warn",
            quotes: ["error", "single"],
            semi: ["error", "always"],
            indent: ["error", 2],
            "comma-dangle": ["error", "always-multiline"],
            "object-curly-spacing": ["error", "always"],
            "max-len": [
                "error",
                {code: 120, ignoreComments: true, ignoreStrings: true},
            ],
            // react rules
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/jsx-wrap-multilines": ["error", {return: "parens-new-line"}],
            // tailwindcss rules
            "tailwindcss/classnames-order": "warn",
            "tailwindcss/enforces-negative-arbitrary-values": "warn",
            "tailwindcss/enforces-shorthand": "warn",
            "tailwindcss/migration-from-tailwind-2": "warn",
            "tailwindcss/no-arbitrary-value": "off",
            "tailwindcss/no-custom-classname": "warn",
            "tailwindcss/no-contradicting-classname": "error"
        },
        settings: {
            react: {version: "detect"},
            tailwindcss: {
                callees: ["cx", "clsx", "twMerge"],
                config: "tailwind.config.js" // Path to your tailwind config
            }
        },
    },
];
