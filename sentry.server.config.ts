import * as Sentry from "@sentry/nuxt";

console.log(`Sentry process ${process.env.NODE_ENV} ${process.env.SENTRY_DSN}`);

if (process.env.NODE_ENV === "production" && process.env.SENTRY_DSN) {
  console.log("Sentry client enabled");

  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
} else {
  console.log("Sentry client disabled");
}
