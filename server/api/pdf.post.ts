import { createSSRApp } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createPinia } from "pinia";
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import puppeteer from "puppeteer";
import Document from "@/components/Document.vue";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { themeBaseSettings } from "@/globals";
import type { ContactDetail, Category, Theme, ResumeSettings } from "@/types";

interface PdfRequestBody {
  name?: string;
  title?: string;
  about?: string;
  contactDetails?: ContactDetail[];
  categories?: Category[];
  theme?: Theme;
  isHeaderSimple?: boolean;
  simpleHeaderCategoryName?: string;
  customSettings?: ResumeSettings;
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as PdfRequestBody;

  const app = createSSRApp({
    components: { Document },
    template: "<Document />",
  });
  const pinia = createPinia();
  app.use(pinia);

  const editorStore = useEditorStore(pinia);
  editorStore.documentType = "resume";

  const profileStore = useProfileStore(pinia);
  profileStore.$patch({
    name: body.name ?? "",
    title: body.title ?? "",
    about: body.about ?? "",
    contactDetails: body.contactDetails ?? [],
    isThemeCustomized: !!body.customSettings,
    theme: body.theme ?? "default",
  });

  const resumeStore = useResumeStore(pinia);
  resumeStore.$patch({
    categories: body.categories ?? [],
    isHeaderSimple: body.isHeaderSimple ?? false,
    simpleHeaderCategoryName: body.simpleHeaderCategoryName ?? "",
  });

  if (body.customSettings) {
    resumeStore.settings = body.customSettings;
  }

  const html = await renderToString(app);

  const fullHtml = wrapHtml(html, body.theme ?? "default");

  const pdf = await generatePdf(fullHtml);

  setHeader(event, "Content-Type", "application/pdf");
  setHeader(event, "Content-Disposition", 'attachment; filename="resume.pdf"');

  return pdf;
});

function wrapHtml(bodyHtml: string, theme: string): string {
  const css = getCompiledCss();
  const fontLinks = getGoogleFontsLinks(theme);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  ${fontLinks}
  <style>${css}</style>
</head>
<body>
  <div id="app">${bodyHtml}</div>
</body>
</html>`;
}

function getCompiledCss(): string {
  try {
    const nuxtDir = resolve(process.cwd(), ".output/public/_nuxt");
    const files = readdirSync(nuxtDir);
    const cssFiles = files.filter((f) => f.endsWith(".css"));
    return cssFiles
      .map((f) => readFileSync(resolve(nuxtDir, f), "utf-8"))
      .join("\n");
  } catch {
    return "";
  }
}

function getGoogleFontsLinks(theme: string): string {
  const base = themeBaseSettings[theme as Theme];
  const fonts = new Set<string>();

  fonts.add(base?.bodyFont ?? "Sarabun");
  if (base?.displayFont) {
    fonts.add(base.displayFont);
  }

  return `<link href="https://fonts.googleapis.com/css2?family=${[...fonts]
    .map((f) => f.replace(/ /g, "+"))
    .join("&family=")}&display=swap" rel="stylesheet">`;
}

async function generatePdf(html: string): Promise<Buffer> {
  const launchOptions: Record<string, unknown> = {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  };

  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const browser = await puppeteer.launch(launchOptions);

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
