export default {
  "*.{md,html,css,json,js,vue,yaml,yml}": ["npm run format:check --"],
  "*.{vue,ts}": [
    "npm run format:check --",
    "npm run lint:check --",
    () => "npm run typescript -- --noEmit", // written as a function so it runs once, not for every file
  ],
};
