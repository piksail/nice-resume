import type {
  Asset,
  BaseSettings,
  Category,
  CommonDocumentSettings,
  ContactDetail,
  DocumentType,
  EntryLayout,
  Experience,
  Font,
  HeaderLayout,
  LetterSettings,
  ListMarker,
  ResumeSettings,
  Template,
  TemplateBaseSettings,
  TemplateSettings,
  TextSeparator,
} from "@/types";

export const documentTypes: Array<DocumentType> = ["resume", "letter"];

export const fonts: Font[] = [
  "serif",
  "sans-serif",
  "Archivo",
  "Caveat",
  "Fira Sans",
  "Fira Sans Condensed",
  "Josefin Sans",
  "Kaisei Tokumin",
  "Karla",
  "Lato",
  "League Gothic",
  "Libre Franklin",
  "Mulish",
  "Open Sans",
  "Open Sans Condensed",
  "Playwrite AU NSW",
  "Poppins",
  "PT Serif",
  "Roboto",
  "Roboto Condensed",
  "Times New Roman",
  "Yanone Kaffeesatz",
];

export const templates: Array<Template> = [
  "default",
  "Aster",
  "Care",
  "CottonCandy",
  "Cupcake",
  "Elegant",
  "Kendall",
  "Macaron",
  "Macchiato",
  "NeoBrutalism",
  "Oilcloth",
  "OpenResume",
  "Paper",
  "Pharmacy",
  "Red",
  "Shelf",
  "StackOverflow",
  "Stone",
  "Toothpaste",
  "Wiki",
];

export const fixedLayoutTemplates: Array<Template> = [
  "Care",
  "Cupcake",
  "Paper",
];

export const discouragedLayoutTemplates: {
  [T in Template]: Array<Category["layout"]>;
} = {
  default: [],
  Aster: ["aside", "half"],
  Care: [],
  CottonCandy: ["aside"],
  Cupcake: [],
  Elegant: [],
  Kendall: [],
  Macaron: [],
  Macchiato: [],
  NeoBrutalism: [],
  Oilcloth: [],
  OpenResume: [],
  Paper: [],
  Pharmacy: [],
  Red: ["full"],
  Shelf: ["aside", "half"],
  StackOverflow: [],
  Stone: [],
  Toothpaste: ["aside"],
  Wiki: [],
};

// TODO settings réduire espace entrelistmarker et text
// TODO better UX for choosing header layout

export const textSeparators: TextSeparator[] = [
  "|",
  "-",
  "·",
  "*",
  ">",
  ",",
  " ",
];

export const listMarkers: ListMarker[] = [
  "circle",
  "disc",
  "hyphen",
  "square",
  "triangle",
];

export const headerLayouts: HeaderLayout[] = [0, 1, 2, 3, 4, 5];

export const entryLayouts: EntryLayout[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
];

export const commonDocumentSettings: CommonDocumentSettings = {
  document: {
    bodyFont: "sans-serif",
    color: "#000000",
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderColor: "#000000",
    border: [0, 0, 0, 0],
    padding: [60, 60, 60, 60],
  },
  header: {
    layout: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "#000000",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  name: {
    font: "inherit",
    fontSize: 22,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    textAlign: "left",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  title: {
    font: "inherit",
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    textAlign: "left",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  about: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    textAlign: "left",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  aboutQuote: {
    font: "inherit",
    fontSize: 14 * 3,
    fontWeight: 400,
    isItalic: false,
    color: "currentColor",
    isShown: false,
  },
  contactDetails: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    alignment: "start",
    listOrientation: "column",
    listMarker: null,
    listMarkerColor: "currentColor",
    iconColor: "currentColor",
    iconGap: 4,
    isIconFirst: true,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    gap: 0,
  },
};
export const resumeSettings: ResumeSettings = {
  ...commonDocumentSettings,
  aside: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "#000000",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    width: 25, // Percentage
    isRightPositioned: false,
  },
  body: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "#000000",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  category: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "#000000",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    gap: 12,
  },
  categoryName: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    textAlign: "left",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    width: 100, // Percentage
    isAside: false,
  },
  categoryNameSeparator: {
    position: "bottom",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  entry: {
    layout: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "#000000",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    gap: 16,
  },
  entryTitle: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    // TODO allow bg color, padding, radius, etc. to make it like a badge?
    order: 1,
  },
  entryPeriod: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    // TODO allow bg color, padding, radius, etc. to make it like a badge?
    order: 2,
  },
  entryOrganization: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    // TODO allow bg color, padding, radius, etc. to make it like a badge?
    order: 3,
  },
  entryLocation: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    // TODO allow bg color, padding, radius, etc. to make it like a badge?
    order: 4,
  },
  entrySummary: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  entryHighlight: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    listOrientation: "column",
    listMarker: "hyphen",
    listMarkerColor: "currentColor",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    gap: 0,
  },
  entryTag: {
    font: "inherit",
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 1.2,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    backgroundColor: "#f1f1f1",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 4,
    margin: [4, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [2, 6, 2, 6],
    gap: 4,
  },
};

export const letterSettings: LetterSettings = {
  ...commonDocumentSettings,
  senderDetails: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    textAlign: "center",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0], // If sender details is used, it is the first element on the document (no need for margins)
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    gap: 0,
  },
  recipientDetails: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    textAlign: "center",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [40, 0, 40, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    gap: 0,
  },
  subject: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    textAlign: "center",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  reference: {
    font: "inherit",
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    textAlign: "center",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    isBeforeSubject: false,
  },
  body: {
    fontSize: 14,
    lineHeight: 1.5,
    fontWeight: 400,
    color: "currentColor",
    indentation: 48,
    isJustified: true,
    margin: [20, 0, 0, 0],
    gap: 12,
    isSignatureRightAligned: true,
  },
};

export const templateBaseSettings: TemplateBaseSettings = {
  default: {
    isLetterPaddingless: false,
    colors: ["#f1f1f1", "#717171", "#000000"],
    bodyFont: "sans-serif",
  },
  Aster: {
    isLetterPaddingless: false,
    colors: ["#713c97", "#f6881f", "#ffffff", "#000000"],
    bodyFont: "Fira Sans",
  },
  Care: {
    isLetterPaddingless: true,
    colors: ["#7cbaa4", "#ffe7c9", "#ffe6e9", "#ffbec9", "#ffeca6", "#ffffff"],
    bodyFont: "Poppins",
    displayFont: "Playwrite AU NSW",
  },
  CottonCandy: {
    isLetterPaddingless: false,
    colors: ["#ed3660", "#5662e8", "#e8afcf", "#ffffff", "#1e1e1e"],
    bodyFont: "Mulish",
    displayFont: "League Gothic",
  },
  Cupcake: {
    isLetterPaddingless: false,
    colors: ["#f2b150", "#e593aa", "#a9d7e2", "#231f20"],
    bodyFont: "Open Sans Condensed",
    displayFont: "Yanone Kaffeesatz",
  },
  Elegant: {
    isLetterPaddingless: false,
    colors: [
      "#707070",
      "#777777",
      "#e6e6e6",
      "#357ebd",
      "#7eb0db",
      "#ffffff",
      "#333333",
    ],
    bodyFont: "Lato",
  },
  Kendall: {
    isLetterPaddingless: true,
    colors: [
      "#334960",
      "#32475c",
      "#227c74",
      "#6f7f8f",
      "#cccccc",
      "#dddddd",
      "#eeeeee",
      "#ffffff",
      "#363636",
    ],
    bodyFont: "Open Sans",
  },
  Macaron: {
    isLetterPaddingless: true,
    colors: ["#d88277", "#f8aaa6", "#f8d5cd", "#f8f4f2", "#ffffff", "#414e66"],
    bodyFont: "Karla",
    displayFont: "Caveat",
  },
  Macchiato: {
    isLetterPaddingless: true,
    colors: ["#56817a", "#f8f8ff", "#39424b"],
    bodyFont: "Lato",
    displayFont: "Josefin Sans",
  },
  NeoBrutalism: {
    isLetterPaddingless: true,
    colors: [
      "#000000",
      "#ffffff",
      "#fdba74",
      "#fef08a",
      "#86efac",
      "#22d3ee",
      "#f472b6",
      "#f87171",
      "#818cf8",
    ],
    bodyFont: "Roboto",
    displayFont: "Archivo",
  },
  Oilcloth: {
    isLetterPaddingless: true,
    colors: ["#0f9ef8", "#ff9b08", "#43a385", "#ffffff", "#231f20"],
    bodyFont: "Open Sans",
    displayFont: "Yanone Kaffeesatz",
  },
  OpenResume: {
    isLetterPaddingless: true,
    colors: ["#38bdf8", "#000000"],
    bodyFont: "Roboto",
  },
  Paper: {
    isLetterPaddingless: false,
    colors: ["#cfcfcf", "#000000"],
    bodyFont: "Times New Roman",
  },
  Pharmacy: {
    isLetterPaddingless: false,
    colors: ["#06b6d4", "#475569", "#94a3b8", "#0f172a"],
    bodyFont: "Libre Franklin",
  },
  Red: {
    isLetterPaddingless: false,
    colors: ["#ab3134", "#231f20"],
    bodyFont: "Mulish",
    displayFont: "League Gothic",
  },
  Shelf: {
    isLetterPaddingless: false,
    colors: ["#000000"],
    bodyFont: "Archivo",
    displayFont: "Crimson Text",
  },
  StackOverflow: {
    isLetterPaddingless: false,
    colors: [
      "#202931",
      "#ff6d1f",
      "#757575",
      "#606d76",
      "#f1f8ff",
      "#3e6d8e",
      "#dfeaf1",
      "#ffffff",
      "#40484f",
    ],
    bodyFont: "Helvetica",
  },
  Stone: {
    isLetterPaddingless: false,
    colors: ["#000000", "#a1a1aa", "#e4e4e7", "#52525b"],
    bodyFont: "sans-serif",
    displayFont: "Kaisei Tokumin",
  },
  Toothpaste: {
    isLetterPaddingless: false,
    colors: ["#ed3660", "#5662e8", "#e8afcf", "#1e1e1e"],
    bodyFont: "Mulish",
    displayFont: "League Gothic",
  },
  Wiki: {
    isLetterPaddingless: false,
    colors: ["#1e3a8a", "#000000"],
    bodyFont: "Fira Sans",
  },
};

export const templateSettings: TemplateSettings = {
  default: {
    base: templateBaseSettings.default,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Aster: {
    base: templateBaseSettings.Aster,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Care: {
    base: templateBaseSettings.Care,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  CottonCandy: {
    base: templateBaseSettings.CottonCandy,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Cupcake: {
    base: templateBaseSettings.Cupcake,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Elegant: {
    base: templateBaseSettings.Elegant,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Kendall: {
    base: templateBaseSettings.Kendall,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Macaron: {
    base: templateBaseSettings.Macaron,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Macchiato: {
    base: templateBaseSettings.Macchiato,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  NeoBrutalism: {
    base: templateBaseSettings.NeoBrutalism,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Oilcloth: {
    base: templateBaseSettings.Oilcloth,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  OpenResume: {
    base: templateBaseSettings.OpenResume,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Paper: {
    base: templateBaseSettings.Paper,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Pharmacy: {
    base: templateBaseSettings.Pharmacy,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Red: {
    base: templateBaseSettings.Red,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Shelf: {
    base: templateBaseSettings.Shelf,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  StackOverflow: {
    base: templateBaseSettings.StackOverflow,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Stone: {
    base: templateBaseSettings.Stone,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Toothpaste: {
    base: templateBaseSettings.Toothpaste,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Wiki: {
    base: templateBaseSettings.Wiki,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
};

function scaffoldTemplateSettings(
  template: Template,
  baseSettings: BaseSettings,
  isLetterPaddingless: boolean,
) {
  const settings = {
    base: baseSettings,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  };
  settings.resume.document.bodyFont = baseSettings.bodyFont;
  settings.letter.document.bodyFont = baseSettings.bodyFont;
  settings.resume.document.color =
    baseSettings.colors[baseSettings.colors.length - 1];
  settings.letter.document.color =
    baseSettings.colors[baseSettings.colors.length - 1];

  if (isLetterPaddingless) {
    settings.letter.document.padding = [0, 0, 0, 0];
    settings.letter.senderDetails.margin[0] = 64;
    settings.letter.senderDetails.margin[1] = 64;
    settings.letter.senderDetails.margin[3] = 64;
    settings.letter.recipientDetails.margin[1] = 64;
    settings.letter.recipientDetails.margin[3] = 64;
    settings.letter.subject.margin[1] = 64;
    settings.letter.subject.margin[3] = 64;
    settings.letter.reference.margin[1] = 64;
    settings.letter.reference.margin[3] = 64;
    settings.letter.body.margin[1] = 64;
    settings.letter.body.margin[3] = 64;
  } else {
    settings.letter.header.margin = [0, 0, 0, 0];
  }
  templateSettings[template] = settings;
}

Object.entries(templateBaseSettings).forEach(([key, value]) => {
  scaffoldTemplateSettings(key as Template, value, value.isLetterPaddingless);
});

if (templateSettings.default.resume && templateSettings.default.letter) {
  templateSettings.default.resume.header.margin[2] = 20;
  templateSettings.default.resume.name.fontWeight = 600;
  templateSettings.default.resume.name.letterSpacing = 2;
  templateSettings.default.resume.title.color =
    templateBaseSettings.default.colors[1];
  templateSettings.default.resume.title.letterSpacing = 1;
  templateSettings.default.resume.about.isItalic = true;
  templateSettings.default.resume.about.color =
    templateBaseSettings.default.colors[1];
  templateSettings.default.resume.contactDetails.margin = [10, 0, 10, 0];
  templateSettings.default.resume.contactDetails.fontSize = 12;
  templateSettings.default.resume.category.margin[0] = 10;
  templateSettings.default.resume.categoryName.fontSize = 16;
  templateSettings.default.resume.categoryName.fontWeight = 600;
  templateSettings.default.resume.categoryName.letterSpacing = 1;
  templateSettings.default.resume.entry.layout = 2;
  templateSettings.default.resume.entry.margin[2] = 30;
  templateSettings.default.resume.entryTitle.fontSize = 15;
  templateSettings.default.resume.entryPeriod.fontSize = 12;
  templateSettings.default.resume.entryPeriod.color =
    templateBaseSettings.default.colors[1];
  templateSettings.default.resume.entryLocation.fontSize = 12;
  templateSettings.default.resume.entryLocation.color =
    templateBaseSettings.default.colors[1];
  templateSettings.default.resume.entrySummary.margin[0] = 10;
  templateSettings.default.resume.entryHighlight.margin[0] = 5;
  templateSettings.default.resume.entryHighlight.lineHeight = 1.2;
  templateSettings.default.resume.entryHighlight.fontSize = 13;
  templateSettings.default.resume.entryHighlight.isItalic = true;
  templateSettings.default.resume.entryTag.margin[0] = 15;
  templateSettings.default.letter.name.fontWeight = 600;
  templateSettings.default.letter.name.letterSpacing = 2;
  templateSettings.default.letter.title.color =
    templateBaseSettings.default.colors[1];
  templateSettings.default.letter.title.letterSpacing = 1;
  templateSettings.default.letter.about.isItalic = true;
  templateSettings.default.letter.about.color =
    templateBaseSettings.default.colors[1];
  templateSettings.default.letter.contactDetails.margin = [10, 0, 10, 0];
  templateSettings.default.letter.contactDetails.fontSize = 12;
}

if (templateSettings.Aster.resume && templateSettings.Aster.letter) {
  templateSettings.Aster.resume.document.padding = [0, 0, 0, 0];
  templateSettings.Aster.resume.header.layout = 2;
  templateSettings.Aster.resume.header.margin = [32, 32, 32, 32];
  templateSettings.Aster.resume.contactDetails.alignment = "end";
  templateSettings.Aster.resume.contactDetails.iconColor =
    templateBaseSettings.Aster.colors[0];
  templateSettings.Aster.resume.categoryName.width = 64;
  templateSettings.Aster.resume.categoryName.padding = [4, 4, 4, 32];
  templateSettings.Aster.resume.categoryName.backgroundColor =
    templateBaseSettings.Aster.colors[0];
  templateSettings.Aster.resume.categoryName.color =
    templateBaseSettings.Aster.colors[2];
  templateSettings.Aster.resume.categoryName.isUppercase = true;
  templateSettings.Aster.resume.categoryName.fontWeight = 600;
  templateSettings.Aster.resume.categoryNameSeparator.height = 6;
  templateSettings.Aster.resume.categoryNameSeparator.width = 65;
  templateSettings.Aster.resume.categoryNameSeparator.backgroundColor =
    templateBaseSettings.Aster.colors[1];
  templateSettings.Aster.resume.entry.padding = [8, 8, 8, 32];
  templateSettings.Aster.resume.entryPeriod.order = 1;
  templateSettings.Aster.resume.entryTitle.order = 2;
  templateSettings.Aster.resume.entryTitle.fontWeight = 500;
  templateSettings.Aster.resume.entryOrganization.isItalic = true;
  templateSettings.Aster.resume.entrySummary.padding[3] = 16;
  templateSettings.Aster.resume.entryHighlight.padding[3] = 16;
  templateSettings.Aster.resume.entryTag.margin[3] = 16;
  templateSettings.Aster.letter.header.layout = 2;
  templateSettings.Aster.letter.contactDetails.alignment = "end";
  templateSettings.Aster.letter.contactDetails.iconColor =
    templateBaseSettings.Aster.colors[0];
  templateSettings.Aster.letter.senderDetails.fontWeight = 300;
  templateSettings.Aster.letter.recipientDetails.fontWeight = 300;
  templateSettings.Aster.letter.subject.fontSize = 18;
  templateSettings.Aster.letter.subject.fontWeight = 300;
  templateSettings.Aster.letter.reference.fontSize = 15;
  templateSettings.Aster.letter.reference.fontWeight = 300;
  templateSettings.Aster.letter.reference.color =
    templateBaseSettings.Aster.colors[0];
  templateSettings.Aster.letter.body.fontWeight = 300;
  templateSettings.Aster.letter.body.lineHeight = 1.6;
}

if (templateSettings.Care.resume && templateSettings.Care.letter) {
  templateSettings.Care.resume.document.padding = [0, 0, 0, 0];
  templateSettings.Care.resume.document.backgroundColor =
    templateSettings.Care.base.colors[0];
  templateSettings.Care.resume.document.color =
    templateSettings.Care.base.colors[5];
  templateSettings.Care.resume.header.margin = [60, 60, 0, 60];
  templateSettings.Care.resume.header.layout = 5;
  templateSettings.Care.resume.name.font =
    templateSettings.Care.base.displayFont;
  templateSettings.Care.resume.name.isUppercase = true;
  templateSettings.Care.resume.name.letterSpacing = 4;
  templateSettings.Care.resume.name.color =
    templateSettings.Care.base.colors[1];
  templateSettings.Care.resume.title.font =
    templateSettings.Care.base.displayFont;
  templateSettings.Care.resume.title.color =
    templateSettings.Care.base.colors[3];
  templateSettings.Care.resume.title.margin = [12, 0, 0, 114];
  templateSettings.Care.resume.about.margin[3] = 218;
  templateSettings.Care.resume.contactDetails.margin = [44, 0, 0, 20];
  templateSettings.Care.resume.contactDetails.iconColor =
    templateSettings.Care.base.colors[3];
  templateSettings.Care.resume.contactDetails.color =
    templateSettings.Care.base.colors[5];
  templateSettings.Care.resume.body.margin = [60, 60, 60, 60];
  templateSettings.Care.resume.category.gap = 40;
  templateSettings.Care.resume.categoryName.isAside = true;
  templateSettings.Care.resume.categoryName.width = "fit";
  templateSettings.Care.resume.categoryName.font =
    templateSettings.Care.base.displayFont;
  templateSettings.Care.resume.categoryName.isUppercase = true;
  templateSettings.Care.resume.categoryName.letterSpacing = 2;
  templateSettings.Care.resume.categoryName.fontWeight = 500;
  templateSettings.Care.resume.categoryName.padding[2] = 12;
  templateSettings.Care.resume.categoryName.border[2] = 1;
  templateSettings.Care.resume.categoryName.margin[1] = 30;
  templateSettings.Care.resume.categoryName.margin[2] = 15;
  templateSettings.Care.resume.categoryName.color =
    templateSettings.Care.base.colors[1];
  templateSettings.Care.resume.entry.layout = 9;
  templateSettings.Care.resume.entryTitle.color =
    templateSettings.Care.base.colors[2];
  templateSettings.Care.resume.entryOrganization.order = 2;
  templateSettings.Care.resume.entryOrganization.color =
    templateSettings.Care.base.colors[4];
  templateSettings.Care.resume.entryOrganization.beforeSeparator = "|";
  templateSettings.Care.resume.entryLocation.order = 3;
  templateSettings.Care.resume.entryLocation.color =
    templateSettings.Care.base.colors[1];
  templateSettings.Care.resume.entryLocation.beforeSeparator = ",";
  templateSettings.Care.resume.entryPeriod.order = 4;
  templateSettings.Care.resume.entryPeriod.color =
    templateSettings.Care.base.colors[2];
  templateSettings.Care.resume.entryHighlight.listMarker = "disc";
  templateSettings.Care.resume.entryHighlight.color =
    templateSettings.Care.base.colors[1];
  templateSettings.Care.resume.entryTag.gap = 20;
  templateSettings.Care.resume.entryTag.backgroundColor = "transparent";
  templateSettings.Care.resume.entryTag.borderColor =
    templateSettings.Care.base.colors[3];
  templateSettings.Care.resume.entryTag.border = [2, 2, 2, 2];
  templateSettings.Care.resume.entryTag.borderRadius = 50;
  templateSettings.Care.letter.header.margin = [60, 60, 0, 60];
  templateSettings.Care.letter.document.backgroundColor =
    templateSettings.Care.base.colors[0];
  templateSettings.Care.letter.document.color =
    templateSettings.Care.base.colors[5];
  templateSettings.Care.letter.header.layout = 5;
  templateSettings.Care.letter.name.font =
    templateSettings.Care.base.displayFont;
  templateSettings.Care.letter.name.isUppercase = true;
  templateSettings.Care.letter.name.letterSpacing = 4;
  templateSettings.Care.letter.name.color =
    templateSettings.Care.base.colors[1];
  templateSettings.Care.letter.title.font =
    templateSettings.Care.base.displayFont;
  templateSettings.Care.letter.title.color =
    templateSettings.Care.base.colors[3];
  templateSettings.Care.letter.title.margin = [12, 0, 0, 114];
  templateSettings.Care.letter.about.margin[3] = 218;
  templateSettings.Care.letter.contactDetails.margin = [44, 0, 0, 20];
  templateSettings.Care.letter.contactDetails.iconColor =
    templateSettings.Care.base.colors[3];
  templateSettings.Care.letter.contactDetails.color =
    templateSettings.Care.base.colors[5];
  templateSettings.Care.letter.senderDetails.color =
    templateSettings.Care.base.colors[1];
  templateSettings.Care.letter.recipientDetails.color =
    templateSettings.Care.base.colors[1];
  templateSettings.Care.letter.subject.fontSize = 20;
  templateSettings.Care.letter.subject.font =
    templateSettings.Care.base.displayFont;
  templateSettings.Care.letter.subject.color =
    templateSettings.Care.base.colors[3];
  templateSettings.Care.letter.reference.color =
    templateSettings.Care.base.colors[1];
  templateSettings.Care.letter.reference.isItalic = true;
  templateSettings.Care.letter.reference.fontSize = 14;
  templateSettings.Care.letter.body.margin[0] = 10;
  templateSettings.Care.letter.body.isJustified = false;
  templateSettings.Care.letter.body.fontSize = 15;
}

if (
  templateSettings.CottonCandy.resume &&
  templateSettings.CottonCandy.letter
) {
  templateSettings.CottonCandy.resume.document.padding = [0, 0, 0, 0];
  templateSettings.CottonCandy.resume.header.layout = 1;
  templateSettings.CottonCandy.resume.header.padding = [24, 40, 24, 40];
  templateSettings.CottonCandy.resume.name.font =
    templateBaseSettings.CottonCandy.displayFont;
  templateSettings.CottonCandy.resume.name.fontSize = 36;
  templateSettings.CottonCandy.resume.name.isUppercase = true;
  templateSettings.CottonCandy.resume.name.textAlign = "center";
  templateSettings.CottonCandy.resume.name.padding = [0, 16, 0, 16];
  templateSettings.CottonCandy.resume.name.border[0] = 4;
  templateSettings.CottonCandy.resume.name.borderColor =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.resume.title.font =
    templateBaseSettings.CottonCandy.displayFont;
  templateSettings.CottonCandy.resume.title.fontSize = 24;
  templateSettings.CottonCandy.resume.title.isUppercase = true;
  templateSettings.CottonCandy.resume.title.textAlign = "center";
  templateSettings.CottonCandy.resume.title.padding = [0, 16, 0, 16];
  templateSettings.CottonCandy.resume.title.border[2] = 4;
  templateSettings.CottonCandy.resume.title.borderColor =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.resume.contactDetails.margin[3] = 22;
  templateSettings.CottonCandy.resume.contactDetails.color =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.resume.contactDetails.iconColor =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.resume.aboutQuote.isShown = true;
  templateSettings.CottonCandy.resume.aboutQuote.color =
    templateBaseSettings.CottonCandy.colors[1];
  templateSettings.CottonCandy.resume.aside.backgroundColor =
    templateBaseSettings.CottonCandy.colors[1];
  templateSettings.CottonCandy.resume.body.backgroundColor =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.resume.category.gap = 0;
  templateSettings.CottonCandy.resume.category.padding = [24, 40, 24, 40];
  templateSettings.CottonCandy.resume.categoryName.font =
    templateBaseSettings.CottonCandy.displayFont;
  templateSettings.CottonCandy.resume.categoryName.fontSize = 24;
  templateSettings.CottonCandy.resume.categoryName.color =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.categoryName.isUppercase = true;
  templateSettings.CottonCandy.resume.entry.layout = 1;
  templateSettings.CottonCandy.resume.entryTitle.font =
    templateBaseSettings.CottonCandy.displayFont;
  templateSettings.CottonCandy.resume.entryTitle.fontSize = 20;
  templateSettings.CottonCandy.resume.entryTitle.color =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entryPeriod.order = 3;
  templateSettings.CottonCandy.resume.entryPeriod.color =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entryPeriod.beforeSeparator = "·";
  templateSettings.CottonCandy.resume.entryOrganization.order = 2;
  templateSettings.CottonCandy.resume.entryOrganization.color =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entryLocation.order = 4;
  templateSettings.CottonCandy.resume.entryLocation.color =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entryLocation.beforeSeparator = "·";
  templateSettings.CottonCandy.resume.entrySummary.color =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entryHighlight.color =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entryHighlight.listMarkerColor =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entryHighlight.isItalic = true;
  templateSettings.CottonCandy.resume.entryTag.backgroundColor =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.letter.header.layout = 1;
  templateSettings.CottonCandy.letter.header.padding = [24, 40, 24, 40];
  templateSettings.CottonCandy.letter.name.font =
    templateBaseSettings.CottonCandy.displayFont;
  templateSettings.CottonCandy.letter.name.fontSize = 36;
  templateSettings.CottonCandy.letter.name.isUppercase = true;
  templateSettings.CottonCandy.letter.name.textAlign = "center";
  templateSettings.CottonCandy.letter.name.padding = [0, 16, 0, 16];
  templateSettings.CottonCandy.letter.name.border[0] = 4;
  templateSettings.CottonCandy.letter.name.borderColor =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.letter.title.font =
    templateBaseSettings.CottonCandy.displayFont;
  templateSettings.CottonCandy.letter.title.fontSize = 24;
  templateSettings.CottonCandy.letter.title.isUppercase = true;
  templateSettings.CottonCandy.letter.title.textAlign = "center";
  templateSettings.CottonCandy.letter.title.padding = [0, 16, 0, 16];
  templateSettings.CottonCandy.letter.title.border[2] = 4;
  templateSettings.CottonCandy.letter.title.borderColor =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.letter.contactDetails.margin[3] = 22;
  templateSettings.CottonCandy.letter.contactDetails.color =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.letter.contactDetails.iconColor =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.letter.senderDetails.color =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.letter.senderDetails.margin[0] = 40;
  templateSettings.CottonCandy.letter.senderDetails.margin[1] = 40;
  templateSettings.CottonCandy.letter.senderDetails.margin[3] = 40;
  templateSettings.CottonCandy.letter.senderDetails.isItalic = true;
  templateSettings.CottonCandy.letter.recipientDetails.color =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.letter.recipientDetails.margin[0] = 0;
  templateSettings.CottonCandy.letter.recipientDetails.margin[1] = 40;
  templateSettings.CottonCandy.letter.recipientDetails.margin[3] = 40;
  templateSettings.CottonCandy.letter.recipientDetails.isItalic = true;
  templateSettings.CottonCandy.letter.subject.fontWeight = 700;
  templateSettings.CottonCandy.letter.subject.margin[1] = 40;
  templateSettings.CottonCandy.letter.subject.margin[3] = 40;
  templateSettings.CottonCandy.letter.reference.fontSize = 11;
  templateSettings.CottonCandy.letter.reference.margin[1] = 40;
  templateSettings.CottonCandy.letter.reference.margin[3] = 40;
  templateSettings.CottonCandy.letter.body.margin[1] = 40;
  templateSettings.CottonCandy.letter.body.margin[3] = 40;
}

if (templateSettings.Cupcake.resume && templateSettings.Cupcake.letter) {
  templateSettings.Cupcake.resume.header.layout = 2;
  templateSettings.Cupcake.resume.contactDetails.alignment = "end";
  templateSettings.Cupcake.resume.contactDetails.color =
    templateBaseSettings.Cupcake.colors[1];
  templateSettings.Cupcake.resume.contactDetails.iconColor =
    templateBaseSettings.Cupcake.colors[1];
  templateSettings.Cupcake.resume.category.gap = 32;
  templateSettings.Cupcake.resume.categoryName.font =
    templateBaseSettings.Cupcake.displayFont;
  templateSettings.Cupcake.resume.categoryName.fontSize = 30;
  templateSettings.Cupcake.resume.categoryName.fontWeight = 700;
  templateSettings.Cupcake.resume.categoryName.lineHeight = 1.2;
  templateSettings.Cupcake.resume.categoryName.letterSpacing = 3;
  templateSettings.Cupcake.resume.categoryName.width = "fit";
  templateSettings.Cupcake.resume.categoryName.isUppercase = true;
  templateSettings.Cupcake.resume.categoryName.margin[2] = 16;
  templateSettings.Cupcake.resume.categoryName.margin[3] = 80;
  templateSettings.Cupcake.resume.categoryName.border[2] = 2;
  templateSettings.Cupcake.resume.categoryName.borderColor =
    templateBaseSettings.Cupcake.colors[1];
  templateSettings.Cupcake.resume.entry.layout = 3;
  templateSettings.Cupcake.resume.entryPeriod.order = 1;
  templateSettings.Cupcake.resume.entryPeriod.color =
    templateBaseSettings.Cupcake.colors[1];
  templateSettings.Cupcake.resume.entryTitle.order = 2;
  templateSettings.Cupcake.resume.entryTitle.isItalic = true;
  templateSettings.Cupcake.resume.entryHighlight.listMarker = "disc";
  templateSettings.Cupcake.resume.entryHighlight.listMarkerColor =
    templateBaseSettings.Cupcake.colors[0];
  templateSettings.Cupcake.resume.entryHighlight.color =
    templateBaseSettings.Cupcake.colors[3];
  templateSettings.Cupcake.resume.entryTag.backgroundColor =
    templateBaseSettings.Cupcake.colors[2];
  templateSettings.Cupcake.resume.entryTag.gap = 8;
  templateSettings.Cupcake.letter.header.layout = 2;
  templateSettings.Cupcake.letter.contactDetails.alignment = "end";
  templateSettings.Cupcake.letter.contactDetails.color =
    templateBaseSettings.Cupcake.colors[1];
  templateSettings.Cupcake.letter.contactDetails.iconColor =
    templateBaseSettings.Cupcake.colors[1];
  templateSettings.Cupcake.letter.senderDetails.fontSize = 16;
  templateSettings.Cupcake.letter.senderDetails.lineHeight = 1;
  templateSettings.Cupcake.letter.recipientDetails.fontSize = 16;
  templateSettings.Cupcake.letter.recipientDetails.lineHeight = 1;
  templateSettings.Cupcake.letter.subject.fontWeight = 600;
  templateSettings.Cupcake.letter.subject.fontSize = 20;
  templateSettings.Cupcake.letter.reference.fontSize = 15;
  templateSettings.Cupcake.letter.body.fontSize = 16;
}

if (templateSettings.Elegant.resume && templateSettings.Elegant.letter) {
  templateSettings.Elegant.resume.document.padding = [50, 50, 50, 50];
  templateSettings.Elegant.resume.header.layout = 0;
  templateSettings.Elegant.resume.name.textAlign = "center";
  templateSettings.Elegant.resume.name.fontSize = 24;
  templateSettings.Elegant.resume.name.fontWeight = 700;
  templateSettings.Elegant.resume.title.margin[0] = 10;
  templateSettings.Elegant.resume.title.textAlign = "center";
  templateSettings.Elegant.resume.title.color =
    templateSettings.Elegant.base.colors[1];
  templateSettings.Elegant.resume.contactDetails.margin[0] = 10;
  templateSettings.Elegant.resume.contactDetails.gap = 20;
  templateSettings.Elegant.resume.contactDetails.fontSize = 12;
  templateSettings.Elegant.resume.contactDetails.iconGap = 25;
  templateSettings.Elegant.resume.contactDetails.iconColor =
    templateSettings.Elegant.base.colors[1];
  templateSettings.Elegant.resume.contactDetails.color =
    templateSettings.Elegant.base.colors[6];
  templateSettings.Elegant.resume.aside.margin[0] = 20;
  templateSettings.Elegant.resume.aside.margin[1] = 40;
  templateSettings.Elegant.resume.body.margin[0] = 20;
  templateSettings.Elegant.resume.category.gap = 20;
  templateSettings.Elegant.resume.categoryName.color =
    templateSettings.Elegant.base.colors[1];
  templateSettings.Elegant.resume.categoryName.isUppercase = true;
  templateSettings.Elegant.resume.categoryName.fontSize = 18;
  templateSettings.Elegant.resume.categoryName.padding[2] = 10;
  templateSettings.Elegant.resume.categoryName.border[2] = 1;
  templateSettings.Elegant.resume.categoryName.borderColor =
    templateSettings.Elegant.base.colors[2];
  templateSettings.Elegant.resume.categoryName.margin[2] = 10;
  templateSettings.Elegant.resume.entry.layout = 8;
  templateSettings.Elegant.resume.entryTitle.fontWeight = 700;
  templateSettings.Elegant.resume.entryOrganization.order = 2;
  templateSettings.Elegant.resume.entryOrganization.beforeSeparator = "-";
  templateSettings.Elegant.resume.entryPeriod.order = 3;
  templateSettings.Elegant.resume.entryPeriod.color =
    templateSettings.Elegant.base.colors[1];
  templateSettings.Elegant.resume.entryPeriod.fontSize = 11;
  templateSettings.Elegant.resume.entryPeriod.fontWeight = 500;
  templateSettings.Elegant.resume.entryLocation.order = 4;
  templateSettings.Elegant.resume.entryLocation.beforeSeparator = ",";
  templateSettings.Elegant.resume.entryLocation.color =
    templateSettings.Elegant.base.colors[1];
  templateSettings.Elegant.resume.entryLocation.fontSize = 11;
  templateSettings.Elegant.resume.entryLocation.fontWeight = 500;
  templateSettings.Elegant.resume.entrySummary.margin[0] = 10;
  templateSettings.Elegant.resume.entryHighlight.margin[0] = 10;
  templateSettings.Elegant.resume.entryHighlight.margin[3] = 40;
  templateSettings.Elegant.resume.entryHighlight.listMarker = "circle";
  templateSettings.Elegant.resume.entryTag.margin[0] = 10;
  templateSettings.Elegant.resume.entryTag.gap = 5;
  templateSettings.Elegant.resume.entryTag.padding = [5, 5, 5, 5];
  templateSettings.Elegant.resume.entryTag.border = [1, 1, 1, 1];
  templateSettings.Elegant.resume.entryTag.borderColor =
    templateSettings.Elegant.base.colors[3];
  templateSettings.Elegant.resume.entryTag.backgroundColor =
    templateSettings.Elegant.base.colors[4];
  templateSettings.Elegant.resume.entryTag.color =
    templateSettings.Elegant.base.colors[5];
  templateSettings.Elegant.resume.entryTag.fontWeight = 700;
  templateSettings.Elegant.resume.entryTag.fontSize = 14;
  templateSettings.Elegant.resume.entryTag.lineHeight = 1;
  templateSettings.Elegant.letter.document.padding = [50, 50, 50, 50];
  templateSettings.Elegant.letter.header.layout = 0;
  templateSettings.Elegant.letter.name.textAlign = "center";
  templateSettings.Elegant.letter.name.fontSize = 24;
  templateSettings.Elegant.letter.name.fontWeight = 700;
  templateSettings.Elegant.letter.title.margin[0] = 10;
  templateSettings.Elegant.letter.title.textAlign = "center";
  templateSettings.Elegant.letter.title.color =
    templateSettings.Elegant.base.colors[1];
  templateSettings.Elegant.letter.contactDetails.margin[0] = 10;
  templateSettings.Elegant.letter.contactDetails.gap = 20;
  templateSettings.Elegant.letter.contactDetails.fontSize = 12;
  templateSettings.Elegant.letter.contactDetails.iconGap = 25;
  templateSettings.Elegant.letter.contactDetails.iconColor =
    templateSettings.Elegant.base.colors[1];
  templateSettings.Elegant.letter.contactDetails.color =
    templateSettings.Elegant.base.colors[6];
  templateSettings.Elegant.letter.subject.fontSize = 18;
  templateSettings.Elegant.letter.subject.fontWeight = 700;
  templateSettings.Elegant.letter.reference.margin[0] = 10;
  templateSettings.Elegant.letter.reference.color =
    templateSettings.Elegant.base.colors[1];
  templateSettings.Elegant.letter.reference.fontSize = 11;
  templateSettings.Elegant.letter.reference.fontWeight = 500;
  templateSettings.Elegant.letter.body.margin[0] = 20;
}

if (templateSettings.Kendall.resume && templateSettings.Kendall.letter) {
  templateSettings.Kendall.resume.document.padding = [0, 0, 0, 0];
  templateSettings.Kendall.resume.document.border = [10, 10, 10, 10];
  templateSettings.Kendall.resume.document.borderColor =
    templateSettings.Kendall.base.colors[0];
  templateSettings.Kendall.resume.header.padding = [15, 15, 15, 15];
  templateSettings.Kendall.resume.name.textAlign = "center";
  templateSettings.Kendall.resume.name.isUppercase = true;
  templateSettings.Kendall.resume.name.fontWeight = 800;
  templateSettings.Kendall.resume.name.letterSpacing = -1;
  templateSettings.Kendall.resume.name.fontSize = 26;
  templateSettings.Kendall.resume.title.textAlign = "center";
  templateSettings.Kendall.resume.title.isUppercase = true;
  templateSettings.Kendall.resume.title.fontWeight = 700;
  templateSettings.Kendall.resume.title.letterSpacing = -1;
  templateSettings.Kendall.resume.title.fontSize = 21;
  templateSettings.Kendall.resume.title.lineHeight = 1;
  templateSettings.Kendall.resume.title.color =
    templateSettings.Kendall.base.colors[3];
  templateSettings.Kendall.resume.contactDetails.margin[0] = 15;
  templateSettings.Kendall.resume.contactDetails.border[0] = 1;
  templateSettings.Kendall.resume.contactDetails.borderColor =
    templateSettings.Kendall.base.colors[4];
  templateSettings.Kendall.resume.contactDetails.padding[0] = 15;
  templateSettings.Kendall.resume.contactDetails.gap = 15;
  templateSettings.Kendall.resume.contactDetails.iconColor =
    templateSettings.Kendall.base.colors[2];
  templateSettings.Kendall.resume.aside.width = 33;
  templateSettings.Kendall.resume.aside.padding = [15, 15, 15, 15];
  templateSettings.Kendall.resume.body.padding = [15, 15, 15, 15];
  templateSettings.Kendall.resume.category.gap = 15;
  templateSettings.Kendall.resume.categoryName.isUppercase = true;
  templateSettings.Kendall.resume.categoryName.fontWeight = 700;
  templateSettings.Kendall.resume.categoryName.fontSize = 21;
  templateSettings.Kendall.resume.categoryName.color =
    templateSettings.Kendall.base.colors[2];
  templateSettings.Kendall.resume.entry.layout = 12;
  templateSettings.Kendall.resume.entryOrganization.order = 1;
  templateSettings.Kendall.resume.entryOrganization.fontWeight = 700;
  templateSettings.Kendall.resume.entryOrganization.fontSize = 17;
  templateSettings.Kendall.resume.entryLocation.order = 2;
  templateSettings.Kendall.resume.entryLocation.fontWeight = 700;
  templateSettings.Kendall.resume.entryLocation.fontSize = 17;
  templateSettings.Kendall.resume.entryPeriod.order = 3;
  templateSettings.Kendall.resume.entryPeriod.color =
    templateSettings.Kendall.base.colors[3];
  templateSettings.Kendall.resume.entryTitle.order = 4;
  templateSettings.Kendall.resume.entryTitle.fontWeight = 700;
  templateSettings.Kendall.resume.entryTitle.fontSize = 17;
  templateSettings.Kendall.resume.entryHighlight.margin[0] = 10;
  templateSettings.Kendall.resume.entryHighlight.listMarker = null;
  templateSettings.Kendall.resume.entryHighlight.border = [1, 1, 1, 1];
  templateSettings.Kendall.resume.entryHighlight.borderColor =
    templateSettings.Kendall.base.colors[4];
  templateSettings.Kendall.resume.entryHighlight.borderRadius = 4;
  templateSettings.Kendall.resume.entryHighlight.padding = [10, 15, 10, 15];
  templateSettings.Kendall.resume.entryTag.gap = 5;
  templateSettings.Kendall.resume.entryTag.margin[0] = 10;
  templateSettings.Kendall.resume.entryTag.backgroundColor =
    templateSettings.Kendall.base.colors[2];
  templateSettings.Kendall.resume.entryTag.color =
    templateSettings.Kendall.base.colors[7];
  templateSettings.Kendall.resume.entryTag.fontSize = 12;
  templateSettings.Kendall.resume.entryTag.padding = [1, 8, 1, 8];
  templateSettings.Kendall.resume.entryTag.borderRadius = 4;
  templateSettings.Kendall.letter.document.border = [10, 10, 10, 10];
  templateSettings.Kendall.letter.document.borderColor =
    templateSettings.Kendall.base.colors[0];
  templateSettings.Kendall.letter.header.padding = [15, 15, 15, 15];
  templateSettings.Kendall.letter.name.textAlign = "center";
  templateSettings.Kendall.letter.name.isUppercase = true;
  templateSettings.Kendall.letter.name.fontWeight = 800;
  templateSettings.Kendall.letter.name.letterSpacing = -1;
  templateSettings.Kendall.letter.name.fontSize = 26;
  templateSettings.Kendall.letter.title.textAlign = "center";
  templateSettings.Kendall.letter.title.isUppercase = true;
  templateSettings.Kendall.letter.title.fontWeight = 700;
  templateSettings.Kendall.letter.title.letterSpacing = -1;
  templateSettings.Kendall.letter.title.fontSize = 21;
  templateSettings.Kendall.letter.title.lineHeight = 1;
  templateSettings.Kendall.letter.title.color =
    templateSettings.Kendall.base.colors[3];
  templateSettings.Kendall.letter.contactDetails.margin[0] = 15;
  templateSettings.Kendall.letter.contactDetails.border[0] = 1;
  templateSettings.Kendall.letter.contactDetails.borderColor =
    templateSettings.Kendall.base.colors[4];
  templateSettings.Kendall.letter.contactDetails.padding[0] = 15;
  templateSettings.Kendall.letter.contactDetails.gap = 15;
  templateSettings.Kendall.letter.contactDetails.iconColor =
    templateSettings.Kendall.base.colors[2];
  templateSettings.Kendall.letter.senderDetails.color =
    templateSettings.Kendall.base.colors[2];
  templateSettings.Kendall.letter.recipientDetails.color =
    templateSettings.Kendall.base.colors[2];
  templateSettings.Kendall.letter.subject.isUppercase = true;
  templateSettings.Kendall.letter.subject.fontWeight = 800;
  templateSettings.Kendall.letter.reference.color =
    templateSettings.Kendall.base.colors[2];
}

if (templateSettings.Macaron.resume && templateSettings.Macaron.letter) {
  templateSettings.Macaron.resume.document.padding = [0, 0, 0, 0];
  templateSettings.Macaron.resume.header.layout = 0;
  templateSettings.Macaron.resume.header.margin = [68, 0, 20, 0];
  templateSettings.Macaron.resume.header.border = [1, 0, 1, 0];
  templateSettings.Macaron.resume.header.borderColor =
    templateBaseSettings.Macaron.colors[2];
  templateSettings.Macaron.resume.header.padding = [12, 40, 12, 40];
  templateSettings.Macaron.resume.header.backgroundColor =
    templateBaseSettings.Macaron.colors[3];
  templateSettings.Macaron.resume.name.fontSize = 36;
  templateSettings.Macaron.resume.name.fontWeight = 600;
  templateSettings.Macaron.resume.name.isUppercase = true;
  templateSettings.Macaron.resume.name.letterSpacing = 10;
  templateSettings.Macaron.resume.title.fontSize = 24;
  templateSettings.Macaron.resume.title.fontWeight = 600;
  templateSettings.Macaron.resume.title.isUppercase = true;
  templateSettings.Macaron.resume.title.letterSpacing = 5;
  templateSettings.Macaron.resume.contactDetails.listOrientation = "row";
  templateSettings.Macaron.resume.contactDetails.gap = 20;
  templateSettings.Macaron.resume.contactDetails.iconColor =
    templateBaseSettings.Macaron.colors[1];
  templateSettings.Macaron.resume.about.font =
    templateBaseSettings.Macaron.displayFont;
  templateSettings.Macaron.resume.about.fontSize = 16;
  templateSettings.Macaron.resume.about.fontWeight = 500;
  templateSettings.Macaron.resume.aside.width = 25;
  templateSettings.Macaron.resume.aside.margin = [40, 0, 40, 40];
  templateSettings.Macaron.resume.body.margin = [40, 40, 40, 40];
  templateSettings.Macaron.resume.category.gap = 30;
  templateSettings.Macaron.resume.categoryName.color =
    templateBaseSettings.Macaron.colors[0];
  templateSettings.Macaron.resume.categoryName.fontSize = 24;
  templateSettings.Macaron.resume.categoryName.fontWeight = 600;
  templateSettings.Macaron.resume.entry.layout = 4;
  templateSettings.Macaron.resume.entryPeriod.order = 1;
  templateSettings.Macaron.resume.entryPeriod.color =
    templateBaseSettings.Macaron.colors[0];
  templateSettings.Macaron.resume.entryPeriod.fontWeight = 700;
  templateSettings.Macaron.resume.entryTitle.order = 2;
  templateSettings.Macaron.resume.entryTitle.fontWeight = 700;
  templateSettings.Macaron.resume.entryOrganization.order = 3;
  templateSettings.Macaron.resume.entryOrganization.fontWeight = 300;
  templateSettings.Macaron.resume.entryLocation.order = 4;
  templateSettings.Macaron.resume.entryLocation.fontWeight = 300;
  templateSettings.Macaron.resume.entrySummary.fontWeight = 300;
  templateSettings.Macaron.resume.entryHighlight.isItalic = true;
  templateSettings.Macaron.resume.entryHighlight.listMarker = "disc";
  templateSettings.Macaron.resume.entryTag.padding[1] = 8;
  templateSettings.Macaron.resume.entryTag.padding[3] = 8;
  templateSettings.Macaron.resume.entryTag.backgroundColor =
    templateBaseSettings.Macaron.colors[3];
  templateSettings.Macaron.resume.entryTag.borderColor =
    templateBaseSettings.Macaron.colors[2];
  templateSettings.Macaron.resume.entryTag.border[2] = 1;
  templateSettings.Macaron.resume.entryTag.gap = 20;
  templateSettings.Macaron.letter.header.layout = 0;
  templateSettings.Macaron.letter.header.margin = [68, 0, 20, 0];
  templateSettings.Macaron.letter.header.border = [1, 0, 1, 0];
  templateSettings.Macaron.letter.header.borderColor =
    templateBaseSettings.Macaron.colors[2];
  templateSettings.Macaron.letter.header.padding = [12, 40, 12, 40];
  templateSettings.Macaron.letter.header.backgroundColor =
    templateBaseSettings.Macaron.colors[3];
  templateSettings.Macaron.letter.name.fontSize = 36;
  templateSettings.Macaron.letter.name.fontWeight = 600;
  templateSettings.Macaron.letter.name.isUppercase = true;
  templateSettings.Macaron.letter.name.letterSpacing = 10;
  templateSettings.Macaron.letter.title.fontSize = 24;
  templateSettings.Macaron.letter.title.fontWeight = 600;
  templateSettings.Macaron.letter.title.isUppercase = true;
  templateSettings.Macaron.letter.title.letterSpacing = 5;
  templateSettings.Macaron.letter.contactDetails.listOrientation = "row";
  templateSettings.Macaron.letter.contactDetails.gap = 20;
  templateSettings.Macaron.letter.contactDetails.iconColor =
    templateBaseSettings.Macaron.colors[1];
  templateSettings.Macaron.letter.about.font =
    templateBaseSettings.Macaron.displayFont;
  templateSettings.Macaron.letter.about.fontSize = 16;
  templateSettings.Macaron.letter.about.fontWeight = 500;
  templateSettings.Macaron.letter.subject.fontWeight = 600;
  templateSettings.Macaron.letter.subject.fontSize = 19;
  templateSettings.Macaron.letter.reference.color =
    templateBaseSettings.Macaron.colors[0];
  templateSettings.Macaron.letter.reference.fontSize = 16;
}

if (templateSettings.Macchiato.resume && templateSettings.Macchiato.letter) {
  templateSettings.Macchiato.resume.document.padding = [0, 0, 0, 0];
  templateSettings.Macchiato.resume.document.border = [10, 0, 0, 0];
  templateSettings.Macchiato.resume.document.borderColor =
    templateBaseSettings.Macchiato.colors[0];
  templateSettings.Macchiato.resume.header.layout = 0;
  templateSettings.Macchiato.resume.header.margin = [48, 48, 20, 48];
  templateSettings.Macchiato.resume.name.font =
    templateBaseSettings.Macchiato.displayFont;
  templateSettings.Macchiato.resume.name.fontSize = 36;
  templateSettings.Macchiato.resume.name.fontWeight = 700;
  templateSettings.Macchiato.resume.name.letterSpacing = 1;
  templateSettings.Macchiato.resume.title.font =
    templateBaseSettings.Macchiato.displayFont;
  templateSettings.Macchiato.resume.title.fontSize = 20;
  templateSettings.Macchiato.resume.title.fontWeight = 300;
  templateSettings.Macchiato.resume.title.letterSpacing = 1;
  templateSettings.Macchiato.resume.contactDetails.fontSize = 11;
  templateSettings.Macchiato.resume.categoryName.font =
    templateBaseSettings.Macchiato.displayFont;
  templateSettings.Macchiato.resume.categoryName.fontWeight = 300;
  templateSettings.Macchiato.resume.categoryNameSeparator.margin[0] = 4;
  templateSettings.Macchiato.resume.categoryNameSeparator.border[0] = 1;
  templateSettings.Macchiato.resume.categoryNameSeparator.width = 7;
  templateSettings.Macchiato.resume.category.margin = [0, 48, 20, 48];
  templateSettings.Macchiato.resume.entry.layout = 5;
  templateSettings.Macchiato.resume.entryPeriod.order = 1;
  templateSettings.Macchiato.resume.entryPeriod.fontWeight = 300;
  templateSettings.Macchiato.resume.entryPeriod.isItalic = true;
  templateSettings.Macchiato.resume.entryTitle.order = 2;
  templateSettings.Macchiato.resume.entryTitle.fontWeight = 300;
  templateSettings.Macchiato.resume.entryOrganization.fontSize = 12;
  templateSettings.Macchiato.resume.entryLocation.fontSize = 12;
  templateSettings.Macchiato.resume.entrySummary.fontSize = 12;
  templateSettings.Macchiato.resume.entryHighlight.fontSize = 12;
  templateSettings.Macchiato.resume.entryHighlight.listMarker = "disc";
  templateSettings.Macchiato.resume.entryTag.padding = [2, 2, 2, 2];
  templateSettings.Macchiato.resume.entryTag.backgroundColor =
    templateBaseSettings.Macchiato.colors[1];
  templateSettings.Macchiato.resume.entryTag.gap = 4;
  templateSettings.Macchiato.letter.document.border = [10, 0, 0, 0];
  templateSettings.Macchiato.letter.document.borderColor =
    templateBaseSettings.Macchiato.colors[0];
  templateSettings.Macchiato.letter.header.layout = 0;
  templateSettings.Macchiato.letter.header.margin = [48, 48, 20, 48];
  templateSettings.Macchiato.letter.name.font =
    templateBaseSettings.Macchiato.displayFont;
  templateSettings.Macchiato.letter.name.fontSize = 36;
  templateSettings.Macchiato.letter.name.fontWeight = 700;
  templateSettings.Macchiato.letter.name.letterSpacing = 1;
  templateSettings.Macchiato.letter.title.font =
    templateBaseSettings.Macchiato.displayFont;
  templateSettings.Macchiato.letter.title.fontSize = 20;
  templateSettings.Macchiato.letter.title.fontWeight = 300;
  templateSettings.Macchiato.letter.title.letterSpacing = 1;
  templateSettings.Macchiato.letter.contactDetails.fontSize = 11;
  templateSettings.Macchiato.letter.senderDetails.margin = [48, 48, 48, 48];
  templateSettings.Macchiato.letter.senderDetails.fontSize = 12;
  templateSettings.Macchiato.letter.recipientDetails.margin = [0, 48, 48, 48];
  templateSettings.Macchiato.letter.recipientDetails.fontSize = 12;
  templateSettings.Macchiato.letter.subject.margin[1] = 48;
  templateSettings.Macchiato.letter.subject.margin[3] = 48;
  templateSettings.Macchiato.letter.subject.font =
    templateBaseSettings.Macchiato.displayFont;
  templateSettings.Macchiato.letter.subject.fontSize = 17;
  templateSettings.Macchiato.letter.reference.margin[1] = 48;
  templateSettings.Macchiato.letter.reference.margin[3] = 48;
  templateSettings.Macchiato.letter.reference.color =
    templateBaseSettings.Macchiato.colors[0];
  templateSettings.Macchiato.letter.body.margin = [24, 48, 48, 48];
}

if (
  templateSettings.NeoBrutalism.resume &&
  templateSettings.NeoBrutalism.letter
) {
  templateSettings.NeoBrutalism.resume.document.padding = [0, 0, 0, 0];
  templateSettings.NeoBrutalism.resume.document.color =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.resume.document.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[2];
  templateSettings.NeoBrutalism.resume.header.layout = 2;
  templateSettings.NeoBrutalism.resume.header.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[3];
  templateSettings.NeoBrutalism.resume.header.border[2] = 4;
  templateSettings.NeoBrutalism.resume.header.borderColor =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.resume.name.color =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.resume.name.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[5];
  templateSettings.NeoBrutalism.resume.name.isUppercase = true;
  templateSettings.NeoBrutalism.resume.name.font =
    templateSettings.NeoBrutalism.base.displayFont;
  templateSettings.NeoBrutalism.resume.name.fontSize = 36;
  templateSettings.NeoBrutalism.resume.name.fontWeight = 900;
  templateSettings.NeoBrutalism.resume.name.letterSpacing = 1;
  templateSettings.NeoBrutalism.resume.name.padding = [8, 8, 8, 8];
  templateSettings.NeoBrutalism.resume.name.border = [4, 8, 8, 4];
  templateSettings.NeoBrutalism.resume.name.borderRadius = 8;
  templateSettings.NeoBrutalism.resume.name.margin = [22, 22, 22, 22];
  templateSettings.NeoBrutalism.resume.title.color =
    templateSettings.NeoBrutalism.base.colors[6];
  templateSettings.NeoBrutalism.resume.title.isItalic = true;
  templateSettings.NeoBrutalism.resume.title.fontWeight = 700;
  templateSettings.NeoBrutalism.resume.title.borderColor =
    templateSettings.NeoBrutalism.base.colors[6];
  templateSettings.NeoBrutalism.resume.title.border[2] = 2;
  templateSettings.NeoBrutalism.resume.title.borderStyle = "dashed";
  templateSettings.NeoBrutalism.resume.title.padding = [0, 22, 0, 22];
  templateSettings.NeoBrutalism.resume.about.color =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.resume.about.margin = [0, 22, 0, 22];
  templateSettings.NeoBrutalism.resume.about.textAlign = "right";
  templateSettings.NeoBrutalism.resume.contactDetails.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[4];
  templateSettings.NeoBrutalism.resume.contactDetails.color =
    templateSettings.NeoBrutalism.base.colors[1];
  templateSettings.NeoBrutalism.resume.contactDetails.iconColor =
    templateSettings.NeoBrutalism.base.colors[6];
  templateSettings.NeoBrutalism.resume.contactDetails.border[3] = 4;
  templateSettings.NeoBrutalism.resume.contactDetails.borderColor =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.resume.contactDetails.padding = [
    22, 22, 22, 22,
  ];
  templateSettings.NeoBrutalism.resume.aside.padding = [22, 22, 22, 22];
  templateSettings.NeoBrutalism.resume.aside.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[6];
  templateSettings.NeoBrutalism.resume.aside.borderColor =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.resume.aside.border[1] = 4;
  templateSettings.NeoBrutalism.resume.body.margin = [22, 22, 22, 22];
  templateSettings.NeoBrutalism.resume.categoryName.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[7];
  templateSettings.NeoBrutalism.resume.categoryName.borderColor =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.resume.categoryName.border = [4, 8, 8, 4];
  templateSettings.NeoBrutalism.resume.categoryName.borderRadius = 8;
  templateSettings.NeoBrutalism.resume.categoryName.padding = [4, 4, 4, 4];
  templateSettings.NeoBrutalism.resume.categoryName.isUppercase = true;
  templateSettings.NeoBrutalism.resume.categoryName.fontWeight = 900;
  templateSettings.NeoBrutalism.resume.categoryName.fontSize = 22;
  templateSettings.NeoBrutalism.resume.categoryName.letterSpacing = 8;
  templateSettings.NeoBrutalism.resume.categoryName.margin[2] = 8;
  templateSettings.NeoBrutalism.resume.entry.layout = 1;
  templateSettings.NeoBrutalism.resume.entryTitle.color =
    templateSettings.NeoBrutalism.base.colors[1];
  templateSettings.NeoBrutalism.resume.entryTitle.isUppercase = true;
  templateSettings.NeoBrutalism.resume.entryTitle.letterSpacing = 2;
  templateSettings.NeoBrutalism.resume.entryTitle.fontWeight = 700;
  templateSettings.NeoBrutalism.resume.entryOrganization.order = 2;
  templateSettings.NeoBrutalism.resume.entryOrganization.fontWeight = 700;
  templateSettings.NeoBrutalism.resume.entryOrganization.color =
    templateSettings.NeoBrutalism.base.colors[8];
  templateSettings.NeoBrutalism.resume.entryLocation.order = 3;
  templateSettings.NeoBrutalism.resume.entryLocation.beforeSeparator = "·";
  templateSettings.NeoBrutalism.resume.entryLocation.fontWeight = 700;
  templateSettings.NeoBrutalism.resume.entryLocation.color =
    templateSettings.NeoBrutalism.base.colors[8];
  templateSettings.NeoBrutalism.resume.entryPeriod.order = 4;
  templateSettings.NeoBrutalism.resume.entryPeriod.beforeSeparator = "·";
  templateSettings.NeoBrutalism.resume.entryPeriod.fontWeight = 700;
  templateSettings.NeoBrutalism.resume.entryPeriod.color =
    templateSettings.NeoBrutalism.base.colors[8];
  templateSettings.NeoBrutalism.resume.entryHighlight.listMarker = "disc";
  templateSettings.NeoBrutalism.resume.entryHighlight.listMarkerColor =
    templateSettings.NeoBrutalism.base.colors[7];
  templateSettings.NeoBrutalism.resume.entryHighlight.color =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.resume.entryTag.border = [2, 4, 4, 2];
  templateSettings.NeoBrutalism.resume.entryTag.padding = [8, 8, 8, 8];
  templateSettings.NeoBrutalism.resume.entryTag.backgroundColor =
    templateBaseSettings.NeoBrutalism.colors[6];
  templateSettings.NeoBrutalism.resume.entryTag.fontWeight = 900;
  templateSettings.NeoBrutalism.resume.entryTag.isUppercase = true;
  templateSettings.NeoBrutalism.resume.entryTag.gap = 20;
  templateSettings.NeoBrutalism.letter.header.layout = 2;
  templateSettings.NeoBrutalism.letter.document.color =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.letter.document.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[2];
  templateSettings.NeoBrutalism.letter.header.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[3];
  templateSettings.NeoBrutalism.letter.header.border[2] = 4;
  templateSettings.NeoBrutalism.letter.header.borderColor =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.letter.name.color =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.letter.name.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[5];
  templateSettings.NeoBrutalism.letter.name.isUppercase = true;
  templateSettings.NeoBrutalism.letter.name.font =
    templateSettings.NeoBrutalism.base.displayFont;
  templateSettings.NeoBrutalism.letter.name.fontSize = 36;
  templateSettings.NeoBrutalism.letter.name.fontWeight = 900;
  templateSettings.NeoBrutalism.letter.name.letterSpacing = 1;
  templateSettings.NeoBrutalism.letter.name.padding = [8, 8, 8, 8];
  templateSettings.NeoBrutalism.letter.name.border = [4, 8, 8, 4];
  templateSettings.NeoBrutalism.letter.name.borderRadius = 8;
  templateSettings.NeoBrutalism.letter.name.margin = [22, 22, 22, 22];
  templateSettings.NeoBrutalism.letter.title.color =
    templateSettings.NeoBrutalism.base.colors[6];
  templateSettings.NeoBrutalism.letter.title.isItalic = true;
  templateSettings.NeoBrutalism.letter.title.fontWeight = 700;
  templateSettings.NeoBrutalism.letter.title.borderColor =
    templateSettings.NeoBrutalism.base.colors[6];
  templateSettings.NeoBrutalism.letter.title.border[2] = 2;
  templateSettings.NeoBrutalism.letter.title.borderStyle = "dashed";
  templateSettings.NeoBrutalism.letter.title.padding = [0, 22, 0, 22];
  templateSettings.NeoBrutalism.letter.about.color =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.letter.about.margin = [0, 22, 0, 22];
  templateSettings.NeoBrutalism.letter.about.textAlign = "right";
  templateSettings.NeoBrutalism.letter.contactDetails.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[4];
  templateSettings.NeoBrutalism.letter.contactDetails.color =
    templateSettings.NeoBrutalism.base.colors[1];
  templateSettings.NeoBrutalism.letter.contactDetails.iconColor =
    templateSettings.NeoBrutalism.base.colors[6];
  templateSettings.NeoBrutalism.letter.contactDetails.border[3] = 4;
  templateSettings.NeoBrutalism.letter.contactDetails.borderColor =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.letter.contactDetails.padding = [
    22, 22, 22, 22,
  ];
  templateSettings.NeoBrutalism.letter.senderDetails.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[4];
  templateSettings.NeoBrutalism.letter.senderDetails.color =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.letter.senderDetails.padding = [8, 8, 8, 8];
  templateSettings.NeoBrutalism.letter.senderDetails.border = [4, 8, 8, 4];
  templateSettings.NeoBrutalism.letter.senderDetails.borderRadius = 8;
  templateSettings.NeoBrutalism.letter.senderDetails.borderColor =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.letter.recipientDetails.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[5];
  templateSettings.NeoBrutalism.letter.recipientDetails.color =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.letter.recipientDetails.padding = [8, 8, 8, 8];
  templateSettings.NeoBrutalism.letter.recipientDetails.border = [4, 8, 8, 4];
  templateSettings.NeoBrutalism.letter.recipientDetails.borderRadius = 8;
  templateSettings.NeoBrutalism.letter.recipientDetails.borderColor =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.letter.subject.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[6];
  templateSettings.NeoBrutalism.letter.subject.color =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.letter.subject.padding = [8, 8, 8, 8];
  templateSettings.NeoBrutalism.letter.subject.border = [4, 8, 8, 4];
  templateSettings.NeoBrutalism.letter.subject.borderRadius = 8;
  templateSettings.NeoBrutalism.letter.subject.borderColor =
    templateSettings.NeoBrutalism.base.colors[0];
  templateSettings.NeoBrutalism.letter.reference.backgroundColor =
    templateSettings.NeoBrutalism.base.colors[2];
  templateSettings.NeoBrutalism.letter.reference.color =
    templateSettings.NeoBrutalism.base.colors[8];
  templateSettings.NeoBrutalism.letter.reference.fontWeight = 700;
}

if (templateSettings.Oilcloth.resume && templateSettings.Oilcloth.letter) {
  templateSettings.Oilcloth.resume.document.padding = [0, 0, 0, 0];
  templateSettings.Oilcloth.resume.document.border = [15, 0, 20, 0];
  templateSettings.Oilcloth.resume.document.borderColor =
    templateBaseSettings.Oilcloth.colors[1];
  templateSettings.Oilcloth.resume.header.layout = 2;
  templateSettings.Oilcloth.resume.header.backgroundColor =
    templateBaseSettings.Oilcloth.colors[0];
  templateSettings.Oilcloth.resume.header.padding = [30, 40, 30, 40];
  templateSettings.Oilcloth.resume.name.color =
    templateBaseSettings.Oilcloth.colors[1];
  templateSettings.Oilcloth.resume.name.fontSize = 40;
  templateSettings.Oilcloth.resume.name.fontWeight = 900;
  templateSettings.Oilcloth.resume.name.letterSpacing = 2;
  templateSettings.Oilcloth.resume.title.color =
    templateBaseSettings.Oilcloth.colors[3];
  templateSettings.Oilcloth.resume.title.fontWeight = 600;
  templateSettings.Oilcloth.resume.title.isUppercase = true;
  templateSettings.Oilcloth.resume.title.letterSpacing = 4;
  templateSettings.Oilcloth.resume.about.color =
    templateBaseSettings.Oilcloth.colors[3];
  templateBaseSettings.Oilcloth.colors[3];
  templateSettings.Oilcloth.resume.contactDetails.fontWeight = 600;
  templateSettings.Oilcloth.resume.contactDetails.color =
    templateBaseSettings.Oilcloth.colors[3];
  templateSettings.Oilcloth.resume.contactDetails.iconColor =
    templateBaseSettings.Oilcloth.colors[1];
  templateSettings.Oilcloth.resume.aside.margin = [40, 0, 40, 40];
  templateSettings.Oilcloth.resume.body.margin = [40, 40, 40, 40];
  templateSettings.Oilcloth.resume.category.gap = 40;
  templateSettings.Oilcloth.resume.categoryName.isUppercase = true;
  templateSettings.Oilcloth.resume.categoryName.textAlign = "center";
  templateSettings.Oilcloth.resume.categoryName.fontSize = 25;
  templateSettings.Oilcloth.resume.categoryName.letterSpacing = 2;
  templateSettings.Oilcloth.resume.categoryName.fontWeight = 300;
  templateSettings.Oilcloth.resume.categoryName.margin[2] = 5;
  templateSettings.Oilcloth.resume.entry.layout = 6;
  templateSettings.Oilcloth.resume.entryPeriod.order = 1;
  templateSettings.Oilcloth.resume.entryPeriod.color =
    templateBaseSettings.Oilcloth.colors[1];
  templateSettings.Oilcloth.resume.entryPeriod.fontSize = 16;
  templateSettings.Oilcloth.resume.entryPeriod.fontWeight = 700;
  templateSettings.Oilcloth.resume.entryTitle.order = 2;
  templateSettings.Oilcloth.resume.entryTitle.fontSize = 16;
  templateSettings.Oilcloth.resume.entryTitle.fontWeight = 900;
  templateSettings.Oilcloth.resume.entryOrganization.fontWeight = 300;
  templateSettings.Oilcloth.resume.entryOrganization.lineHeight = 1;
  templateSettings.Oilcloth.resume.entryLocation.beforeSeparator = "-";
  templateSettings.Oilcloth.resume.entryLocation.fontWeight = 300;
  templateSettings.Oilcloth.resume.entryLocation.lineHeight = 1;
  templateSettings.Oilcloth.resume.entrySummary.color =
    templateBaseSettings.Oilcloth.colors[0];
  templateSettings.Oilcloth.resume.entrySummary.margin = [10, 0, 10, 0];
  templateSettings.Oilcloth.resume.entrySummary.lineHeight = 1;
  templateSettings.Oilcloth.resume.entryHighlight.fontWeight = 300;
  templateSettings.Oilcloth.resume.entryHighlight.lineHeight = 1;
  templateSettings.Oilcloth.resume.entryTag.margin[0] = 10;
  templateSettings.Oilcloth.resume.entryTag.padding = [4, 12, 4, 12];
  templateSettings.Oilcloth.resume.entryTag.backgroundColor =
    templateBaseSettings.Oilcloth.colors[0];
  templateSettings.Oilcloth.resume.entryTag.color =
    templateBaseSettings.Oilcloth.colors[3];
  templateSettings.Oilcloth.resume.entryTag.isUppercase = true;
  templateSettings.Oilcloth.resume.entryTag.fontSize = 11;
  templateSettings.Oilcloth.resume.entryTag.lineHeight = 1;
  templateSettings.Oilcloth.resume.entryTag.gap = 10;
  templateSettings.Oilcloth.letter.document.border = [15, 0, 20, 0];
  templateSettings.Oilcloth.letter.document.borderColor =
    templateBaseSettings.Oilcloth.colors[1];
  templateSettings.Oilcloth.letter.header.layout = 2;
  templateSettings.Oilcloth.letter.header.padding = [30, 40, 30, 40];
  templateSettings.Oilcloth.letter.name.color =
    templateBaseSettings.Oilcloth.colors[1];
  templateSettings.Oilcloth.letter.name.fontSize = 40;
  templateSettings.Oilcloth.letter.name.fontWeight = 900;
  templateSettings.Oilcloth.letter.name.letterSpacing = 2;
  templateSettings.Oilcloth.letter.title.color =
    templateBaseSettings.Oilcloth.colors[0];
  templateSettings.Oilcloth.letter.title.fontWeight = 600;
  templateSettings.Oilcloth.letter.title.isUppercase = true;
  templateSettings.Oilcloth.letter.title.letterSpacing = 4;
  templateSettings.Oilcloth.letter.about.color =
    templateBaseSettings.Oilcloth.colors[0];
  templateBaseSettings.Oilcloth.colors[0];
  templateSettings.Oilcloth.letter.contactDetails.fontWeight = 600;
  templateSettings.Oilcloth.letter.contactDetails.color =
    templateBaseSettings.Oilcloth.colors[0];
  templateSettings.Oilcloth.letter.contactDetails.iconColor =
    templateBaseSettings.Oilcloth.colors[1];
  templateSettings.Oilcloth.letter.senderDetails.color =
    templateBaseSettings.Oilcloth.colors[0];
  templateSettings.Oilcloth.letter.recipientDetails.color =
    templateBaseSettings.Oilcloth.colors[0];
}

if (templateSettings.OpenResume.resume && templateSettings.OpenResume.letter) {
  templateSettings.OpenResume.resume.document.padding = [0, 0, 0, 0];
  templateSettings.OpenResume.resume.document.border = [8, 0, 0, 0];
  templateSettings.OpenResume.resume.document.borderColor =
    templateBaseSettings.OpenResume.colors[0];
  templateSettings.OpenResume.resume.header.layout = 0;
  templateSettings.OpenResume.resume.header.margin = [24, 48, 24, 48];
  templateSettings.OpenResume.resume.name.color =
    templateBaseSettings.OpenResume.colors[0];
  templateSettings.OpenResume.resume.name.fontSize = 30;
  templateSettings.OpenResume.resume.name.fontWeight = 700;
  templateSettings.OpenResume.resume.name.lineHeight = 1.2;
  templateSettings.OpenResume.resume.name.margin[2] = 10;
  templateSettings.OpenResume.resume.title.fontSize = 20;
  templateSettings.OpenResume.resume.title.fontWeight = 700;
  templateSettings.OpenResume.resume.title.lineHeight = 1.2;
  templateSettings.OpenResume.resume.title.margin[2] = 10;
  templateSettings.OpenResume.resume.contactDetails.listOrientation = "row";
  templateSettings.OpenResume.resume.contactDetails.gap = 40;
  templateSettings.OpenResume.resume.about.isItalic = true;
  templateSettings.OpenResume.resume.about.textAlign = "center";
  templateSettings.OpenResume.resume.aside.margin = [24, 0, 24, 48];
  templateSettings.OpenResume.resume.body.margin = [24, 48, 24, 48];
  templateSettings.OpenResume.resume.categoryName.fontWeight = 700;
  templateSettings.OpenResume.resume.categoryName.fontSize = 12;
  templateSettings.OpenResume.resume.categoryNameSeparator.position = "left";
  templateSettings.OpenResume.resume.categoryNameSeparator.height = 4;
  templateSettings.OpenResume.resume.categoryNameSeparator.width = 8;
  templateSettings.OpenResume.resume.categoryNameSeparator.margin[1] = 10;
  templateSettings.OpenResume.resume.categoryNameSeparator.backgroundColor =
    templateBaseSettings.OpenResume.colors[0];
  templateSettings.OpenResume.resume.entry.layout = 7;
  templateSettings.OpenResume.resume.entryTitle.fontWeight = 600;
  templateSettings.OpenResume.resume.entryOrganization.order = 2;
  templateSettings.OpenResume.resume.entryLocation.order = 3;
  templateSettings.OpenResume.resume.entryLocation.beforeSeparator = ",";
  templateSettings.OpenResume.resume.entryPeriod.order = 4;
  templateSettings.OpenResume.resume.entrySummary.isItalic = true;
  templateSettings.OpenResume.resume.entryHighlight.listMarker = "disc";
  templateSettings.OpenResume.resume.entryHighlight.fontSize = 12;
  templateSettings.OpenResume.resume.entryTag.margin[0] = 10;
  templateSettings.OpenResume.resume.entryTag.gap = 10;
  templateSettings.OpenResume.letter.document.border = [8, 0, 0, 0];
  templateSettings.OpenResume.letter.document.borderColor =
    templateBaseSettings.OpenResume.colors[0];
  templateSettings.OpenResume.letter.header.layout = 0;
  templateSettings.OpenResume.letter.header.margin = [24, 48, 24, 48];
  templateSettings.OpenResume.letter.name.color =
    templateBaseSettings.OpenResume.colors[0];
  templateSettings.OpenResume.letter.name.fontSize = 30;
  templateSettings.OpenResume.letter.name.fontWeight = 700;
  templateSettings.OpenResume.letter.name.lineHeight = 1.2;
  templateSettings.OpenResume.letter.name.margin[2] = 10;
  templateSettings.OpenResume.letter.title.fontSize = 20;
  templateSettings.OpenResume.letter.title.fontWeight = 700;
  templateSettings.OpenResume.letter.title.lineHeight = 1.2;
  templateSettings.OpenResume.letter.title.margin[2] = 10;
  templateSettings.OpenResume.letter.contactDetails.listOrientation = "row";
  templateSettings.OpenResume.letter.contactDetails.gap = 40;
  templateSettings.OpenResume.letter.about.isItalic = true;
  templateSettings.OpenResume.letter.about.textAlign = "center";
  templateSettings.OpenResume.letter.senderDetails.isItalic = true;
  templateSettings.OpenResume.letter.senderDetails.margin[0] = 48;
  templateSettings.OpenResume.letter.senderDetails.margin[1] = 48;
  templateSettings.OpenResume.letter.senderDetails.margin[3] = 48 * 2 + 4;
  templateSettings.OpenResume.letter.recipientDetails.isItalic = true;
  templateSettings.OpenResume.letter.recipientDetails.margin[0] = 24;
  templateSettings.OpenResume.letter.recipientDetails.margin[1] = 48;
  templateSettings.OpenResume.letter.reference.isBeforeSubject = true;
  templateSettings.OpenResume.letter.reference.margin[1] = 48;
  templateSettings.OpenResume.letter.reference.margin[3] = 48 * 2 + 4;
  templateSettings.OpenResume.letter.reference.fontWeight = 700;
  templateSettings.OpenResume.letter.reference.textAlign = "left";
  templateSettings.OpenResume.letter.reference.color =
    templateBaseSettings.OpenResume.colors[0];
  templateSettings.OpenResume.letter.subject.margin[1] = 48;
  templateSettings.OpenResume.letter.subject.margin[3] = 48 * 2 + 4;
  templateSettings.OpenResume.letter.subject.fontWeight = 700;
  templateSettings.OpenResume.letter.subject.textAlign = "left";
  templateSettings.OpenResume.letter.body.margin = [24, 48, 0, 48];
  templateSettings.OpenResume.letter.body.indentation = 48;
}

if (templateSettings.Paper.resume && templateSettings.Paper.letter) {
  templateSettings.Paper.resume.document.padding = [80, 80, 80, 80];
  templateSettings.Paper.resume.header.layout = 3;
  templateSettings.Paper.resume.name.fontSize = 20;
  templateSettings.Paper.resume.title.fontSize = 20;
  templateSettings.Paper.resume.contactDetails.listOrientation = "row";
  templateSettings.Paper.resume.contactDetails.gap = 12;
  templateSettings.Paper.resume.contactDetails.fontSize = 12;
  templateSettings.Paper.resume.about.fontSize = 12;
  templateSettings.Paper.resume.about.padding = [16, 16, 16, 0];
  templateSettings.Paper.resume.about.border[0] = 2;
  templateSettings.Paper.resume.about.borderStyle = "dotted";
  templateSettings.Paper.resume.about.borderColor =
    templateBaseSettings.Paper.colors[0];
  templateSettings.Paper.resume.category.padding = [16, 16, 16, 0];
  templateSettings.Paper.resume.category.border[0] = 2;
  templateSettings.Paper.resume.category.borderStyle = "dotted";
  templateSettings.Paper.resume.category.borderColor =
    templateBaseSettings.Paper.colors[0];
  templateSettings.Paper.resume.categoryName.isAside = true;
  templateSettings.Paper.resume.categoryName.width = 20;
  templateSettings.Paper.resume.categoryName.isUppercase = true;
  templateSettings.Paper.resume.categoryName.fontSize = 12;
  templateSettings.Paper.resume.entry.layout = 9;
  templateSettings.Paper.resume.entryTitle.fontWeight = 700;
  templateSettings.Paper.resume.entryTitle.fontSize = 13;
  templateSettings.Paper.resume.entryOrganization.order = 2;
  templateSettings.Paper.resume.entryOrganization.beforeSeparator = "|";
  templateSettings.Paper.resume.entryOrganization.fontSize = 13;
  templateSettings.Paper.resume.entryLocation.order = 3;
  templateSettings.Paper.resume.entryLocation.beforeSeparator = ",";
  templateSettings.Paper.resume.entryLocation.fontSize = 13;
  templateSettings.Paper.resume.entryPeriod.order = 4;
  templateSettings.Paper.resume.entryPeriod.fontSize = 13;
  templateSettings.Paper.resume.entrySummary.fontSize = 13;
  templateSettings.Paper.resume.entryHighlight.fontSize = 13;
  templateSettings.Paper.resume.entryHighlight.listMarker = "circle";
  templateSettings.Paper.resume.entryTag.border = [1, 1, 1, 1];
  templateSettings.Paper.resume.entryTag.borderColor =
    templateBaseSettings.Paper.colors[0];
  templateSettings.Paper.resume.entryTag.color =
    templateBaseSettings.Paper.colors[0];
  templateSettings.Paper.resume.entryTag.backgroundColor = "transparent";
  templateSettings.Paper.letter.document.padding = [80, 80, 80, 80];
  templateSettings.Paper.letter.header.layout = 3;
  templateSettings.Paper.letter.name.fontSize = 20;
  templateSettings.Paper.letter.title.fontSize = 20;
  templateSettings.Paper.letter.contactDetails.listOrientation = "row";
  templateSettings.Paper.letter.contactDetails.gap = 12;
  templateSettings.Paper.letter.contactDetails.fontSize = 12;
  templateSettings.Paper.letter.about.fontSize = 12;
  templateSettings.Paper.letter.about.padding = [16, 16, 16, 0];
  templateSettings.Paper.letter.about.border[0] = 2;
  templateSettings.Paper.letter.about.borderStyle = "dotted";
  templateSettings.Paper.letter.about.borderColor =
    templateBaseSettings.Paper.colors[0];
  templateSettings.Paper.letter.subject.textAlign = "left";
  templateSettings.Paper.letter.reference.isItalic = true;
  templateSettings.Paper.letter.reference.textAlign = "left";
  templateSettings.Paper.letter.body.indentation = 0;
  templateSettings.Paper.letter.body.isSignatureRightAligned = false;
}

if (templateSettings.Pharmacy.resume && templateSettings.Pharmacy.letter) {
  templateSettings.Pharmacy.resume.document.padding = [48, 48, 48, 48];
  templateSettings.Pharmacy.resume.header.layout = 4;
  templateSettings.Pharmacy.resume.name.color =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.resume.name.isUppercase = true;
  templateSettings.Pharmacy.resume.name.fontSize = 30;
  templateSettings.Pharmacy.resume.name.letterSpacing = 2;
  templateSettings.Pharmacy.resume.contactDetails.margin = [10, 0, 30, 0];
  templateSettings.Pharmacy.resume.contactDetails.alignment = "end";
  templateSettings.Pharmacy.resume.contactDetails.border[1] = 2;
  templateSettings.Pharmacy.resume.contactDetails.borderColor =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.resume.contactDetails.padding[1] = 20;
  templateSettings.Pharmacy.resume.contactDetails.fontSize = 12;
  templateSettings.Pharmacy.resume.contactDetails.isIconFirst = false;
  templateSettings.Pharmacy.resume.title.color =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.resume.title.fontSize = 36;
  templateSettings.Pharmacy.resume.title.letterSpacing = 3;
  templateSettings.Pharmacy.resume.title.textAlign = "center";
  templateSettings.Pharmacy.resume.about.fontSize = 16;
  templateSettings.Pharmacy.resume.about.color =
    templateBaseSettings.Pharmacy.colors[2];
  templateSettings.Pharmacy.resume.about.textAlign = "center";
  templateSettings.Pharmacy.resume.aside.margin[0] = 25;
  templateSettings.Pharmacy.resume.aside.margin[1] = 25;
  templateSettings.Pharmacy.resume.body.margin[0] = 25;
  templateSettings.Pharmacy.resume.category.gap = 34;
  templateSettings.Pharmacy.resume.categoryName.margin[2] = 6;
  templateSettings.Pharmacy.resume.categoryName.isUppercase = true;
  templateSettings.Pharmacy.resume.categoryName.fontSize = 16;
  templateSettings.Pharmacy.resume.categoryName.fontWeight = 700;
  templateSettings.Pharmacy.resume.categoryName.letterSpacing = 1;
  templateSettings.Pharmacy.resume.entry.layout = 4;
  templateSettings.Pharmacy.resume.entry.border[3] = 2;
  templateSettings.Pharmacy.resume.entry.borderColor =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.resume.entry.padding[3] = 20;
  templateSettings.Pharmacy.resume.entryPeriod.order = 1;
  templateSettings.Pharmacy.resume.entryPeriod.color =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.resume.entryTitle.order = 2;
  templateSettings.Pharmacy.resume.entryOrganization.color =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.resume.entryLocation.color =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.resume.entrySummary.color =
    templateBaseSettings.Pharmacy.colors[2];
  templateSettings.Pharmacy.resume.entryHighlight.listMarker = "disc";
  templateSettings.Pharmacy.resume.entryHighlight.color =
    templateBaseSettings.Pharmacy.colors[1];
  templateSettings.Pharmacy.resume.entryTag.color =
    templateBaseSettings.Pharmacy.colors[2];
  templateSettings.Pharmacy.resume.entryTag.backgroundColor = "transparent";
  templateSettings.Pharmacy.resume.entryTag.borderRadius = 0;
  templateSettings.Pharmacy.resume.entryTag.border[3] = 1;
  templateSettings.Pharmacy.resume.entryTag.padding[0] = 0;
  templateSettings.Pharmacy.resume.entryTag.padding[2] = 0;
  templateSettings.Pharmacy.resume.entryTag.borderColor =
    templateBaseSettings.Pharmacy.colors[2];
  templateSettings.Pharmacy.resume.entryTag.gap = 20;
  templateSettings.Pharmacy.letter.document.padding = [48, 48, 48, 48];
  templateSettings.Pharmacy.letter.header.layout = 0;
  templateSettings.Pharmacy.letter.name.color =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.letter.name.isUppercase = true;
  templateSettings.Pharmacy.letter.name.fontSize = 30;
  templateSettings.Pharmacy.letter.name.letterSpacing = 2;
  templateSettings.Pharmacy.letter.contactDetails.margin = [10, 0, 30, 0];
  templateSettings.Pharmacy.letter.contactDetails.alignment = "start";
  templateSettings.Pharmacy.letter.contactDetails.border[3] = 2;
  templateSettings.Pharmacy.letter.contactDetails.borderColor =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.letter.contactDetails.padding[3] = 20;
  templateSettings.Pharmacy.letter.contactDetails.fontSize = 12;
  templateSettings.Pharmacy.letter.title.color =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.letter.title.fontSize = 36;
  templateSettings.Pharmacy.letter.title.letterSpacing = 3;
  templateSettings.Pharmacy.letter.about.fontSize = 16;
  templateSettings.Pharmacy.letter.about.color =
    templateBaseSettings.Pharmacy.colors[2];
  templateSettings.Pharmacy.letter.senderDetails.borderColor =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.letter.senderDetails.border[3] = 2;
  templateSettings.Pharmacy.letter.senderDetails.padding[3] = 20;
  templateSettings.Pharmacy.letter.recipientDetails.borderColor =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.letter.recipientDetails.border[1] = 2;
  templateSettings.Pharmacy.letter.recipientDetails.padding[1] = 20;
  templateSettings.Pharmacy.letter.subject.fontSize = 18;
  templateSettings.Pharmacy.letter.subject.color =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.letter.reference.fontSize = 15;
  templateSettings.Pharmacy.letter.reference.color =
    templateBaseSettings.Pharmacy.colors[2];
}

if (templateSettings.Red.resume && templateSettings.Red.letter) {
  templateSettings.Red.resume.document.padding = [48, 56, 48, 56];
  templateSettings.Red.resume.header.layout = 1;
  templateSettings.Red.resume.header.padding = [24, 40, 24, 40];
  templateSettings.Red.resume.name.font = templateBaseSettings.Red.displayFont;
  templateSettings.Red.resume.name.fontSize = 36;
  templateSettings.Red.resume.name.isUppercase = true;
  templateSettings.Red.resume.name.textAlign = "center";
  templateSettings.Red.resume.name.lineHeight = 1;
  templateSettings.Red.resume.name.padding = [10, 16, 0, 16];
  templateSettings.Red.resume.name.border[0] = 4;
  templateSettings.Red.resume.name.borderColor =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.resume.title.font = templateBaseSettings.Red.displayFont;
  templateSettings.Red.resume.title.fontSize = 24;
  templateSettings.Red.resume.title.textAlign = "center";
  templateSettings.Red.resume.title.padding = [0, 16, 10, 16];
  templateSettings.Red.resume.title.border[2] = 4;
  templateSettings.Red.resume.title.borderColor =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.resume.contactDetails.margin[3] = 30;
  templateSettings.Red.resume.contactDetails.border[3] = 1;
  templateSettings.Red.resume.contactDetails.borderColor =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.resume.contactDetails.padding[3] = 10;
  templateSettings.Red.resume.contactDetails.fontSize = 11;
  templateSettings.Red.resume.contactDetails.isItalic = true;
  templateSettings.Red.resume.contactDetails.color =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.resume.contactDetails.iconColor =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.resume.aside.margin[0] = 22;
  templateSettings.Red.resume.aside.margin[1] = 22;
  templateSettings.Red.resume.body.margin[0] = 22;
  templateSettings.Red.resume.categoryName.isUppercase = true;
  templateSettings.Red.resume.categoryName.font =
    templateBaseSettings.Red.displayFont;
  templateSettings.Red.resume.categoryName.fontSize = 28;
  templateSettings.Red.resume.categoryName.textAlign = "center";
  templateSettings.Red.resume.entry.layout = 8;
  templateSettings.Red.resume.entryOrganization.order = 2;
  templateSettings.Red.resume.entryOrganization.beforeSeparator = "-";
  templateSettings.Red.resume.entryOrganization.color =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.resume.entryPeriod.order = 3;
  templateSettings.Red.resume.entryLocation.order = 4;
  templateSettings.Red.resume.entryLocation.beforeSeparator = ",";
  templateSettings.Red.resume.entrySummary.fontSize = 12;
  templateSettings.Red.resume.entryHighlight.fontSize = 12;
  templateSettings.Red.resume.entryHighlight.isItalic = true;
  templateSettings.Red.resume.entryHighlight.margin[3] = 20;
  templateSettings.Red.resume.entryHighlight.listMarker = "square";
  templateSettings.Red.resume.entryHighlight.listMarkerColor =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.resume.entryHighlight.color =
    templateBaseSettings.Red.colors[1];
  templateSettings.Red.resume.entryTag.isUppercase = true;
  templateSettings.Red.letter.document.padding = [48, 56, 48, 56];
  templateSettings.Red.letter.header.layout = 1;
  templateSettings.Red.letter.header.padding = [24, 40, 24, 40];
  templateSettings.Red.letter.name.font = templateBaseSettings.Red.displayFont;
  templateSettings.Red.letter.name.fontSize = 36;
  templateSettings.Red.letter.name.isUppercase = true;
  templateSettings.Red.letter.name.textAlign = "center";
  templateSettings.Red.letter.name.lineHeight = 1;
  templateSettings.Red.letter.name.padding = [10, 16, 0, 16];
  templateSettings.Red.letter.name.border[0] = 4;
  templateSettings.Red.letter.name.borderColor =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.letter.title.font = templateBaseSettings.Red.displayFont;
  templateSettings.Red.letter.title.fontSize = 24;
  templateSettings.Red.letter.title.textAlign = "center";
  templateSettings.Red.letter.title.padding = [0, 16, 10, 16];
  templateSettings.Red.letter.title.border[2] = 4;
  templateSettings.Red.letter.title.borderColor =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.letter.contactDetails.margin[3] = 30;
  templateSettings.Red.letter.contactDetails.border[3] = 1;
  templateSettings.Red.letter.contactDetails.borderColor =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.letter.contactDetails.padding[3] = 10;
  templateSettings.Red.letter.contactDetails.fontSize = 11;
  templateSettings.Red.letter.contactDetails.isItalic = true;
  templateSettings.Red.letter.contactDetails.color =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.letter.contactDetails.iconColor =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.letter.senderDetails.margin[0] = 0;
  templateSettings.Red.letter.senderDetails.isItalic = true;
  templateSettings.Red.letter.senderDetails.fontSize = 12;
  templateSettings.Red.letter.senderDetails.color =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.letter.recipientDetails.margin[0] = 0;
  templateSettings.Red.letter.recipientDetails.isItalic = true;
  templateSettings.Red.letter.recipientDetails.fontSize = 12;
  templateSettings.Red.letter.recipientDetails.color =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.letter.subject.fontWeight = 600;
  templateSettings.Red.letter.reference.color =
    templateBaseSettings.Red.colors[0];
}

if (templateSettings.Shelf.resume && templateSettings.Shelf.letter) {
  templateSettings.Shelf.resume.header.layout = 2;
  templateSettings.Shelf.resume.name.font =
    templateSettings.Shelf.base.displayFont;
  templateSettings.Shelf.resume.name.fontSize = 40;
  templateSettings.Shelf.resume.name.fontWeight = 900;
  templateSettings.Shelf.resume.name.lineHeight = 1.1;
  templateSettings.Shelf.resume.title.fontSize = 22;
  templateSettings.Shelf.resume.title.fontWeight = 300;
  templateSettings.Shelf.resume.title.letterSpacing = 2;
  templateSettings.Shelf.resume.about.fontSize = 12;
  templateSettings.Shelf.resume.contactDetails.fontSize = 12;
  templateSettings.Shelf.resume.category.margin[0] = 16;
  templateSettings.Shelf.resume.categoryName.fontWeight = 300;
  templateSettings.Shelf.resume.categoryName.letterSpacing = 2;
  templateSettings.Shelf.resume.categoryName.margin[2] = 22;
  templateSettings.Shelf.resume.entry.layout = 13;
  // TODO align center or right when entryHeader exists
  templateSettings.Shelf.resume.entryPeriod.order = 1;
  templateSettings.Shelf.resume.entryPeriod.fontSize = 12;
  templateSettings.Shelf.resume.entryTitle.order = 2;
  templateSettings.Shelf.resume.entryTitle.fontWeight = 700;
  templateSettings.Shelf.resume.entryOrganization.fontSize = 12;
  templateSettings.Shelf.resume.entryLocation.fontSize = 12;
  templateSettings.Shelf.resume.entrySummary.lineHeight = 1.1;
  templateSettings.Shelf.resume.entryHighlight.margin[0] = 8;
  templateSettings.Shelf.resume.entryHighlight.fontSize = 12;
  templateSettings.Shelf.resume.entryTag.margin[0] = 8;
}

if (
  templateSettings.StackOverflow.resume &&
  templateSettings.StackOverflow.letter
) {
  templateSettings.StackOverflow.resume.name.fontSize = 36;
  templateSettings.StackOverflow.resume.name.fontWeight = 100;
  templateSettings.StackOverflow.resume.name.lineHeight = 1.2;
  templateSettings.StackOverflow.resume.title.fontSize = 22;
  templateSettings.StackOverflow.resume.title.fontWeight = 300;
  templateSettings.StackOverflow.resume.title.color =
    templateSettings.StackOverflow.base.colors[3];
  templateSettings.StackOverflow.resume.contactDetails.listOrientation = "row";
  templateSettings.StackOverflow.resume.contactDetails.gap = 18;
  templateSettings.StackOverflow.resume.contactDetails.color =
    templateSettings.StackOverflow.base.colors[5];
  templateSettings.StackOverflow.resume.contactDetails.iconColor =
    templateSettings.StackOverflow.base.colors[6];
  templateSettings.StackOverflow.resume.about.margin[0] = 20;
  templateSettings.StackOverflow.resume.aside.margin[0] = 10;
  templateSettings.StackOverflow.resume.aside.margin[1] = 10;
  templateSettings.StackOverflow.resume.body.margin[0] = 10;
  templateSettings.StackOverflow.resume.category.margin[0] = 10;
  templateSettings.StackOverflow.resume.categoryName.isUppercase = true;
  templateSettings.StackOverflow.resume.categoryName.fontSize = 12;
  templateSettings.StackOverflow.resume.categoryName.fontWeight = 600;
  templateSettings.StackOverflow.resume.categoryName.color =
    templateSettings.StackOverflow.base.colors[1];
  templateSettings.StackOverflow.resume.categoryName.width = "fit";
  templateSettings.StackOverflow.resume.categoryName.padding = [0, 12, 6, 0];
  templateSettings.StackOverflow.resume.categoryNameSeparator.position =
    "right";
  templateSettings.StackOverflow.resume.categoryNameSeparator.margin[2] = 8;
  templateSettings.StackOverflow.resume.categoryNameSeparator.width = 100;
  templateSettings.StackOverflow.resume.categoryNameSeparator.height = 1;
  templateSettings.StackOverflow.resume.categoryNameSeparator.backgroundColor =
    templateSettings.StackOverflow.base.colors[6];
  templateSettings.StackOverflow.resume.entry.layout = 9;
  templateSettings.StackOverflow.resume.entryTitle.fontWeight = 600;
  templateSettings.StackOverflow.resume.entryOrganization.order = 2;
  templateSettings.StackOverflow.resume.entryOrganization.beforeSeparator = "|";
  templateSettings.StackOverflow.resume.entryOrganization.fontSize = 12;
  templateSettings.StackOverflow.resume.entryOrganization.color =
    templateSettings.StackOverflow.base.colors[3];
  templateSettings.StackOverflow.resume.entryLocation.order = 3;
  templateSettings.StackOverflow.resume.entryLocation.beforeSeparator = ",";
  templateSettings.StackOverflow.resume.entryLocation.fontSize = 12;
  templateSettings.StackOverflow.resume.entryLocation.color =
    templateSettings.StackOverflow.base.colors[3];
  templateSettings.StackOverflow.resume.entryPeriod.order = 4;
  templateSettings.StackOverflow.resume.entryPeriod.fontWeight = 600;
  templateSettings.StackOverflow.resume.entrySummary.fontSize = 12;
  templateSettings.StackOverflow.resume.entryHighlight.fontSize = 12;
  templateSettings.StackOverflow.resume.entryTag.gap = 2;
  templateSettings.StackOverflow.resume.entryTag.padding = [4, 5, 4, 5];
  templateSettings.StackOverflow.resume.entryTag.backgroundColor =
    templateSettings.StackOverflow.base.colors[6];
  templateSettings.StackOverflow.resume.entryTag.color =
    templateSettings.StackOverflow.base.colors[5];
  templateSettings.StackOverflow.resume.entryTag.fontSize = 12;
  templateSettings.StackOverflow.resume.entryTag.borderRadius = 0;
  templateSettings.StackOverflow.letter.name.fontSize = 36;
  templateSettings.StackOverflow.letter.name.fontWeight = 100;
  templateSettings.StackOverflow.letter.name.lineHeight = 1.2;
  templateSettings.StackOverflow.letter.title.fontSize = 22;
  templateSettings.StackOverflow.letter.title.fontWeight = 300;
  templateSettings.StackOverflow.letter.title.color =
    templateSettings.StackOverflow.base.colors[3];
  templateSettings.StackOverflow.letter.contactDetails.listOrientation = "row";
  templateSettings.StackOverflow.letter.contactDetails.gap = 18;
  templateSettings.StackOverflow.letter.contactDetails.color =
    templateSettings.StackOverflow.base.colors[5];
  templateSettings.StackOverflow.letter.contactDetails.iconColor =
    templateSettings.StackOverflow.base.colors[6];
  templateSettings.StackOverflow.letter.senderDetails.fontSize = 12;
  templateSettings.StackOverflow.letter.senderDetails.color =
    templateSettings.StackOverflow.base.colors[3];
  templateSettings.StackOverflow.letter.recipientDetails.fontSize = 12;
  templateSettings.StackOverflow.letter.recipientDetails.color =
    templateSettings.StackOverflow.base.colors[3];
  templateSettings.StackOverflow.letter.subject.fontWeight = 600;
  templateSettings.StackOverflow.letter.reference.padding = [4, 5, 4, 5];
  templateSettings.StackOverflow.letter.reference.backgroundColor =
    templateSettings.StackOverflow.base.colors[6];
  templateSettings.StackOverflow.letter.reference.color =
    templateSettings.StackOverflow.base.colors[5];
  templateSettings.StackOverflow.letter.reference.fontSize = 12;
  templateSettings.StackOverflow.letter.body.isJustified = false;
}

if (templateSettings.Stone.resume && templateSettings.Stone.letter) {
  templateSettings.Stone.resume.header.layout = 0;
  templateSettings.Stone.resume.name.font =
    templateBaseSettings.Stone.displayFont;
  templateSettings.Stone.resume.name.textAlign = "center";
  templateSettings.Stone.resume.name.fontSize = 36;
  templateSettings.Stone.resume.name.margin[2] = 2;
  templateSettings.Stone.resume.title.textAlign = "center";
  templateSettings.Stone.resume.title.fontSize = 20;
  templateSettings.Stone.resume.title.margin[2] = 2;
  templateSettings.Stone.resume.contactDetails.fontSize = 12;
  templateSettings.Stone.resume.contactDetails.listOrientation = "row";
  templateSettings.Stone.resume.contactDetails.gap = 30;
  // TODO handle justify-center of details
  templateSettings.Stone.resume.contactDetails.padding = [2, 20, 20, 20];
  templateSettings.Stone.resume.about.font =
    templateBaseSettings.Stone.displayFont;
  templateSettings.Stone.resume.about.textAlign = "center";
  templateSettings.Stone.resume.about.fontSize = 12;
  templateSettings.Stone.resume.about.padding = [25, 0, 25, 0];
  templateSettings.Stone.resume.about.border[0] = 1;
  templateSettings.Stone.resume.about.borderColor =
    templateBaseSettings.Stone.colors[2];
  templateSettings.Stone.resume.aside.width = 25;
  templateSettings.Stone.resume.aside.margin[1] = 25;
  templateSettings.Stone.resume.category.padding = [25, 0, 25, 0];
  templateSettings.Stone.resume.category.border[0] = 1;
  templateSettings.Stone.resume.category.borderColor =
    templateBaseSettings.Stone.colors[2];
  templateSettings.Stone.resume.categoryName.isUppercase = true;
  templateSettings.Stone.resume.categoryName.color =
    templateBaseSettings.Stone.colors[0];
  templateSettings.Stone.resume.categoryName.font =
    templateBaseSettings.Stone.displayFont;
  templateSettings.Stone.resume.categoryName.fontSize = 20;
  templateSettings.Stone.resume.categoryName.fontWeight = 700;
  templateSettings.Stone.resume.categoryName.margin[2] = 20;
  templateSettings.Stone.resume.entry.layout = 10;
  templateSettings.Stone.resume.entryTitle.isUppercase = true;
  templateSettings.Stone.resume.entryTitle.lineHeight = 1;
  templateSettings.Stone.resume.entryTitle.fontSize = 13;
  templateSettings.Stone.resume.entryOrganization.order = 2;
  templateSettings.Stone.resume.entryOrganization.fontSize = 12;
  templateSettings.Stone.resume.entryOrganization.color =
    templateBaseSettings.Stone.colors[1];
  templateSettings.Stone.resume.entryLocation.order = 3;
  templateSettings.Stone.resume.entryLocation.beforeSeparator = "|";
  templateSettings.Stone.resume.entryLocation.fontSize = 12;
  templateSettings.Stone.resume.entryLocation.color =
    templateBaseSettings.Stone.colors[1];
  templateSettings.Stone.resume.entryPeriod.order = 4;
  templateSettings.Stone.resume.entryPeriod.beforeSeparator = "|";
  templateSettings.Stone.resume.entryPeriod.fontSize = 12;
  templateSettings.Stone.resume.entryPeriod.color =
    templateBaseSettings.Stone.colors[1];
  templateSettings.Stone.resume.entryTag.backgroundColor =
    templateBaseSettings.Stone.colors[2];
  templateSettings.Stone.resume.entryTag.padding = [2, 10, 2, 10];
  templateSettings.Stone.resume.entryTag.borderRadius = 0;
  templateSettings.Stone.resume.entryTag.fontSize = 12;
  templateSettings.Stone.letter.document.padding = [48, 48, 48, 48];
  templateSettings.Stone.letter.header.layout = 0;
  templateSettings.Stone.letter.name.font =
    templateBaseSettings.Stone.displayFont;
  templateSettings.Stone.letter.name.fontSize = 24;
  templateSettings.Stone.letter.title.fontSize = 16;
  templateSettings.Stone.letter.contactDetails.fontSize = 12;
  templateSettings.Stone.letter.contactDetails.listOrientation = "row";
  templateSettings.Stone.letter.contactDetails.gap = 24;
  templateSettings.Stone.letter.contactDetails.padding = [10, 0, 10, 0];
  templateSettings.Stone.letter.about.font =
    templateBaseSettings.Stone.displayFont;
  templateSettings.Stone.letter.about.fontSize = 12;
  templateSettings.Stone.letter.senderDetails.color =
    templateBaseSettings.Stone.colors[1];
  templateSettings.Stone.letter.recipientDetails.color =
    templateBaseSettings.Stone.colors[1];
  templateSettings.Stone.letter.recipientDetails.borderColor =
    templateBaseSettings.Stone.colors[2];
  templateSettings.Stone.letter.recipientDetails.border = [1, 1, 1, 1];
  templateSettings.Stone.letter.recipientDetails.padding = [6, 10, 6, 10];
  templateSettings.Stone.letter.subject.textAlign = "left";
  templateSettings.Stone.letter.subject.isUppercase = true;
  templateSettings.Stone.letter.subject.fontSize = 20;
  templateSettings.Stone.letter.subject.fontWeight = 600;
  templateSettings.Stone.letter.subject.font =
    templateBaseSettings.Stone.displayFont;
  templateSettings.Stone.letter.reference.margin[0] = 10;
  templateSettings.Stone.letter.reference.textAlign = "left";
  templateSettings.Stone.letter.reference.color =
    templateBaseSettings.Stone.colors[1];
  templateSettings.Stone.letter.body.margin[0] = 40;
  templateSettings.Stone.letter.body.indentation = 0;
  templateSettings.Stone.letter.body.isSignatureRightAligned = false;
}

if (templateSettings.Toothpaste.resume && templateSettings.Toothpaste.letter) {
  templateSettings.Toothpaste.resume.document.padding = [0, 0, 0, 0];
  templateSettings.Toothpaste.resume.header.layout = 1;
  templateSettings.Toothpaste.resume.header.padding = [24, 40, 24, 40];
  templateSettings.Toothpaste.resume.name.font =
    templateBaseSettings.Toothpaste.displayFont;
  templateSettings.Toothpaste.resume.name.fontSize = 36;
  templateSettings.Toothpaste.resume.name.isUppercase = true;
  templateSettings.Toothpaste.resume.name.color =
    templateBaseSettings.Toothpaste.colors[0];
  templateSettings.Toothpaste.resume.title.font =
    templateBaseSettings.Toothpaste.displayFont;
  templateSettings.Toothpaste.resume.title.fontSize = 24;
  templateSettings.Toothpaste.resume.title.isUppercase = true;
  templateSettings.Toothpaste.resume.title.color =
    templateBaseSettings.Toothpaste.colors[1];
  templateSettings.Toothpaste.resume.contactDetails.margin[1] = 80;
  templateSettings.Toothpaste.resume.contactDetails.margin[3] = 60;
  templateSettings.Toothpaste.resume.contactDetails.fontSize = 12;
  templateSettings.Toothpaste.resume.about.textAlign = "center";
  templateSettings.Toothpaste.resume.about.fontSize = 12;
  templateSettings.Toothpaste.resume.aside.border[1] = 2;
  templateSettings.Toothpaste.resume.aside.borderColor =
    templateBaseSettings.Toothpaste.colors[0];
  templateSettings.Toothpaste.resume.category.gap = 0;
  templateSettings.Toothpaste.resume.category.padding = [24, 40, 24, 40];
  templateSettings.Toothpaste.resume.category.border[0] = 2;
  templateSettings.Toothpaste.resume.category.borderColor =
    templateBaseSettings.Toothpaste.colors[0];
  templateSettings.Toothpaste.resume.categoryName.font =
    templateBaseSettings.Toothpaste.displayFont;
  templateSettings.Toothpaste.resume.categoryName.fontSize = 24;
  templateSettings.Toothpaste.resume.categoryName.color =
    templateBaseSettings.Toothpaste.colors[0];
  templateSettings.Toothpaste.resume.categoryName.isUppercase = true;
  templateSettings.Toothpaste.resume.entry.layout = 1;
  templateSettings.Toothpaste.resume.entryTitle.font =
    templateBaseSettings.Toothpaste.displayFont;
  templateSettings.Toothpaste.resume.entryTitle.fontSize = 20;
  templateSettings.Toothpaste.resume.entryTitle.color =
    templateBaseSettings.Toothpaste.colors[1];
  templateSettings.Toothpaste.resume.entryOrganization.order = 2;
  templateSettings.Toothpaste.resume.entryPeriod.order = 3;
  templateSettings.Toothpaste.resume.entryPeriod.beforeSeparator = "·";
  templateSettings.Toothpaste.resume.entryLocation.order = 4;
  templateSettings.Toothpaste.resume.entryLocation.beforeSeparator = "·";
  templateSettings.Toothpaste.resume.entryHighlight.isItalic = true;
  templateSettings.Toothpaste.resume.entryTag.backgroundColor = "transparent";
  templateSettings.Toothpaste.resume.entryTag.border = [1, 1, 1, 1];
  templateSettings.Toothpaste.resume.entryTag.borderColor =
    templateBaseSettings.Toothpaste.colors[1];
  templateSettings.Toothpaste.resume.entryTag.gap = 8;
  templateSettings.Toothpaste.letter.header.layout = 1;
  templateSettings.Toothpaste.letter.name.font =
    templateBaseSettings.Toothpaste.displayFont;
  templateSettings.Toothpaste.letter.name.fontSize = 36;
  templateSettings.Toothpaste.letter.name.isUppercase = true;
  templateSettings.Toothpaste.letter.name.color =
    templateBaseSettings.Toothpaste.colors[0];
  templateSettings.Toothpaste.letter.title.font =
    templateBaseSettings.Toothpaste.displayFont;
  templateSettings.Toothpaste.letter.title.fontSize = 24;
  templateSettings.Toothpaste.letter.title.isUppercase = true;
  templateSettings.Toothpaste.letter.title.color =
    templateBaseSettings.Toothpaste.colors[1];
  templateSettings.Toothpaste.letter.contactDetails.margin[1] = 80;
  templateSettings.Toothpaste.letter.contactDetails.margin[3] = 60;
  templateSettings.Toothpaste.letter.contactDetails.fontSize = 12;
  templateSettings.Toothpaste.letter.about.textAlign = "center";
  templateSettings.Toothpaste.letter.about.fontSize = 12;
  templateSettings.Toothpaste.letter.senderDetails.fontSize = 12;
  templateSettings.Toothpaste.letter.senderDetails.isItalic = true;
  templateSettings.Toothpaste.letter.senderDetails.color =
    templateBaseSettings.Toothpaste.colors[0];
  templateSettings.Toothpaste.letter.recipientDetails.fontSize = 12;
  templateSettings.Toothpaste.letter.recipientDetails.isItalic = true;
  templateSettings.Toothpaste.letter.recipientDetails.color =
    templateBaseSettings.Toothpaste.colors[0];
  templateSettings.Toothpaste.letter.subject.fontWeight = 600;
  templateSettings.Toothpaste.letter.reference.color =
    templateBaseSettings.Toothpaste.colors[0];
}

if (templateSettings.Wiki.resume && templateSettings.Wiki.letter) {
  templateSettings.Wiki.resume.document.padding = [24, 30, 24, 30];
  templateSettings.Wiki.resume.header.layout = 2;
  templateSettings.Wiki.resume.name.textAlign = "center";
  templateSettings.Wiki.resume.name.fontSize = 30;
  templateSettings.Wiki.resume.name.fontWeight = 700;
  templateSettings.Wiki.resume.title.textAlign = "center";
  templateSettings.Wiki.resume.title.fontSize = 20;
  templateSettings.Wiki.resume.about.textAlign = "center";
  templateSettings.Wiki.resume.about.fontSize = 12;
  templateSettings.Wiki.resume.contactDetails.alignment = "end";
  templateSettings.Wiki.resume.contactDetails.fontSize = 12;
  templateSettings.Wiki.resume.aside.margin[1] = 20;
  templateSettings.Wiki.resume.category.gap = 20;
  templateSettings.Wiki.resume.categoryName.isUppercase = true;
  templateSettings.Wiki.resume.categoryName.color =
    templateBaseSettings.Wiki.colors[0];
  templateSettings.Wiki.resume.categoryName.margin[2] = 10;
  templateSettings.Wiki.resume.categoryName.border[2] = 1;
  templateSettings.Wiki.resume.categoryName.borderColor =
    templateBaseSettings.Wiki.colors[1];
  templateSettings.Wiki.resume.entry.layout = 11;
  templateSettings.Wiki.resume.entryTitle.fontWeight = 700;
  templateSettings.Wiki.resume.entryTitle.fontSize = 11;
  templateSettings.Wiki.resume.entryTitle.lineHeight = 1.5;
  templateSettings.Wiki.resume.entryPeriod.fontSize = 11;
  templateSettings.Wiki.resume.entryPeriod.lineHeight = 1.5;
  templateSettings.Wiki.resume.entryOrganization.isItalic = true;
  templateSettings.Wiki.resume.entryOrganization.fontSize = 11;
  templateSettings.Wiki.resume.entryOrganization.lineHeight = 1.5;
  templateSettings.Wiki.resume.entryLocation.isItalic = true;
  templateSettings.Wiki.resume.entryLocation.fontSize = 11;
  templateSettings.Wiki.resume.entryLocation.lineHeight = 1.5;
  templateSettings.Wiki.resume.entrySummary.margin[0] = 4;
  templateSettings.Wiki.resume.entrySummary.fontSize = 11;
  templateSettings.Wiki.resume.entryHighlight.fontSize = 11;
  templateSettings.Wiki.resume.entryTag.color =
    templateBaseSettings.Wiki.colors[0];
  templateSettings.Wiki.resume.entryTag.borderRadius = 0;
  templateSettings.Wiki.letter.document.padding = [24, 30, 24, 30];
  templateSettings.Wiki.letter.header.layout = 2;
  templateSettings.Wiki.letter.name.textAlign = "center";
  templateSettings.Wiki.letter.name.fontSize = 30;
  templateSettings.Wiki.letter.name.fontWeight = 700;
  templateSettings.Wiki.letter.title.textAlign = "center";
  templateSettings.Wiki.letter.title.fontSize = 20;
  templateSettings.Wiki.letter.about.textAlign = "center";
  templateSettings.Wiki.letter.about.fontSize = 12;
  templateSettings.Wiki.letter.contactDetails.alignment = "end";
  templateSettings.Wiki.letter.contactDetails.fontSize = 12;
  templateSettings.Wiki.letter.senderDetails.fontSize = 12;
  templateSettings.Wiki.letter.senderDetails.lineHeight = 1.2;
  templateSettings.Wiki.letter.recipientDetails.fontSize = 12;
  templateSettings.Wiki.letter.recipientDetails.lineHeight = 1.2;
  templateSettings.Wiki.letter.subject.textAlign = "left";
  templateSettings.Wiki.letter.subject.fontWeight = 700;
  templateSettings.Wiki.letter.subject.fontSize = 16;
  templateSettings.Wiki.letter.subject.lineHeight = 1.5;
  templateSettings.Wiki.letter.reference.textAlign = "left";
  templateSettings.Wiki.letter.reference.isUppercase = true;
  templateSettings.Wiki.letter.reference.color =
    templateBaseSettings.Wiki.colors[0];
  templateSettings.Wiki.letter.reference.margin[2] = 10;
  templateSettings.Wiki.letter.reference.border[2] = 1;
  templateSettings.Wiki.letter.reference.borderColor =
    templateBaseSettings.Wiki.colors[1];
  templateSettings.Wiki.letter.body.margin[1] = 20;
  templateSettings.Wiki.letter.body.margin[3] = 20;
  templateSettings.Wiki.letter.body.fontSize = 12;
}

export const contactIcons: Array<ContactDetail["icon"]> = [
  "address",
  "drivingLicense",
  "email",
  "phone",
];

export const socialIcons: Array<ContactDetail["icon"]> = [
  "bandcamp",
  "behance",
  "mastodon",
  "facebook",
  "gitHub",
  "instagram",
  "linkedIn",
  "soundCloud",
  "stackOverflow",
  "viadeo",
  "x",
];

export const categoryTypes: Array<Category["type"]> = [
  "award",
  "certificate",
  "education",
  "project",
  "publication",
  "voluntary",
  "work",
  "interest",
  "language",
  "skill",
];

export const categoryLayouts: Array<Category["layout"]> = [
  "aside",
  "full",
  "half",
];

export const assetTypes: Array<Asset["type"]> = [
  "interest",
  "language",
  "skill",
];

export const experienceTypes: Array<Experience["type"]> = [
  "award",
  "certificate",
  "education",
  "project",
  "publication",
  "voluntary",
  "work",
];
