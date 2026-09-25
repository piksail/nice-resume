// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      "vue/multi-word-component-names": "warn",
      "vue/no-mutating-props": "warn",
      "vue/html-self-closing": ["warn", {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      }],
    },
  },
);
