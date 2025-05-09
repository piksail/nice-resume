module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    // "plugin:vuejs-accessibility/recommended", // TODO Does not detect PrimeVue associated controls
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint", "vuejs-accessibility", "vitest"],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-mutating-props": ["error", { shallowOnly: true }],
  },
};
