import type {
  Asset,
  BaseSettings,
  Category,
  CommonDocumentSettings,
  ContactDetail,
  DocumentType,
  EmailSettings,
  EntryLayout,
  Experience,
  Font,
  HeaderLayout,
  LetterSettings,
  ListMarker,
  ListMarkerPosition,
  LocaleCode,
  PaperDocumentSettings,
  ResumeSettings,
  Theme,
  ThemeBaseSettings,
  ThemeSettings,
  TextSeparator,
} from "@/types";

export const A4_HEIGHT = 297; // In mm
export const A4_WIDTH = 210; // In mm
export const A4_RATIO = A4_HEIGHT / A4_WIDTH;

export const jsonResumeSchemaUrl = "https://jsonresume.org/schema";

export const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

export const localeLabels: { [key in LocaleCode]: string } = {
  br: "Brezhoneg",
  de: "Deutsch",
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
};

export const documentTypes: DocumentType[] = ["resume", "letter", "email"];

export const iconTypes: ContactDetail["type"][] = ["personal", "social"];

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
  "Rubik",
  "Sarabun",
  "Times New Roman",
  "Yanone Kaffeesatz",
];

export const themes: Theme[] = [
  "default",
  "Aster",
  "Astro",
  "Care",
  "CottonCandy",
  "Cupcake",
  "Elegant",
  "Glaze",
  "Kendall",
  "Macaron",
  "Macchiato",
  "NeoBrutalism",
  "NiceResume",
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

export const textSeparators: TextSeparator[] = [
  "|",
  "-",
  "·",
  "*",
  ">",
  ",",
  " ",
];

export const listMarkerPositions: ListMarkerPosition[] = ["inside", "outside"];

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
  name: {
    font: "inherit",
    fontSize: 22,
    letterSpacing: 0,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    isGradient: false,
    fromColor: "currentColor",
    toColor: "currentColor",
    gradientAngle: 25,
    textAlign: "left",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    width: 100,
    widthType: "auto",
  },
  title: {
    font: "inherit",
    fontSize: 18,
    letterSpacing: 0,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    isGradient: false,
    fromColor: "currentColor",
    toColor: "currentColor",
    gradientAngle: 25,
    textAlign: "left",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    width: 100,
    widthType: "auto",
  },
  about: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    isGradient: false,
    fromColor: "currentColor",
    toColor: "currentColor",
    gradientAngle: 25,
    textAlign: "left",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    width: 100,
    widthType: "auto",
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
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    alignment: "start",
    listOrientation: "column",
    listMarker: null,
    listMarkerPosition: "inside",
    listMarkerColor: "currentColor",
    iconSize: 16,
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

export const paperDocumentSettings: PaperDocumentSettings = {
  ...commonDocumentSettings,
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
};

export const resumeSettings: ResumeSettings = {
  ...paperDocumentSettings,
  aside: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "#000000",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    width: 25,
    widthType: "auto",
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
    isMasonry: false,
  },
  categoryName: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    isGradient: false,
    fromColor: "currentColor",
    toColor: "currentColor",
    gradientAngle: 25,
    textAlign: "left",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    width: 100,
    widthType: "auto",
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
    width: 100,
    widthType: "auto",
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
    order: 1,
  },
  entryPeriod: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
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
    order: 2,
  },
  entryOrganization: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
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
    order: 3,
  },
  entryLocation: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
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
    order: 4,
  },
  entrySummary: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
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
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    listOrientation: "column", // For now, this settings cannot be set to row for legible purpose
    listMarker: "hyphen",
    listMarkerPosition: "inside",
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
  ...paperDocumentSettings,
  senderDetails: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    isGradient: false,
    fromColor: "currentColor",
    toColor: "currentColor",
    gradientAngle: 25,
    textAlign: "center",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0], // If sender details is used, it is the first element on the document (no need for margins)
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    width: 100,
    widthType: "auto",
    gap: 0,
  },
  recipientDetails: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    isGradient: false,
    fromColor: "currentColor",
    toColor: "currentColor",
    gradientAngle: 25,
    textAlign: "center",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [40, 0, 40, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    width: 100,
    widthType: "auto",
    gap: 0,
  },
  subject: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    isGradient: false,
    fromColor: "currentColor",
    toColor: "currentColor",
    gradientAngle: 25,
    textAlign: "center",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    width: 100,
    widthType: "auto",
  },
  reference: {
    font: "inherit",
    fontSize: 12,
    letterSpacing: 0,
    fontWeight: 400,
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    isGradient: false,
    fromColor: "currentColor",
    toColor: "currentColor",
    gradientAngle: 25,
    textAlign: "center",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    width: 100,
    widthType: "auto",
    isBeforeSubject: false,
  },
  body: {
    fontSize: 14,
    fontWeight: 400,
    color: "currentColor",
    indentation: 48,
    isJustified: true,
    margin: [20, 0, 0, 0],
    gap: 12,
    isSignatureRightAligned: true,
  },
};

export const emailSettings: EmailSettings = {
  ...commonDocumentSettings,
  document: {
    bodyFont: "sans-serif",
    color: "#000000",
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderColor: "#000000",
    border: [0, 0, 0, 0],
    padding: [60, 60, 60, 60],
    layout: 0,
  },
};

export const themeBaseSettings: ThemeBaseSettings = {
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
  Astro: {
    isLetterPaddingless: false,
    colors: [
      "#7611a6",
      "#ca7879",
      "#1c0056",
      "#090b11",
      "#6474a2",
      "#e3e6ee",
      "#f3f4f7",
      "#ffffff",
      "#3d4663",
    ],
    bodyFont: "Rubik",
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
  Glaze: {
    isLetterPaddingless: true,
    colors: ["#ed3660", "#5662e8", "#e5e7eb", "#ffffff", "#1e1e1e"],
    bodyFont: "Mulish",
    displayFont: "League Gothic",
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
  NiceResume: {
    isLetterPaddingless: false,
    colors: [
      "#000000",
      "#ffffff",
      "#372aac", // Tailwind's indigo-800
      "#1447e6", // Tailwind's blue-700
      "#f6339a", // Tailwind's pink-500
    ],
    bodyFont: "Sarabun",
    displayFont: "Sarabun",
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

// TODO Find a way to loop through Themes array AND be TS-compliant
export const themeSettings: ThemeSettings = {
  default: {
    base: themeBaseSettings.default,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Aster: {
    base: themeBaseSettings.Aster,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Astro: {
    base: themeBaseSettings.Astro,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Care: {
    base: themeBaseSettings.Care,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  CottonCandy: {
    base: themeBaseSettings.CottonCandy,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Cupcake: {
    base: themeBaseSettings.Cupcake,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Elegant: {
    base: themeBaseSettings.Elegant,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Glaze: {
    base: themeBaseSettings.Glaze,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Kendall: {
    base: themeBaseSettings.Kendall,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Macaron: {
    base: themeBaseSettings.Macaron,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Macchiato: {
    base: themeBaseSettings.Macchiato,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  NeoBrutalism: {
    base: themeBaseSettings.NeoBrutalism,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  NiceResume: {
    base: themeBaseSettings.NiceResume,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Oilcloth: {
    base: themeBaseSettings.Oilcloth,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  OpenResume: {
    base: themeBaseSettings.OpenResume,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Paper: {
    base: themeBaseSettings.Paper,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Pharmacy: {
    base: themeBaseSettings.Pharmacy,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Red: {
    base: themeBaseSettings.Red,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Shelf: {
    base: themeBaseSettings.Shelf,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  StackOverflow: {
    base: themeBaseSettings.StackOverflow,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Stone: {
    base: themeBaseSettings.Stone,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Toothpaste: {
    base: themeBaseSettings.Toothpaste,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
  Wiki: {
    base: themeBaseSettings.Wiki,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  },
};

function scaffoldThemeSettings(
  theme: Theme,
  baseSettings: BaseSettings,
  isLetterPaddingless: boolean,
) {
  const settings = {
    base: baseSettings,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
    email: structuredClone(emailSettings),
  };
  settings.resume.document.bodyFont = baseSettings.bodyFont;
  settings.letter.document.bodyFont = baseSettings.bodyFont;
  settings.email.document.bodyFont = baseSettings.bodyFont; // TODO is it wise considering the custom font-stack issue in email clients?
  settings.resume.document.color =
    baseSettings.colors[baseSettings.colors.length - 1];
  settings.letter.document.color =
    baseSettings.colors[baseSettings.colors.length - 1];
  settings.email.document.color =
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
  themeSettings[theme] = settings;
}

Object.entries(themeBaseSettings).forEach(([key, value]) => {
  scaffoldThemeSettings(key as Theme, value, value.isLetterPaddingless);
});

// Default
themeSettings.default.resume.header.margin[2] = 20;
themeSettings.default.resume.name.fontWeight = 600;
themeSettings.default.resume.name.letterSpacing = 2;
themeSettings.default.resume.title.color = themeBaseSettings.default.colors[1];
themeSettings.default.resume.title.letterSpacing = 1;
themeSettings.default.resume.about.isItalic = true;
themeSettings.default.resume.about.color = themeBaseSettings.default.colors[1];
themeSettings.default.resume.contactDetails.margin = [10, 0, 10, 0];
themeSettings.default.resume.contactDetails.fontSize = 12;
themeSettings.default.resume.category.margin[0] = 10;
themeSettings.default.resume.categoryName.fontSize = 16;
themeSettings.default.resume.categoryName.fontWeight = 600;
themeSettings.default.resume.categoryName.letterSpacing = 1;
themeSettings.default.resume.entry.layout = 2;
themeSettings.default.resume.entry.margin[2] = 30;
themeSettings.default.resume.entryTitle.fontSize = 15;
themeSettings.default.resume.entryPeriod.fontSize = 12;
themeSettings.default.resume.entryPeriod.color =
  themeBaseSettings.default.colors[1];
themeSettings.default.resume.entryLocation.fontSize = 12;
themeSettings.default.resume.entryLocation.color =
  themeBaseSettings.default.colors[1];
themeSettings.default.resume.entrySummary.margin[0] = 10;
themeSettings.default.resume.entryHighlight.margin[0] = 5;
themeSettings.default.resume.entryHighlight.lineHeight = 1.2;
themeSettings.default.resume.entryHighlight.fontSize = 13;
themeSettings.default.resume.entryHighlight.isItalic = true;
themeSettings.default.resume.entryTag.margin[0] = 15;
themeSettings.default.letter.name.fontWeight = 600;
themeSettings.default.letter.name.letterSpacing = 2;
themeSettings.default.letter.title.color = themeBaseSettings.default.colors[1];
themeSettings.default.letter.title.letterSpacing = 1;
themeSettings.default.letter.about.isItalic = true;
themeSettings.default.letter.about.color = themeBaseSettings.default.colors[1];
themeSettings.default.letter.contactDetails.margin = [10, 0, 10, 0];
themeSettings.default.letter.contactDetails.fontSize = 12;
themeSettings.default.email.name.fontWeight = 600;
themeSettings.default.email.name.letterSpacing = 2;
themeSettings.default.email.title.color = themeBaseSettings.default.colors[1];
themeSettings.default.email.title.letterSpacing = 1;
themeSettings.default.email.about.isItalic = true;
themeSettings.default.email.about.color = themeBaseSettings.default.colors[1];
themeSettings.default.email.contactDetails.margin = [10, 0, 10, 0];
themeSettings.default.email.contactDetails.fontSize = 12;

// Aster
themeSettings.Aster.resume.document.padding = [0, 0, 0, 0];
themeSettings.Aster.resume.header.layout = 2;
themeSettings.Aster.resume.header.margin = [32, 32, 32, 32];
themeSettings.Aster.resume.contactDetails.alignment = "end";
themeSettings.Aster.resume.contactDetails.iconColor =
  themeBaseSettings.Aster.colors[0];
themeSettings.Aster.resume.categoryName.widthType = "custom";
themeSettings.Aster.resume.categoryName.width = 64;
themeSettings.Aster.resume.categoryName.padding = [4, 4, 4, 32];
themeSettings.Aster.resume.categoryName.backgroundColor =
  themeBaseSettings.Aster.colors[0];
themeSettings.Aster.resume.categoryName.color =
  themeBaseSettings.Aster.colors[2];
themeSettings.Aster.resume.categoryName.isUppercase = true;
themeSettings.Aster.resume.categoryName.fontWeight = 600;
themeSettings.Aster.resume.categoryName.border[1] = 10;
themeSettings.Aster.resume.categoryName.borderColor =
  themeBaseSettings.Aster.colors[2];
themeSettings.Aster.resume.categoryNameSeparator.height = 6;
themeSettings.Aster.resume.categoryNameSeparator.backgroundColor =
  themeBaseSettings.Aster.colors[1];
themeSettings.Aster.resume.entry.padding = [8, 8, 8, 32];
themeSettings.Aster.resume.entryPeriod.order = 1;
themeSettings.Aster.resume.entryPeriod.margin[1] = 20;
themeSettings.Aster.resume.entryTitle.order = 2;
themeSettings.Aster.resume.entryTitle.margin[1] = 14;
themeSettings.Aster.resume.entryTitle.fontWeight = 500;
themeSettings.Aster.resume.entryOrganization.margin[1] = 14;
themeSettings.Aster.resume.entryOrganization.isItalic = true;
themeSettings.Aster.resume.entrySummary.padding[3] = 16;
themeSettings.Aster.resume.entryHighlight.padding[3] = 16;
themeSettings.Aster.resume.entryTag.margin[3] = 16;
themeSettings.Aster.letter.header.layout = 2;
themeSettings.Aster.letter.contactDetails.alignment = "end";
themeSettings.Aster.letter.contactDetails.iconColor =
  themeBaseSettings.Aster.colors[0];
themeSettings.Aster.letter.senderDetails.fontWeight = 300;
themeSettings.Aster.letter.recipientDetails.fontWeight = 300;
themeSettings.Aster.letter.subject.fontSize = 18;
themeSettings.Aster.letter.subject.fontWeight = 300;
themeSettings.Aster.letter.reference.fontSize = 15;
themeSettings.Aster.letter.reference.fontWeight = 300;
themeSettings.Aster.letter.reference.color = themeBaseSettings.Aster.colors[0];
themeSettings.Aster.letter.body.fontWeight = 300;
themeSettings.Aster.letter.body.lineHeight = 1.6;
themeSettings.Aster.email.name.color = themeBaseSettings.Aster.colors[0];
themeSettings.Aster.email.name.fontWeight = 600;
themeSettings.Aster.email.title.color = themeBaseSettings.Aster.colors[1];
themeSettings.Aster.email.contactDetails.iconColor =
  themeBaseSettings.Aster.colors[0];

// Astro
themeSettings.Astro.resume.header.layout = 2;
themeSettings.Astro.resume.name.fontSize = 30;
themeSettings.Astro.resume.name.fontWeight = 600;
themeSettings.Astro.resume.name.color = themeBaseSettings.Astro.colors[3];
themeSettings.Astro.resume.title.fontSize = 20;
themeSettings.Astro.resume.title.fontWeight = 500;
themeSettings.Astro.resume.title.color = themeBaseSettings.Astro.colors[0];
themeSettings.Astro.resume.contactDetails.fontSize = 12;
themeSettings.Astro.resume.contactDetails.alignment = "end";
themeSettings.Astro.resume.about.margin[0] = 7;
themeSettings.Astro.resume.categoryName.fontSize = 23;
themeSettings.Astro.resume.categoryName.fontWeight = 600;
themeSettings.Astro.resume.categoryName.margin[0] = 13;
themeSettings.Astro.resume.categoryName.margin[2] = 13;
themeSettings.Astro.resume.entry.layout = 13;
themeSettings.Astro.resume.entryTitle.color = themeBaseSettings.Astro.colors[0];
themeSettings.Astro.resume.entryTitle.isUppercase = true;
themeSettings.Astro.resume.entryTitle.fontWeight = 600;
themeSettings.Astro.resume.entryPeriod.fontWeight = 600;
themeSettings.Astro.resume.entryLocation.fontSize = 12;
themeSettings.Astro.resume.entryLocation.color =
  themeBaseSettings.Astro.colors[4];
themeSettings.Astro.resume.entryOrganization.fontSize = 12;
themeSettings.Astro.resume.entryOrganization.color =
  themeBaseSettings.Astro.colors[4];
themeSettings.Astro.resume.entrySummary.margin[2] = 5;
themeSettings.Astro.resume.entryHighlight.listMarker = "disc";
themeSettings.Astro.resume.entryHighlight.fontSize = 13;
themeSettings.Astro.resume.entryHighlight.color =
  themeBaseSettings.Astro.colors[4];
themeSettings.Astro.resume.entryHighlight.margin[2] = 3;
themeSettings.Astro.resume.entryTag.fontSize = 11;
themeSettings.Astro.resume.entryTag.backgroundColor =
  themeBaseSettings.Astro.colors[6];
themeSettings.Astro.resume.entryTag.borderRadius = 24;
themeSettings.Astro.resume.entryTag.border = [1, 1, 1, 1];
themeSettings.Astro.resume.entryTag.borderColor =
  themeBaseSettings.Astro.colors[5];
themeSettings.Astro.resume.entryTag.padding = [4, 8, 4, 8];
themeSettings.Astro.letter.subject.color = themeBaseSettings.Astro.colors[3];
themeSettings.Astro.letter.subject.fontSize = 18;
themeSettings.Astro.letter.subject.fontWeight = 500;
themeSettings.Astro.letter.reference.color = themeBaseSettings.Astro.colors[0];
themeSettings.Astro.letter.reference.isUppercase = true;
themeSettings.Astro.letter.reference.fontWeight = 600;
themeSettings.Astro.email.document.layout = 2;
themeSettings.Astro.email.name.fontSize = 30;
themeSettings.Astro.email.name.fontWeight = 600;
themeSettings.Astro.email.name.color = themeBaseSettings.Astro.colors[3];
themeSettings.Astro.email.title.fontSize = 20;
themeSettings.Astro.email.title.fontWeight = 500;
themeSettings.Astro.email.title.color = themeBaseSettings.Astro.colors[0];
themeSettings.Astro.email.contactDetails.fontSize = 12;
themeSettings.Astro.email.contactDetails.alignment = "end";
themeSettings.Astro.email.about.margin[0] = 7;

// Care
themeSettings.Care.resume.document.padding = [0, 0, 0, 0];
themeSettings.Care.resume.document.backgroundColor =
  themeSettings.Care.base.colors[0];
themeSettings.Care.resume.document.color = themeSettings.Care.base.colors[5];
themeSettings.Care.resume.header.margin = [60, 60, 0, 60];
themeSettings.Care.resume.header.layout = 5;
themeSettings.Care.resume.name.font = themeSettings.Care.base.displayFont;
themeSettings.Care.resume.name.isUppercase = true;
themeSettings.Care.resume.name.letterSpacing = 4;
themeSettings.Care.resume.name.color = themeSettings.Care.base.colors[1];
themeSettings.Care.resume.title.font = themeSettings.Care.base.displayFont;
themeSettings.Care.resume.title.color = themeSettings.Care.base.colors[3];
themeSettings.Care.resume.title.margin = [12, 0, 0, 114];
themeSettings.Care.resume.about.margin[3] = 218;
themeSettings.Care.resume.contactDetails.margin = [44, 0, 0, 20];
themeSettings.Care.resume.contactDetails.iconColor =
  themeSettings.Care.base.colors[3];
themeSettings.Care.resume.contactDetails.color =
  themeSettings.Care.base.colors[5];
themeSettings.Care.resume.body.margin = [60, 60, 60, 60];
themeSettings.Care.resume.category.gap = 40;
themeSettings.Care.resume.categoryName.isAside = true;
themeSettings.Care.resume.categoryName.font =
  themeSettings.Care.base.displayFont;
themeSettings.Care.resume.categoryName.isUppercase = true;
themeSettings.Care.resume.categoryName.letterSpacing = 2;
themeSettings.Care.resume.categoryName.fontWeight = 500;
themeSettings.Care.resume.categoryName.padding[2] = 12;
themeSettings.Care.resume.categoryName.border[2] = 1;
themeSettings.Care.resume.categoryName.margin[1] = 30;
themeSettings.Care.resume.categoryName.margin[2] = 15;
themeSettings.Care.resume.categoryName.color =
  themeSettings.Care.base.colors[1];
themeSettings.Care.resume.entry.layout = 9;
themeSettings.Care.resume.entryTitle.color = themeSettings.Care.base.colors[2];
themeSettings.Care.resume.entryOrganization.order = 2;
themeSettings.Care.resume.entryOrganization.color =
  themeSettings.Care.base.colors[4];
themeSettings.Care.resume.entryOrganization.beforeSeparator = "|";
themeSettings.Care.resume.entryLocation.order = 3;
themeSettings.Care.resume.entryLocation.color =
  themeSettings.Care.base.colors[1];
themeSettings.Care.resume.entryLocation.beforeSeparator = ",";
themeSettings.Care.resume.entryPeriod.order = 4;
themeSettings.Care.resume.entryPeriod.color = themeSettings.Care.base.colors[2];
themeSettings.Care.resume.entryHighlight.listMarker = "disc";
themeSettings.Care.resume.entryHighlight.color =
  themeSettings.Care.base.colors[1];
themeSettings.Care.resume.entryTag.gap = 20;
themeSettings.Care.resume.entryTag.backgroundColor = "transparent";
themeSettings.Care.resume.entryTag.borderColor =
  themeSettings.Care.base.colors[3];
themeSettings.Care.resume.entryTag.border = [2, 2, 2, 2];
themeSettings.Care.resume.entryTag.borderRadius = 50;
themeSettings.Care.letter.header.margin = [60, 60, 0, 60];
themeSettings.Care.letter.document.backgroundColor =
  themeSettings.Care.base.colors[0];
themeSettings.Care.letter.document.color = themeSettings.Care.base.colors[5];
themeSettings.Care.letter.header.layout = 5;
themeSettings.Care.letter.name.font = themeSettings.Care.base.displayFont;
themeSettings.Care.letter.name.isUppercase = true;
themeSettings.Care.letter.name.letterSpacing = 4;
themeSettings.Care.letter.name.color = themeSettings.Care.base.colors[1];
themeSettings.Care.letter.title.font = themeSettings.Care.base.displayFont;
themeSettings.Care.letter.title.color = themeSettings.Care.base.colors[3];
themeSettings.Care.letter.title.margin = [12, 0, 0, 114];
themeSettings.Care.letter.about.margin[3] = 218;
themeSettings.Care.letter.contactDetails.margin = [44, 0, 0, 20];
themeSettings.Care.letter.contactDetails.iconColor =
  themeSettings.Care.base.colors[3];
themeSettings.Care.letter.contactDetails.color =
  themeSettings.Care.base.colors[5];
themeSettings.Care.letter.senderDetails.color =
  themeSettings.Care.base.colors[1];
themeSettings.Care.letter.recipientDetails.color =
  themeSettings.Care.base.colors[1];
themeSettings.Care.letter.subject.fontSize = 20;
themeSettings.Care.letter.subject.font = themeSettings.Care.base.displayFont;
themeSettings.Care.letter.subject.color = themeSettings.Care.base.colors[3];
themeSettings.Care.letter.reference.color = themeSettings.Care.base.colors[1];
themeSettings.Care.letter.reference.isItalic = true;
themeSettings.Care.letter.reference.fontSize = 14;
themeSettings.Care.letter.body.margin[0] = 10;
themeSettings.Care.letter.body.isJustified = false;
themeSettings.Care.letter.body.fontSize = 15;
themeSettings.Care.email.document.layout = 5;
themeSettings.Care.email.document.backgroundColor =
  themeSettings.Care.base.colors[0];
themeSettings.Care.email.document.color = themeSettings.Care.base.colors[5];
themeSettings.Care.email.name.font = themeSettings.Care.base.displayFont;
themeSettings.Care.email.name.isUppercase = true;
themeSettings.Care.email.name.letterSpacing = 4;
themeSettings.Care.email.name.color = themeSettings.Care.base.colors[1];
themeSettings.Care.email.title.font = themeSettings.Care.base.displayFont;
themeSettings.Care.email.title.color = themeSettings.Care.base.colors[3];
themeSettings.Care.email.title.margin = [12, 0, 0, 114];
themeSettings.Care.email.about.margin[3] = 218;
themeSettings.Care.email.contactDetails.margin = [44, 0, 0, 20];
themeSettings.Care.email.contactDetails.iconColor =
  themeSettings.Care.base.colors[3];
themeSettings.Care.email.contactDetails.color =
  themeSettings.Care.base.colors[5];

// CottonCandy
themeSettings.CottonCandy.resume.document.padding = [0, 0, 0, 0];
themeSettings.CottonCandy.resume.header.layout = 1;
themeSettings.CottonCandy.resume.header.padding = [24, 40, 24, 40];
themeSettings.CottonCandy.resume.name.font =
  themeBaseSettings.CottonCandy.displayFont;
themeSettings.CottonCandy.resume.name.fontSize = 36;
themeSettings.CottonCandy.resume.name.isUppercase = true;
themeSettings.CottonCandy.resume.name.textAlign = "center";
themeSettings.CottonCandy.resume.name.padding = [0, 16, 0, 16];
themeSettings.CottonCandy.resume.name.border[0] = 4;
themeSettings.CottonCandy.resume.name.borderColor =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.resume.title.font =
  themeBaseSettings.CottonCandy.displayFont;
themeSettings.CottonCandy.resume.title.fontSize = 24;
themeSettings.CottonCandy.resume.title.isUppercase = true;
themeSettings.CottonCandy.resume.title.textAlign = "center";
themeSettings.CottonCandy.resume.title.padding = [0, 16, 0, 16];
themeSettings.CottonCandy.resume.title.border[2] = 4;
themeSettings.CottonCandy.resume.title.borderColor =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.resume.contactDetails.margin[3] = 22;
themeSettings.CottonCandy.resume.contactDetails.color =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.resume.contactDetails.iconColor =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.resume.aboutQuote.isShown = true;
themeSettings.CottonCandy.resume.aboutQuote.color =
  themeBaseSettings.CottonCandy.colors[1];
themeSettings.CottonCandy.resume.aside.backgroundColor =
  themeBaseSettings.CottonCandy.colors[1];
themeSettings.CottonCandy.resume.body.backgroundColor =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.resume.category.gap = 0;
themeSettings.CottonCandy.resume.category.padding = [24, 40, 24, 40];
themeSettings.CottonCandy.resume.categoryName.font =
  themeBaseSettings.CottonCandy.displayFont;
themeSettings.CottonCandy.resume.categoryName.fontSize = 24;
themeSettings.CottonCandy.resume.categoryName.color =
  themeBaseSettings.CottonCandy.colors[3];
themeSettings.CottonCandy.resume.categoryName.isUppercase = true;
themeSettings.CottonCandy.resume.entry.layout = 1;
themeSettings.CottonCandy.resume.entryTitle.font =
  themeBaseSettings.CottonCandy.displayFont;
themeSettings.CottonCandy.resume.entryTitle.fontSize = 20;
themeSettings.CottonCandy.resume.entryTitle.color =
  themeBaseSettings.CottonCandy.colors[3];
themeSettings.CottonCandy.resume.entryPeriod.order = 3;
themeSettings.CottonCandy.resume.entryPeriod.color =
  themeBaseSettings.CottonCandy.colors[3];
themeSettings.CottonCandy.resume.entryPeriod.beforeSeparator = "·";
themeSettings.CottonCandy.resume.entryOrganization.order = 2;
themeSettings.CottonCandy.resume.entryOrganization.color =
  themeBaseSettings.CottonCandy.colors[3];
themeSettings.CottonCandy.resume.entryLocation.order = 4;
themeSettings.CottonCandy.resume.entryLocation.color =
  themeBaseSettings.CottonCandy.colors[3];
themeSettings.CottonCandy.resume.entryLocation.beforeSeparator = "·";
themeSettings.CottonCandy.resume.entrySummary.color =
  themeBaseSettings.CottonCandy.colors[3];
themeSettings.CottonCandy.resume.entryHighlight.color =
  themeBaseSettings.CottonCandy.colors[3];
themeSettings.CottonCandy.resume.entryHighlight.listMarkerColor =
  themeBaseSettings.CottonCandy.colors[3];
themeSettings.CottonCandy.resume.entryHighlight.isItalic = true;
themeSettings.CottonCandy.resume.entryTag.backgroundColor =
  themeBaseSettings.CottonCandy.colors[3];
themeSettings.CottonCandy.letter.header.layout = 1;
themeSettings.CottonCandy.letter.header.padding = [24, 40, 24, 40];
themeSettings.CottonCandy.letter.name.font =
  themeBaseSettings.CottonCandy.displayFont;
themeSettings.CottonCandy.letter.name.fontSize = 36;
themeSettings.CottonCandy.letter.name.isUppercase = true;
themeSettings.CottonCandy.letter.name.textAlign = "center";
themeSettings.CottonCandy.letter.name.padding = [0, 16, 0, 16];
themeSettings.CottonCandy.letter.name.border[0] = 4;
themeSettings.CottonCandy.letter.name.borderColor =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.letter.title.font =
  themeBaseSettings.CottonCandy.displayFont;
themeSettings.CottonCandy.letter.title.fontSize = 24;
themeSettings.CottonCandy.letter.title.isUppercase = true;
themeSettings.CottonCandy.letter.title.textAlign = "center";
themeSettings.CottonCandy.letter.title.padding = [0, 16, 0, 16];
themeSettings.CottonCandy.letter.title.border[2] = 4;
themeSettings.CottonCandy.letter.title.borderColor =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.letter.contactDetails.margin[3] = 22;
themeSettings.CottonCandy.letter.contactDetails.color =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.letter.contactDetails.iconColor =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.letter.senderDetails.color =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.letter.senderDetails.margin[0] = 40;
themeSettings.CottonCandy.letter.senderDetails.margin[1] = 40;
themeSettings.CottonCandy.letter.senderDetails.margin[3] = 40;
themeSettings.CottonCandy.letter.senderDetails.isItalic = true;
themeSettings.CottonCandy.letter.recipientDetails.color =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.letter.recipientDetails.margin[0] = 0;
themeSettings.CottonCandy.letter.recipientDetails.margin[1] = 40;
themeSettings.CottonCandy.letter.recipientDetails.margin[3] = 40;
themeSettings.CottonCandy.letter.recipientDetails.isItalic = true;
themeSettings.CottonCandy.letter.subject.fontWeight = 700;
themeSettings.CottonCandy.letter.subject.margin[1] = 40;
themeSettings.CottonCandy.letter.subject.margin[3] = 40;
themeSettings.CottonCandy.letter.reference.fontSize = 11;
themeSettings.CottonCandy.letter.reference.margin[1] = 40;
themeSettings.CottonCandy.letter.reference.margin[3] = 40;
themeSettings.CottonCandy.letter.body.margin[1] = 40;
themeSettings.CottonCandy.letter.body.margin[3] = 40;
themeSettings.CottonCandy.email.document.layout = 1;
themeSettings.CottonCandy.email.name.font =
  themeBaseSettings.CottonCandy.displayFont;
themeSettings.CottonCandy.email.name.fontSize = 36;
themeSettings.CottonCandy.email.name.isUppercase = true;
themeSettings.CottonCandy.email.name.textAlign = "center";
themeSettings.CottonCandy.email.name.padding = [0, 16, 0, 16];
themeSettings.CottonCandy.email.name.border[0] = 4;
themeSettings.CottonCandy.email.name.borderColor =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.email.title.font =
  themeBaseSettings.CottonCandy.displayFont;
themeSettings.CottonCandy.email.title.fontSize = 24;
themeSettings.CottonCandy.email.title.isUppercase = true;
themeSettings.CottonCandy.email.title.textAlign = "center";
themeSettings.CottonCandy.email.title.padding = [0, 16, 0, 16];
themeSettings.CottonCandy.email.title.border[2] = 4;
themeSettings.CottonCandy.email.title.borderColor =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.email.contactDetails.margin[3] = 22;
themeSettings.CottonCandy.email.contactDetails.color =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.email.contactDetails.iconColor =
  themeBaseSettings.CottonCandy.colors[0];
themeSettings.CottonCandy.email.aboutQuote.isShown = true;
themeSettings.CottonCandy.email.aboutQuote.color =
  themeBaseSettings.CottonCandy.colors[1];

// Cupcake
themeSettings.Cupcake.resume.header.layout = 2;
themeSettings.Cupcake.resume.contactDetails.alignment = "end";
themeSettings.Cupcake.resume.contactDetails.color =
  themeBaseSettings.Cupcake.colors[1];
themeSettings.Cupcake.resume.contactDetails.iconColor =
  themeBaseSettings.Cupcake.colors[1];
themeSettings.Cupcake.resume.category.gap = 32;
themeSettings.Cupcake.resume.categoryName.font =
  themeBaseSettings.Cupcake.displayFont;
themeSettings.Cupcake.resume.categoryName.fontSize = 30;
themeSettings.Cupcake.resume.categoryName.fontWeight = 700;
themeSettings.Cupcake.resume.categoryName.lineHeight = 1.2;
themeSettings.Cupcake.resume.categoryName.letterSpacing = 3;
themeSettings.Cupcake.resume.categoryName.isUppercase = true;
themeSettings.Cupcake.resume.categoryName.widthType = "fit-content";
themeSettings.Cupcake.resume.categoryName.margin[2] = 16;
themeSettings.Cupcake.resume.categoryName.margin[3] = 80;
themeSettings.Cupcake.resume.categoryName.border[2] = 2;
themeSettings.Cupcake.resume.categoryName.borderColor =
  themeBaseSettings.Cupcake.colors[1];
themeSettings.Cupcake.resume.entry.layout = 3;
themeSettings.Cupcake.resume.entryPeriod.order = 1;
themeSettings.Cupcake.resume.entryPeriod.margin[1] = 10;
themeSettings.Cupcake.resume.entryPeriod.color =
  themeBaseSettings.Cupcake.colors[1];
themeSettings.Cupcake.resume.entryTitle.order = 2;
themeSettings.Cupcake.resume.entryTitle.isItalic = true;
themeSettings.Cupcake.resume.entryOrganization.margin[1] = 10;
themeSettings.Cupcake.resume.entryHighlight.listMarker = "disc";
themeSettings.Cupcake.resume.entryHighlight.listMarkerColor =
  themeBaseSettings.Cupcake.colors[0];
themeSettings.Cupcake.resume.entryHighlight.color =
  themeBaseSettings.Cupcake.colors[3];
themeSettings.Cupcake.resume.entryTag.backgroundColor =
  themeBaseSettings.Cupcake.colors[2];
themeSettings.Cupcake.resume.entryTag.gap = 8;
themeSettings.Cupcake.letter.header.layout = 2;
themeSettings.Cupcake.letter.contactDetails.alignment = "end";
themeSettings.Cupcake.letter.contactDetails.color =
  themeBaseSettings.Cupcake.colors[1];
themeSettings.Cupcake.letter.contactDetails.iconColor =
  themeBaseSettings.Cupcake.colors[1];
themeSettings.Cupcake.letter.senderDetails.fontSize = 16;
themeSettings.Cupcake.letter.senderDetails.lineHeight = 1;
themeSettings.Cupcake.letter.recipientDetails.fontSize = 16;
themeSettings.Cupcake.letter.recipientDetails.lineHeight = 1;
themeSettings.Cupcake.letter.subject.fontWeight = 600;
themeSettings.Cupcake.letter.subject.fontSize = 20;
themeSettings.Cupcake.letter.reference.fontSize = 15;
themeSettings.Cupcake.letter.body.fontSize = 16;
themeSettings.Cupcake.email.contactDetails.alignment = "end";
themeSettings.Cupcake.email.contactDetails.color =
  themeBaseSettings.Cupcake.colors[1];
themeSettings.Cupcake.email.contactDetails.iconColor =
  themeBaseSettings.Cupcake.colors[1];

// Elegant
themeSettings.Elegant.resume.document.padding = [50, 50, 50, 50];
themeSettings.Elegant.resume.header.layout = 0;
themeSettings.Elegant.resume.name.textAlign = "center";
themeSettings.Elegant.resume.name.fontSize = 24;
themeSettings.Elegant.resume.name.fontWeight = 700;
themeSettings.Elegant.resume.title.margin[0] = 10;
themeSettings.Elegant.resume.title.textAlign = "center";
themeSettings.Elegant.resume.title.color = themeSettings.Elegant.base.colors[1];
themeSettings.Elegant.resume.contactDetails.margin[0] = 10;
themeSettings.Elegant.resume.contactDetails.gap = 20;
themeSettings.Elegant.resume.contactDetails.fontSize = 12;
themeSettings.Elegant.resume.contactDetails.iconGap = 25;
themeSettings.Elegant.resume.contactDetails.iconColor =
  themeSettings.Elegant.base.colors[1];
themeSettings.Elegant.resume.contactDetails.color =
  themeSettings.Elegant.base.colors[6];
themeSettings.Elegant.resume.aside.margin[0] = 20;
themeSettings.Elegant.resume.aside.margin[1] = 40;
themeSettings.Elegant.resume.body.margin[0] = 20;
themeSettings.Elegant.resume.category.gap = 20;
themeSettings.Elegant.resume.categoryName.color =
  themeSettings.Elegant.base.colors[1];
themeSettings.Elegant.resume.categoryName.isUppercase = true;
themeSettings.Elegant.resume.categoryName.fontSize = 18;
themeSettings.Elegant.resume.categoryName.padding[2] = 10;
themeSettings.Elegant.resume.categoryName.border[2] = 1;
themeSettings.Elegant.resume.categoryName.borderColor =
  themeSettings.Elegant.base.colors[2];
themeSettings.Elegant.resume.categoryName.margin[2] = 10;
themeSettings.Elegant.resume.entry.layout = 8;
themeSettings.Elegant.resume.entryTitle.fontWeight = 700;
themeSettings.Elegant.resume.entryOrganization.order = 2;
themeSettings.Elegant.resume.entryOrganization.beforeSeparator = "-";
themeSettings.Elegant.resume.entryPeriod.order = 3;
themeSettings.Elegant.resume.entryPeriod.color =
  themeSettings.Elegant.base.colors[1];
themeSettings.Elegant.resume.entryPeriod.fontSize = 11;
themeSettings.Elegant.resume.entryPeriod.fontWeight = 500;
themeSettings.Elegant.resume.entryLocation.order = 4;
themeSettings.Elegant.resume.entryLocation.beforeSeparator = ",";
themeSettings.Elegant.resume.entryLocation.color =
  themeSettings.Elegant.base.colors[1];
themeSettings.Elegant.resume.entryLocation.fontSize = 11;
themeSettings.Elegant.resume.entryLocation.fontWeight = 500;
themeSettings.Elegant.resume.entrySummary.margin[0] = 10;
themeSettings.Elegant.resume.entryHighlight.margin[0] = 10;
themeSettings.Elegant.resume.entryHighlight.margin[3] = 40;
themeSettings.Elegant.resume.entryHighlight.listMarker = "circle";
themeSettings.Elegant.resume.entryTag.margin[0] = 10;
themeSettings.Elegant.resume.entryTag.gap = 5;
themeSettings.Elegant.resume.entryTag.padding = [5, 5, 5, 5];
themeSettings.Elegant.resume.entryTag.border = [1, 1, 1, 1];
themeSettings.Elegant.resume.entryTag.borderColor =
  themeSettings.Elegant.base.colors[3];
themeSettings.Elegant.resume.entryTag.backgroundColor =
  themeSettings.Elegant.base.colors[4];
themeSettings.Elegant.resume.entryTag.color =
  themeSettings.Elegant.base.colors[5];
themeSettings.Elegant.resume.entryTag.fontWeight = 700;
themeSettings.Elegant.resume.entryTag.fontSize = 14;
themeSettings.Elegant.resume.entryTag.lineHeight = 1;
themeSettings.Elegant.letter.document.padding = [50, 50, 50, 50];
themeSettings.Elegant.letter.header.layout = 0;
themeSettings.Elegant.letter.name.textAlign = "center";
themeSettings.Elegant.letter.name.fontSize = 24;
themeSettings.Elegant.letter.name.fontWeight = 700;
themeSettings.Elegant.letter.title.margin[0] = 10;
themeSettings.Elegant.letter.title.textAlign = "center";
themeSettings.Elegant.letter.title.color = themeSettings.Elegant.base.colors[1];
themeSettings.Elegant.letter.contactDetails.margin[0] = 10;
themeSettings.Elegant.letter.contactDetails.gap = 20;
themeSettings.Elegant.letter.contactDetails.fontSize = 12;
themeSettings.Elegant.letter.contactDetails.iconGap = 25;
themeSettings.Elegant.letter.contactDetails.iconColor =
  themeSettings.Elegant.base.colors[1];
themeSettings.Elegant.letter.contactDetails.color =
  themeSettings.Elegant.base.colors[6];
themeSettings.Elegant.letter.subject.fontSize = 18;
themeSettings.Elegant.letter.subject.fontWeight = 700;
themeSettings.Elegant.letter.reference.margin[0] = 10;
themeSettings.Elegant.letter.reference.color =
  themeSettings.Elegant.base.colors[1];
themeSettings.Elegant.letter.reference.fontSize = 11;
themeSettings.Elegant.letter.reference.fontWeight = 500;
themeSettings.Elegant.letter.body.margin[0] = 20;
themeSettings.Elegant.email.name.fontSize = 24;
themeSettings.Elegant.email.name.fontWeight = 700;
themeSettings.Elegant.email.title.margin[0] = 10;
themeSettings.Elegant.email.title.color = themeSettings.Elegant.base.colors[1];
themeSettings.Elegant.email.contactDetails.margin[0] = 10;
themeSettings.Elegant.email.contactDetails.gap = 20;
themeSettings.Elegant.email.contactDetails.fontSize = 12;
themeSettings.Elegant.email.contactDetails.iconGap = 25;
themeSettings.Elegant.email.contactDetails.iconColor =
  themeSettings.Elegant.base.colors[1];
themeSettings.Elegant.email.contactDetails.color =
  themeSettings.Elegant.base.colors[6];

// Glaze
themeSettings.Glaze.resume.document.padding = [0, 0, 0, 0];
themeSettings.Glaze.resume.header.layout = 6;
themeSettings.Glaze.resume.name.padding = [20, 40, 0, 40];
themeSettings.Glaze.resume.name.font = themeBaseSettings.Glaze.displayFont;
themeSettings.Glaze.resume.name.fontSize = 36;
themeSettings.Glaze.resume.name.isUppercase = true;
themeSettings.Glaze.resume.title.padding = [0, 40, 20, 40];
themeSettings.Glaze.resume.title.font = themeBaseSettings.Glaze.displayFont;
themeSettings.Glaze.resume.title.fontSize = 64;
themeSettings.Glaze.resume.title.lineHeight = 1;
themeSettings.Glaze.resume.title.isUppercase = true;
themeSettings.Glaze.resume.title.isGradient = true;
themeSettings.Glaze.resume.title.widthType = "fit-content";
themeSettings.Glaze.resume.title.fromColor = themeBaseSettings.Glaze.colors[0];
themeSettings.Glaze.resume.title.toColor = themeBaseSettings.Glaze.colors[1];
themeSettings.Glaze.resume.contactDetails.border[3] = 1;
themeSettings.Glaze.resume.contactDetails.borderColor =
  themeBaseSettings.Glaze.colors[2];
themeSettings.Glaze.resume.contactDetails.padding = [20, 40, 20, 40];
themeSettings.Glaze.resume.contactDetails.font = "monospace";
themeSettings.Glaze.resume.contactDetails.fontSize = 12;
themeSettings.Glaze.resume.contactDetails.alignment = "end";
themeSettings.Glaze.resume.about.border[0] = 1;
themeSettings.Glaze.resume.about.borderColor =
  themeBaseSettings.Glaze.colors[2];
themeSettings.Glaze.resume.about.padding = [20, 40, 20, 40];
themeSettings.Glaze.resume.aside.border[1] = 1;
themeSettings.Glaze.resume.aside.borderColor =
  themeBaseSettings.Glaze.colors[2];
themeSettings.Glaze.resume.category.gap = 0;
themeSettings.Glaze.resume.category.padding = [20, 40, 20, 40];
themeSettings.Glaze.resume.category.border[0] = 1;
themeSettings.Glaze.resume.category.borderColor =
  themeBaseSettings.Glaze.colors[2];
themeSettings.Glaze.resume.categoryName.margin[2] = 10;
themeSettings.Glaze.resume.categoryName.font =
  themeBaseSettings.Glaze.displayFont;
themeSettings.Glaze.resume.categoryName.fontSize = 36;
themeSettings.Glaze.resume.categoryName.color =
  themeBaseSettings.Glaze.colors[0];
themeSettings.Glaze.resume.categoryName.isUppercase = true;
themeSettings.Glaze.resume.categoryName.isGradient = true;
themeSettings.Glaze.resume.categoryName.widthType = "fit-content";
themeSettings.Glaze.resume.categoryName.fromColor =
  themeBaseSettings.Glaze.colors[0];
themeSettings.Glaze.resume.categoryName.toColor =
  themeBaseSettings.Glaze.colors[1];
themeSettings.Glaze.resume.entry.gap = 10;
themeSettings.Glaze.resume.entry.layout = 7;
themeSettings.Glaze.resume.entryOrganization.font =
  themeBaseSettings.Glaze.displayFont;
themeSettings.Glaze.resume.entryOrganization.order = 1;
themeSettings.Glaze.resume.entryOrganization.fontSize = 30;
themeSettings.Glaze.resume.entryOrganization.color =
  themeBaseSettings.Glaze.colors[4];
themeSettings.Glaze.resume.entryTitle.order = 2;
themeSettings.Glaze.resume.entryTitle.fontWeight = 600;
themeSettings.Glaze.resume.entryPeriod.order = 3;
themeSettings.Glaze.resume.entryPeriod.beforeSeparator = ">";
themeSettings.Glaze.resume.entryPeriod.fontWeight = 600;
themeSettings.Glaze.resume.entryLocation.order = 4;
themeSettings.Glaze.resume.entrySummary.margin[0] = 5;
themeSettings.Glaze.resume.entryHighlight.margin[0] = 10;
themeSettings.Glaze.resume.entryHighlight.fontSize = 12;
themeSettings.Glaze.resume.entryTag.backgroundColor = "transparent";
themeSettings.Glaze.resume.entryTag.border = [0, 0, 0, 0];
themeSettings.Glaze.resume.entryTag.borderColor =
  themeBaseSettings.Glaze.colors[2];
themeSettings.Glaze.resume.entryTag.borderRadius = 0;
themeSettings.Glaze.resume.entryTag.font = "monospace";
themeSettings.Glaze.resume.entryTag.fontSize = 11;
themeSettings.Glaze.resume.entryTag.margin[0] = 10;
themeSettings.Glaze.resume.entryTag.padding = [0, 0, 0, 0];
themeSettings.Glaze.resume.entryTag.gap = 20;
themeSettings.Glaze.letter.header.layout = 6;
themeSettings.Glaze.letter.name.padding = [20, 40, 0, 40];
themeSettings.Glaze.letter.name.font = themeBaseSettings.Glaze.displayFont;
themeSettings.Glaze.letter.name.fontSize = 36;
themeSettings.Glaze.letter.name.isUppercase = true;
themeSettings.Glaze.letter.title.padding = [0, 40, 20, 40];
themeSettings.Glaze.letter.title.font = themeBaseSettings.Glaze.displayFont;
themeSettings.Glaze.letter.title.fontSize = 30;
themeSettings.Glaze.letter.title.isUppercase = true;
themeSettings.Glaze.letter.title.isGradient = true;
themeSettings.Glaze.letter.title.widthType = "fit-content";
themeSettings.Glaze.letter.title.fromColor = themeBaseSettings.Glaze.colors[0];
themeSettings.Glaze.letter.title.toColor = themeBaseSettings.Glaze.colors[1];
themeSettings.Glaze.letter.contactDetails.padding = [20, 40, 20, 40];
themeSettings.Glaze.letter.contactDetails.font = "monospace";
themeSettings.Glaze.letter.contactDetails.fontSize = 12;
themeSettings.Glaze.letter.contactDetails.alignment = "end";
themeSettings.Glaze.letter.contactDetails.border[3] = 1;
themeSettings.Glaze.letter.contactDetails.borderColor =
  themeBaseSettings.Glaze.colors[2];
themeSettings.Glaze.letter.about.border[0] = 1;
themeSettings.Glaze.letter.about.border[2] = 1;
themeSettings.Glaze.letter.about.borderColor =
  themeBaseSettings.Glaze.colors[2];
themeSettings.Glaze.letter.about.padding = [20, 40, 20, 40];
themeSettings.Glaze.letter.senderDetails.margin = [40, 80, 0, 80];
themeSettings.Glaze.letter.senderDetails.fontWeight = 600;
themeSettings.Glaze.letter.recipientDetails.margin = [40, 80, 40, 80];
themeSettings.Glaze.letter.recipientDetails.fontWeight = 600;
themeSettings.Glaze.letter.subject.margin = [0, 80, 0, 80];
themeSettings.Glaze.letter.subject.textAlign = "left";
themeSettings.Glaze.letter.subject.font = themeBaseSettings.Glaze.displayFont;
themeSettings.Glaze.letter.subject.fontSize = 24;
themeSettings.Glaze.letter.subject.textAlign = "left";
themeSettings.Glaze.letter.reference.margin = [6, 80, 0, 80];
themeSettings.Glaze.letter.reference.textAlign = "left";
themeSettings.Glaze.letter.reference.font = "monospace";
themeSettings.Glaze.letter.reference.fontSize = 14;
themeSettings.Glaze.letter.body.margin = [20, 80, 20, 80];
themeSettings.Glaze.email.name.font = themeBaseSettings.Glaze.displayFont;
themeSettings.Glaze.email.name.fontSize = 36;
themeSettings.Glaze.email.name.isUppercase = true;
themeSettings.Glaze.email.title.font = themeBaseSettings.Glaze.displayFont;
themeSettings.Glaze.email.title.fontSize = 30;
themeSettings.Glaze.email.title.isUppercase = true;
themeSettings.Glaze.email.title.isGradient = true;
themeSettings.Glaze.email.title.widthType = "fit-content";
themeSettings.Glaze.email.title.fromColor = themeBaseSettings.Glaze.colors[0];
themeSettings.Glaze.email.title.toColor = themeBaseSettings.Glaze.colors[1];
themeSettings.Glaze.email.contactDetails.margin[0] = 20;
themeSettings.Glaze.email.contactDetails.font = "monospace";
themeSettings.Glaze.email.contactDetails.fontSize = 12;
themeSettings.Glaze.email.about.border[0] = 1;
themeSettings.Glaze.email.about.borderColor = themeBaseSettings.Glaze.colors[2];
themeSettings.Glaze.email.about.padding = [20, 0, 20, 0];
themeSettings.Glaze.email.about.margin[0] = 20;

// Kendall
themeSettings.Kendall.resume.document.padding = [0, 0, 0, 0];
themeSettings.Kendall.resume.document.border = [10, 10, 10, 10];
themeSettings.Kendall.resume.document.borderColor =
  themeSettings.Kendall.base.colors[0];
themeSettings.Kendall.resume.header.padding = [15, 15, 15, 15];
themeSettings.Kendall.resume.name.textAlign = "center";
themeSettings.Kendall.resume.name.isUppercase = true;
themeSettings.Kendall.resume.name.fontWeight = 800;
themeSettings.Kendall.resume.name.letterSpacing = -1;
themeSettings.Kendall.resume.name.fontSize = 26;
themeSettings.Kendall.resume.title.textAlign = "center";
themeSettings.Kendall.resume.title.isUppercase = true;
themeSettings.Kendall.resume.title.fontWeight = 700;
themeSettings.Kendall.resume.title.letterSpacing = -1;
themeSettings.Kendall.resume.title.fontSize = 21;
themeSettings.Kendall.resume.title.lineHeight = 1;
themeSettings.Kendall.resume.title.color = themeSettings.Kendall.base.colors[3];
themeSettings.Kendall.resume.contactDetails.margin[0] = 15;
themeSettings.Kendall.resume.contactDetails.border[0] = 1;
themeSettings.Kendall.resume.contactDetails.borderColor =
  themeSettings.Kendall.base.colors[4];
themeSettings.Kendall.resume.contactDetails.padding[0] = 15;
themeSettings.Kendall.resume.contactDetails.gap = 15;
themeSettings.Kendall.resume.contactDetails.iconColor =
  themeSettings.Kendall.base.colors[2];
themeSettings.Kendall.resume.aside.width = 33;
themeSettings.Kendall.resume.aside.padding = [15, 15, 15, 15];
themeSettings.Kendall.resume.body.padding = [15, 15, 15, 15];
themeSettings.Kendall.resume.category.gap = 15;
themeSettings.Kendall.resume.categoryName.isUppercase = true;
themeSettings.Kendall.resume.categoryName.fontWeight = 700;
themeSettings.Kendall.resume.categoryName.fontSize = 21;
themeSettings.Kendall.resume.categoryName.color =
  themeSettings.Kendall.base.colors[2];
themeSettings.Kendall.resume.entry.layout = 12;
themeSettings.Kendall.resume.entryOrganization.order = 1;
themeSettings.Kendall.resume.entryOrganization.fontWeight = 700;
themeSettings.Kendall.resume.entryOrganization.fontSize = 17;
themeSettings.Kendall.resume.entryLocation.order = 2;
themeSettings.Kendall.resume.entryLocation.fontWeight = 700;
themeSettings.Kendall.resume.entryLocation.fontSize = 17;
themeSettings.Kendall.resume.entryPeriod.order = 3;
themeSettings.Kendall.resume.entryPeriod.color =
  themeSettings.Kendall.base.colors[3];
themeSettings.Kendall.resume.entryTitle.order = 4;
themeSettings.Kendall.resume.entryTitle.fontWeight = 700;
themeSettings.Kendall.resume.entryTitle.fontSize = 17;
themeSettings.Kendall.resume.entryHighlight.margin[0] = 10;
themeSettings.Kendall.resume.entryHighlight.listMarker = null;
themeSettings.Kendall.resume.entryHighlight.border = [1, 1, 1, 1];
themeSettings.Kendall.resume.entryHighlight.borderColor =
  themeSettings.Kendall.base.colors[4];
themeSettings.Kendall.resume.entryHighlight.borderRadius = 4;
themeSettings.Kendall.resume.entryHighlight.padding = [10, 15, 10, 15];
themeSettings.Kendall.resume.entryTag.gap = 5;
themeSettings.Kendall.resume.entryTag.margin[0] = 10;
themeSettings.Kendall.resume.entryTag.backgroundColor =
  themeSettings.Kendall.base.colors[2];
themeSettings.Kendall.resume.entryTag.color =
  themeSettings.Kendall.base.colors[7];
themeSettings.Kendall.resume.entryTag.fontSize = 12;
themeSettings.Kendall.resume.entryTag.padding = [1, 8, 1, 8];
themeSettings.Kendall.resume.entryTag.borderRadius = 4;
themeSettings.Kendall.letter.document.border = [10, 10, 10, 10];
themeSettings.Kendall.letter.document.borderColor =
  themeSettings.Kendall.base.colors[0];
themeSettings.Kendall.letter.header.padding = [15, 15, 15, 15];
themeSettings.Kendall.letter.name.textAlign = "center";
themeSettings.Kendall.letter.name.isUppercase = true;
themeSettings.Kendall.letter.name.fontWeight = 800;
themeSettings.Kendall.letter.name.letterSpacing = -1;
themeSettings.Kendall.letter.name.fontSize = 26;
themeSettings.Kendall.letter.title.textAlign = "center";
themeSettings.Kendall.letter.title.isUppercase = true;
themeSettings.Kendall.letter.title.fontWeight = 700;
themeSettings.Kendall.letter.title.letterSpacing = -1;
themeSettings.Kendall.letter.title.fontSize = 21;
themeSettings.Kendall.letter.title.lineHeight = 1;
themeSettings.Kendall.letter.title.color = themeSettings.Kendall.base.colors[3];
themeSettings.Kendall.letter.contactDetails.margin[0] = 15;
themeSettings.Kendall.letter.contactDetails.border[0] = 1;
themeSettings.Kendall.letter.contactDetails.borderColor =
  themeSettings.Kendall.base.colors[4];
themeSettings.Kendall.letter.contactDetails.padding[0] = 15;
themeSettings.Kendall.letter.contactDetails.gap = 15;
themeSettings.Kendall.letter.contactDetails.iconColor =
  themeSettings.Kendall.base.colors[2];
themeSettings.Kendall.letter.senderDetails.color =
  themeSettings.Kendall.base.colors[2];
themeSettings.Kendall.letter.recipientDetails.color =
  themeSettings.Kendall.base.colors[2];
themeSettings.Kendall.letter.subject.isUppercase = true;
themeSettings.Kendall.letter.subject.fontWeight = 800;
themeSettings.Kendall.letter.reference.color =
  themeSettings.Kendall.base.colors[2];
themeSettings.Kendall.email.document.backgroundColor =
  themeSettings.Kendall.base.colors[0];
themeSettings.Kendall.email.name.color = themeSettings.Kendall.base.colors[2];
themeSettings.Kendall.email.name.isUppercase = true;
themeSettings.Kendall.email.name.fontWeight = 800;
themeSettings.Kendall.email.name.letterSpacing = -1;
themeSettings.Kendall.email.name.fontSize = 26;
themeSettings.Kendall.email.title.isUppercase = true;
themeSettings.Kendall.email.title.fontWeight = 700;
themeSettings.Kendall.email.title.letterSpacing = -1;
themeSettings.Kendall.email.title.fontSize = 21;
themeSettings.Kendall.email.title.lineHeight = 1;
themeSettings.Kendall.email.title.color = themeSettings.Kendall.base.colors[4];
themeSettings.Kendall.email.about.color = themeSettings.Kendall.base.colors[6];
themeSettings.Kendall.email.contactDetails.margin[0] = 15;
themeSettings.Kendall.email.contactDetails.border[0] = 1;
themeSettings.Kendall.email.contactDetails.borderColor =
  themeSettings.Kendall.base.colors[3];
themeSettings.Kendall.email.contactDetails.padding[0] = 15;
themeSettings.Kendall.email.contactDetails.gap = 15;
themeSettings.Kendall.email.contactDetails.iconColor =
  themeSettings.Kendall.base.colors[2];
themeSettings.Kendall.email.contactDetails.color =
  themeSettings.Kendall.base.colors[6];

// Macaron
themeSettings.Macaron.resume.document.padding = [0, 0, 0, 0];
themeSettings.Macaron.resume.header.layout = 0;
themeSettings.Macaron.resume.header.margin = [68, 0, 20, 0];
themeSettings.Macaron.resume.header.border = [1, 0, 1, 0];
themeSettings.Macaron.resume.header.borderColor =
  themeBaseSettings.Macaron.colors[2];
themeSettings.Macaron.resume.header.padding = [12, 40, 12, 40];
themeSettings.Macaron.resume.header.backgroundColor =
  themeBaseSettings.Macaron.colors[3];
themeSettings.Macaron.resume.name.fontSize = 36;
themeSettings.Macaron.resume.name.fontWeight = 600;
themeSettings.Macaron.resume.name.isUppercase = true;
themeSettings.Macaron.resume.name.letterSpacing = 10;
themeSettings.Macaron.resume.title.fontSize = 24;
themeSettings.Macaron.resume.title.fontWeight = 600;
themeSettings.Macaron.resume.title.isUppercase = true;
themeSettings.Macaron.resume.title.letterSpacing = 5;
themeSettings.Macaron.resume.contactDetails.listOrientation = "row";
themeSettings.Macaron.resume.contactDetails.gap = 20;
themeSettings.Macaron.resume.contactDetails.iconColor =
  themeBaseSettings.Macaron.colors[1];
themeSettings.Macaron.resume.about.font = themeBaseSettings.Macaron.displayFont;
themeSettings.Macaron.resume.about.fontSize = 16;
themeSettings.Macaron.resume.about.fontWeight = 500;
themeSettings.Macaron.resume.aside.width = 25;
themeSettings.Macaron.resume.aside.margin = [40, 0, 40, 40];
themeSettings.Macaron.resume.body.margin = [40, 40, 40, 40];
themeSettings.Macaron.resume.category.gap = 30;
themeSettings.Macaron.resume.categoryName.color =
  themeBaseSettings.Macaron.colors[0];
themeSettings.Macaron.resume.categoryName.fontSize = 24;
themeSettings.Macaron.resume.categoryName.fontWeight = 600;
themeSettings.Macaron.resume.entry.layout = 4;
themeSettings.Macaron.resume.entryPeriod.order = 1;
themeSettings.Macaron.resume.entryPeriod.margin[1] = 8;
themeSettings.Macaron.resume.entryPeriod.color =
  themeBaseSettings.Macaron.colors[0];
themeSettings.Macaron.resume.entryPeriod.fontWeight = 700;
themeSettings.Macaron.resume.entryTitle.order = 2;
themeSettings.Macaron.resume.entryTitle.fontWeight = 700;
themeSettings.Macaron.resume.entryOrganization.order = 3;
themeSettings.Macaron.resume.entryOrganization.margin[1] = 8;
themeSettings.Macaron.resume.entryOrganization.fontWeight = 300;
themeSettings.Macaron.resume.entryLocation.order = 4;
themeSettings.Macaron.resume.entryLocation.fontWeight = 300;
themeSettings.Macaron.resume.entrySummary.fontWeight = 300;
themeSettings.Macaron.resume.entryHighlight.isItalic = true;
themeSettings.Macaron.resume.entryHighlight.listMarker = "disc";
themeSettings.Macaron.resume.entryTag.padding[1] = 8;
themeSettings.Macaron.resume.entryTag.padding[3] = 8;
themeSettings.Macaron.resume.entryTag.backgroundColor =
  themeBaseSettings.Macaron.colors[3];
themeSettings.Macaron.resume.entryTag.borderColor =
  themeBaseSettings.Macaron.colors[2];
themeSettings.Macaron.resume.entryTag.border[2] = 1;
themeSettings.Macaron.resume.entryTag.gap = 20;
themeSettings.Macaron.letter.header.layout = 0;
themeSettings.Macaron.letter.header.margin = [68, 0, 20, 0];
themeSettings.Macaron.letter.header.border = [1, 0, 1, 0];
themeSettings.Macaron.letter.header.borderColor =
  themeBaseSettings.Macaron.colors[2];
themeSettings.Macaron.letter.header.padding = [12, 40, 12, 40];
themeSettings.Macaron.letter.header.backgroundColor =
  themeBaseSettings.Macaron.colors[3];
themeSettings.Macaron.letter.name.fontSize = 36;
themeSettings.Macaron.letter.name.fontWeight = 600;
themeSettings.Macaron.letter.name.isUppercase = true;
themeSettings.Macaron.letter.name.letterSpacing = 10;
themeSettings.Macaron.letter.title.fontSize = 24;
themeSettings.Macaron.letter.title.fontWeight = 600;
themeSettings.Macaron.letter.title.isUppercase = true;
themeSettings.Macaron.letter.title.letterSpacing = 5;
themeSettings.Macaron.letter.contactDetails.listOrientation = "row";
themeSettings.Macaron.letter.contactDetails.gap = 20;
themeSettings.Macaron.letter.contactDetails.iconColor =
  themeBaseSettings.Macaron.colors[1];
themeSettings.Macaron.letter.about.font = themeBaseSettings.Macaron.displayFont;
themeSettings.Macaron.letter.about.fontSize = 16;
themeSettings.Macaron.letter.about.fontWeight = 500;
themeSettings.Macaron.letter.subject.fontWeight = 600;
themeSettings.Macaron.letter.subject.fontSize = 19;
themeSettings.Macaron.letter.reference.color =
  themeBaseSettings.Macaron.colors[0];
themeSettings.Macaron.letter.reference.fontSize = 16;
themeSettings.Macaron.email.document.padding = [68, 0, 40, 0];

themeSettings.Macaron.email.name.border[0] = 1;
themeSettings.Macaron.email.name.borderColor =
  themeBaseSettings.Macaron.colors[2];
themeSettings.Macaron.email.name.backgroundColor =
  themeBaseSettings.Macaron.colors[3];
themeSettings.Macaron.email.name.padding = [12, 40, 12, 40];
themeSettings.Macaron.email.name.fontSize = 36;
themeSettings.Macaron.email.name.fontWeight = 600;
themeSettings.Macaron.email.name.isUppercase = true;
themeSettings.Macaron.email.name.letterSpacing = 10;
themeSettings.Macaron.email.title.border[2] = 1;
themeSettings.Macaron.email.title.borderColor =
  themeBaseSettings.Macaron.colors[2];
themeSettings.Macaron.email.title.backgroundColor =
  themeBaseSettings.Macaron.colors[3];
themeSettings.Macaron.email.title.padding = [12, 40, 12, 40];
themeSettings.Macaron.email.title.fontSize = 24;
themeSettings.Macaron.email.title.fontWeight = 600;
themeSettings.Macaron.email.title.isUppercase = true;
themeSettings.Macaron.email.title.letterSpacing = 5;
themeSettings.Macaron.email.contactDetails.margin = [20, 40, 20, 40];
themeSettings.Macaron.email.contactDetails.listOrientation = "row";
themeSettings.Macaron.email.contactDetails.gap = 20;
themeSettings.Macaron.email.contactDetails.iconColor =
  themeBaseSettings.Macaron.colors[1];
themeSettings.Macaron.email.about.margin = [20, 40, 20, 40];
themeSettings.Macaron.email.about.font = themeBaseSettings.Macaron.displayFont;
themeSettings.Macaron.email.about.fontSize = 16;
themeSettings.Macaron.email.about.fontWeight = 500;

// Macchiato
themeSettings.Macchiato.resume.document.padding = [0, 0, 0, 0];
themeSettings.Macchiato.resume.document.border = [10, 0, 0, 0];
themeSettings.Macchiato.resume.document.borderColor =
  themeBaseSettings.Macchiato.colors[0];
themeSettings.Macchiato.resume.header.layout = 0;
themeSettings.Macchiato.resume.header.margin = [48, 48, 20, 48];
themeSettings.Macchiato.resume.name.font =
  themeBaseSettings.Macchiato.displayFont;
themeSettings.Macchiato.resume.name.fontSize = 36;
themeSettings.Macchiato.resume.name.fontWeight = 700;
themeSettings.Macchiato.resume.name.letterSpacing = 1;
themeSettings.Macchiato.resume.title.font =
  themeBaseSettings.Macchiato.displayFont;
themeSettings.Macchiato.resume.title.fontSize = 20;
themeSettings.Macchiato.resume.title.fontWeight = 300;
themeSettings.Macchiato.resume.title.letterSpacing = 1;
themeSettings.Macchiato.resume.contactDetails.fontSize = 11;
themeSettings.Macchiato.resume.categoryName.font =
  themeBaseSettings.Macchiato.displayFont;
themeSettings.Macchiato.resume.categoryName.fontWeight = 300;
themeSettings.Macchiato.resume.categoryNameSeparator.margin[0] = 4;
themeSettings.Macchiato.resume.categoryNameSeparator.border[0] = 1;
themeSettings.Macchiato.resume.categoryNameSeparator.widthType = "custom";
themeSettings.Macchiato.resume.categoryNameSeparator.width = 7;
themeSettings.Macchiato.resume.category.margin = [0, 48, 20, 48];
themeSettings.Macchiato.resume.entry.layout = 5;
themeSettings.Macchiato.resume.entryPeriod.order = 1;
themeSettings.Macchiato.resume.entryPeriod.fontWeight = 300;
themeSettings.Macchiato.resume.entryPeriod.isItalic = true;
themeSettings.Macchiato.resume.entryTitle.order = 2;
themeSettings.Macchiato.resume.entryTitle.fontWeight = 300;
themeSettings.Macchiato.resume.entryOrganization.fontSize = 12;
themeSettings.Macchiato.resume.entryLocation.fontSize = 12;
themeSettings.Macchiato.resume.entrySummary.fontSize = 12;
themeSettings.Macchiato.resume.entryHighlight.fontSize = 12;
themeSettings.Macchiato.resume.entryHighlight.listMarker = "disc";
themeSettings.Macchiato.resume.entryTag.padding = [2, 2, 2, 2];
themeSettings.Macchiato.resume.entryTag.backgroundColor =
  themeBaseSettings.Macchiato.colors[1];
themeSettings.Macchiato.resume.entryTag.gap = 4;
themeSettings.Macchiato.letter.document.border = [10, 0, 0, 0];
themeSettings.Macchiato.letter.document.borderColor =
  themeBaseSettings.Macchiato.colors[0];
themeSettings.Macchiato.letter.header.layout = 0;
themeSettings.Macchiato.letter.header.margin = [48, 48, 20, 48];
themeSettings.Macchiato.letter.name.font =
  themeBaseSettings.Macchiato.displayFont;
themeSettings.Macchiato.letter.name.fontSize = 36;
themeSettings.Macchiato.letter.name.fontWeight = 700;
themeSettings.Macchiato.letter.name.letterSpacing = 1;
themeSettings.Macchiato.letter.title.font =
  themeBaseSettings.Macchiato.displayFont;
themeSettings.Macchiato.letter.title.fontSize = 20;
themeSettings.Macchiato.letter.title.fontWeight = 300;
themeSettings.Macchiato.letter.title.letterSpacing = 1;
themeSettings.Macchiato.letter.contactDetails.fontSize = 11;
themeSettings.Macchiato.letter.senderDetails.margin = [48, 48, 48, 48];
themeSettings.Macchiato.letter.senderDetails.fontSize = 12;
themeSettings.Macchiato.letter.recipientDetails.margin = [0, 48, 48, 48];
themeSettings.Macchiato.letter.recipientDetails.fontSize = 12;
themeSettings.Macchiato.letter.subject.margin[1] = 48;
themeSettings.Macchiato.letter.subject.margin[3] = 48;
themeSettings.Macchiato.letter.subject.font =
  themeBaseSettings.Macchiato.displayFont;
themeSettings.Macchiato.letter.subject.fontSize = 17;
themeSettings.Macchiato.letter.reference.margin[1] = 48;
themeSettings.Macchiato.letter.reference.margin[3] = 48;
themeSettings.Macchiato.letter.reference.color =
  themeBaseSettings.Macchiato.colors[0];
themeSettings.Macchiato.letter.body.margin = [24, 48, 48, 48];
themeSettings.Macchiato.email.document.padding = [48, 48, 48, 48];
themeSettings.Macchiato.email.document.border = [10, 0, 0, 0];
themeSettings.Macchiato.email.document.borderColor =
  themeBaseSettings.Macchiato.colors[0];
themeSettings.Macchiato.email.name.font =
  themeBaseSettings.Macchiato.displayFont;
themeSettings.Macchiato.email.name.fontSize = 36;
themeSettings.Macchiato.email.name.fontWeight = 700;
themeSettings.Macchiato.email.name.letterSpacing = 1;
themeSettings.Macchiato.email.title.font =
  themeBaseSettings.Macchiato.displayFont;
themeSettings.Macchiato.email.title.fontSize = 20;
themeSettings.Macchiato.email.title.fontWeight = 300;
themeSettings.Macchiato.email.title.letterSpacing = 1;
themeSettings.Macchiato.email.contactDetails.fontSize = 11;

// NeoBrutalism
themeSettings.NeoBrutalism.resume.document.padding = [0, 0, 0, 0];
themeSettings.NeoBrutalism.resume.document.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.resume.document.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[2];
themeSettings.NeoBrutalism.resume.header.layout = 2;
themeSettings.NeoBrutalism.resume.header.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[3];
themeSettings.NeoBrutalism.resume.header.border[2] = 4;
themeSettings.NeoBrutalism.resume.header.borderColor =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.resume.name.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.resume.name.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[5];
themeSettings.NeoBrutalism.resume.name.isUppercase = true;
themeSettings.NeoBrutalism.resume.name.font =
  themeSettings.NeoBrutalism.base.displayFont;
themeSettings.NeoBrutalism.resume.name.fontSize = 36;
themeSettings.NeoBrutalism.resume.name.fontWeight = 900;
themeSettings.NeoBrutalism.resume.name.letterSpacing = 1;
themeSettings.NeoBrutalism.resume.name.padding = [8, 8, 8, 8];
themeSettings.NeoBrutalism.resume.name.border = [4, 8, 8, 4];
themeSettings.NeoBrutalism.resume.name.borderRadius = 8;
themeSettings.NeoBrutalism.resume.name.margin = [22, 22, 22, 22];
themeSettings.NeoBrutalism.resume.title.color =
  themeSettings.NeoBrutalism.base.colors[6];
themeSettings.NeoBrutalism.resume.title.isItalic = true;
themeSettings.NeoBrutalism.resume.title.fontWeight = 700;
themeSettings.NeoBrutalism.resume.title.borderColor =
  themeSettings.NeoBrutalism.base.colors[6];
themeSettings.NeoBrutalism.resume.title.border[2] = 2;
themeSettings.NeoBrutalism.resume.title.borderStyle = "dashed";
themeSettings.NeoBrutalism.resume.title.padding = [0, 22, 0, 22];
themeSettings.NeoBrutalism.resume.about.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.resume.about.margin = [0, 22, 0, 22];
themeSettings.NeoBrutalism.resume.about.textAlign = "right";
themeSettings.NeoBrutalism.resume.contactDetails.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[4];
themeSettings.NeoBrutalism.resume.contactDetails.color =
  themeSettings.NeoBrutalism.base.colors[1];
themeSettings.NeoBrutalism.resume.contactDetails.iconColor =
  themeSettings.NeoBrutalism.base.colors[6];
themeSettings.NeoBrutalism.resume.contactDetails.border[3] = 4;
themeSettings.NeoBrutalism.resume.contactDetails.borderColor =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.resume.contactDetails.padding = [22, 22, 22, 22];
themeSettings.NeoBrutalism.resume.aside.padding = [22, 22, 22, 22];
themeSettings.NeoBrutalism.resume.aside.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[6];
themeSettings.NeoBrutalism.resume.aside.borderColor =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.resume.aside.border[1] = 4;
themeSettings.NeoBrutalism.resume.body.margin = [22, 22, 22, 22];
themeSettings.NeoBrutalism.resume.categoryName.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[7];
themeSettings.NeoBrutalism.resume.categoryName.borderColor =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.resume.categoryName.border = [4, 8, 8, 4];
themeSettings.NeoBrutalism.resume.categoryName.borderRadius = 8;
themeSettings.NeoBrutalism.resume.categoryName.padding = [4, 4, 4, 4];
themeSettings.NeoBrutalism.resume.categoryName.isUppercase = true;
themeSettings.NeoBrutalism.resume.categoryName.fontWeight = 900;
themeSettings.NeoBrutalism.resume.categoryName.fontSize = 22;
themeSettings.NeoBrutalism.resume.categoryName.letterSpacing = 8;
themeSettings.NeoBrutalism.resume.categoryName.margin[2] = 8;
themeSettings.NeoBrutalism.resume.entry.layout = 1;
themeSettings.NeoBrutalism.resume.entryTitle.color =
  themeSettings.NeoBrutalism.base.colors[1];
themeSettings.NeoBrutalism.resume.entryTitle.isUppercase = true;
themeSettings.NeoBrutalism.resume.entryTitle.letterSpacing = 2;
themeSettings.NeoBrutalism.resume.entryTitle.fontWeight = 700;
themeSettings.NeoBrutalism.resume.entryOrganization.order = 2;
themeSettings.NeoBrutalism.resume.entryOrganization.fontWeight = 700;
themeSettings.NeoBrutalism.resume.entryOrganization.color =
  themeSettings.NeoBrutalism.base.colors[8];
themeSettings.NeoBrutalism.resume.entryLocation.order = 3;
themeSettings.NeoBrutalism.resume.entryLocation.beforeSeparator = "·";
themeSettings.NeoBrutalism.resume.entryLocation.fontWeight = 700;
themeSettings.NeoBrutalism.resume.entryLocation.color =
  themeSettings.NeoBrutalism.base.colors[8];
themeSettings.NeoBrutalism.resume.entryPeriod.order = 4;
themeSettings.NeoBrutalism.resume.entryPeriod.beforeSeparator = "·";
themeSettings.NeoBrutalism.resume.entryPeriod.fontWeight = 700;
themeSettings.NeoBrutalism.resume.entryPeriod.color =
  themeSettings.NeoBrutalism.base.colors[8];
themeSettings.NeoBrutalism.resume.entryHighlight.listMarker = "disc";
themeSettings.NeoBrutalism.resume.entryHighlight.listMarkerColor =
  themeSettings.NeoBrutalism.base.colors[7];
themeSettings.NeoBrutalism.resume.entryHighlight.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.resume.entryTag.border = [2, 4, 4, 2];
themeSettings.NeoBrutalism.resume.entryTag.padding = [8, 8, 8, 8];
themeSettings.NeoBrutalism.resume.entryTag.backgroundColor =
  themeBaseSettings.NeoBrutalism.colors[6];
themeSettings.NeoBrutalism.resume.entryTag.fontWeight = 900;
themeSettings.NeoBrutalism.resume.entryTag.isUppercase = true;
themeSettings.NeoBrutalism.resume.entryTag.gap = 20;
themeSettings.NeoBrutalism.letter.header.layout = 2;
themeSettings.NeoBrutalism.letter.document.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.letter.document.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[2];
themeSettings.NeoBrutalism.letter.header.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[3];
themeSettings.NeoBrutalism.letter.header.border[2] = 4;
themeSettings.NeoBrutalism.letter.header.borderColor =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.letter.name.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.letter.name.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[5];
themeSettings.NeoBrutalism.letter.name.isUppercase = true;
themeSettings.NeoBrutalism.letter.name.font =
  themeSettings.NeoBrutalism.base.displayFont;
themeSettings.NeoBrutalism.letter.name.fontSize = 36;
themeSettings.NeoBrutalism.letter.name.fontWeight = 900;
themeSettings.NeoBrutalism.letter.name.letterSpacing = 1;
themeSettings.NeoBrutalism.letter.name.padding = [8, 8, 8, 8];
themeSettings.NeoBrutalism.letter.name.border = [4, 8, 8, 4];
themeSettings.NeoBrutalism.letter.name.borderRadius = 8;
themeSettings.NeoBrutalism.letter.name.margin = [22, 22, 22, 22];
themeSettings.NeoBrutalism.letter.title.color =
  themeSettings.NeoBrutalism.base.colors[6];
themeSettings.NeoBrutalism.letter.title.isItalic = true;
themeSettings.NeoBrutalism.letter.title.fontWeight = 700;
themeSettings.NeoBrutalism.letter.title.borderColor =
  themeSettings.NeoBrutalism.base.colors[6];
themeSettings.NeoBrutalism.letter.title.border[2] = 2;
themeSettings.NeoBrutalism.letter.title.borderStyle = "dashed";
themeSettings.NeoBrutalism.letter.title.padding = [0, 22, 0, 22];
themeSettings.NeoBrutalism.letter.about.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.letter.about.margin = [0, 22, 0, 22];
themeSettings.NeoBrutalism.letter.about.textAlign = "right";
themeSettings.NeoBrutalism.letter.contactDetails.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[4];
themeSettings.NeoBrutalism.letter.contactDetails.color =
  themeSettings.NeoBrutalism.base.colors[1];
themeSettings.NeoBrutalism.letter.contactDetails.iconColor =
  themeSettings.NeoBrutalism.base.colors[6];
themeSettings.NeoBrutalism.letter.contactDetails.border[3] = 4;
themeSettings.NeoBrutalism.letter.contactDetails.borderColor =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.letter.contactDetails.padding = [22, 22, 22, 22];
themeSettings.NeoBrutalism.letter.senderDetails.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[4];
themeSettings.NeoBrutalism.letter.senderDetails.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.letter.senderDetails.padding = [8, 8, 8, 8];
themeSettings.NeoBrutalism.letter.senderDetails.border = [4, 8, 8, 4];
themeSettings.NeoBrutalism.letter.senderDetails.borderRadius = 8;
themeSettings.NeoBrutalism.letter.senderDetails.borderColor =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.letter.recipientDetails.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[5];
themeSettings.NeoBrutalism.letter.recipientDetails.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.letter.recipientDetails.padding = [8, 8, 8, 8];
themeSettings.NeoBrutalism.letter.recipientDetails.border = [4, 8, 8, 4];
themeSettings.NeoBrutalism.letter.recipientDetails.borderRadius = 8;
themeSettings.NeoBrutalism.letter.recipientDetails.borderColor =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.letter.subject.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[6];
themeSettings.NeoBrutalism.letter.subject.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.letter.subject.padding = [8, 8, 8, 8];
themeSettings.NeoBrutalism.letter.subject.border = [4, 8, 8, 4];
themeSettings.NeoBrutalism.letter.subject.borderRadius = 8;
themeSettings.NeoBrutalism.letter.subject.borderColor =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.letter.reference.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[2];
themeSettings.NeoBrutalism.letter.reference.color =
  themeSettings.NeoBrutalism.base.colors[8];
themeSettings.NeoBrutalism.letter.reference.fontWeight = 700;
themeSettings.NeoBrutalism.email.document.padding = [0, 0, 0, 0];
themeSettings.NeoBrutalism.email.document.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.email.document.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[2];
themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.email.name.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.email.name.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[5];
themeSettings.NeoBrutalism.email.name.isUppercase = true;
themeSettings.NeoBrutalism.email.name.font =
  themeSettings.NeoBrutalism.base.displayFont;
themeSettings.NeoBrutalism.email.name.fontSize = 36;
themeSettings.NeoBrutalism.email.name.fontWeight = 900;
themeSettings.NeoBrutalism.email.name.letterSpacing = 1;
themeSettings.NeoBrutalism.email.name.padding = [8, 8, 8, 8];
themeSettings.NeoBrutalism.email.name.border = [4, 8, 8, 4];
themeSettings.NeoBrutalism.email.name.borderRadius = 8;
themeSettings.NeoBrutalism.email.name.margin = [22, 22, 22, 22];
themeSettings.NeoBrutalism.email.title.color =
  themeSettings.NeoBrutalism.base.colors[6];
themeSettings.NeoBrutalism.email.title.isItalic = true;
themeSettings.NeoBrutalism.email.title.fontWeight = 700;
themeSettings.NeoBrutalism.email.title.borderColor =
  themeSettings.NeoBrutalism.base.colors[6];
themeSettings.NeoBrutalism.email.title.border[2] = 2;
themeSettings.NeoBrutalism.email.title.borderStyle = "dashed";
themeSettings.NeoBrutalism.email.title.padding = [0, 22, 0, 22];
themeSettings.NeoBrutalism.email.about.color =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.email.about.margin = [0, 22, 0, 22];
themeSettings.NeoBrutalism.email.about.textAlign = "right";
themeSettings.NeoBrutalism.email.contactDetails.backgroundColor =
  themeSettings.NeoBrutalism.base.colors[4];
themeSettings.NeoBrutalism.email.contactDetails.color =
  themeSettings.NeoBrutalism.base.colors[1];
themeSettings.NeoBrutalism.email.contactDetails.iconColor =
  themeSettings.NeoBrutalism.base.colors[6];
themeSettings.NeoBrutalism.email.contactDetails.border[0] = 4;
themeSettings.NeoBrutalism.email.contactDetails.borderColor =
  themeSettings.NeoBrutalism.base.colors[0];
themeSettings.NeoBrutalism.email.contactDetails.padding = [22, 22, 22, 22];

// NiceResume
themeSettings.NiceResume.resume.document.color =
  themeSettings.NiceResume.base.colors[0];
themeSettings.NiceResume.resume.header.margin[2] = 20;
themeSettings.NiceResume.resume.name.color =
  themeSettings.NiceResume.base.colors[0];
themeSettings.NiceResume.resume.name.isUppercase = true;
themeSettings.NiceResume.resume.name.fontSize = 34;
themeSettings.NiceResume.resume.name.fontWeight = 900;
themeSettings.NiceResume.resume.name.letterSpacing = 2;
themeSettings.NiceResume.resume.title.color =
  themeSettings.NiceResume.base.colors[2];
themeSettings.NiceResume.resume.title.isUppercase = true;
themeSettings.NiceResume.resume.title.fontSize = 20;
themeSettings.NiceResume.resume.title.fontWeight = 900;
themeSettings.NiceResume.resume.title.letterSpacing = 2;
themeSettings.NiceResume.resume.contactDetails.margin[0] = 12;
themeSettings.NiceResume.resume.contactDetails.margin[2] = 12;
themeSettings.NiceResume.resume.contactDetails.iconSize = 12;
themeSettings.NiceResume.resume.contactDetails.iconGap = 12;
themeSettings.NiceResume.resume.contactDetails.iconColor =
  themeSettings.NiceResume.base.colors[2];
themeSettings.NiceResume.resume.contactDetails.fontSize = 12;
themeSettings.NiceResume.resume.about.isItalic = true;
themeSettings.NiceResume.resume.about.padding = [24, 12, 24, 12];
themeSettings.NiceResume.resume.about.fontSize = 15;
themeSettings.NiceResume.resume.aboutQuote.isShown = true;
themeSettings.NiceResume.resume.aboutQuote.fontSize = 19;
themeSettings.NiceResume.resume.aboutQuote.color =
  themeSettings.NiceResume.base.colors[4];
themeSettings.NiceResume.resume.categoryName.color =
  themeSettings.NiceResume.base.colors[2];
themeSettings.NiceResume.resume.categoryName.isUppercase = true;
themeSettings.NiceResume.resume.categoryName.fontSize = 20;
themeSettings.NiceResume.resume.categoryName.fontWeight = 900;
themeSettings.NiceResume.resume.categoryName.letterSpacing = 2;
themeSettings.NiceResume.resume.entry.layout = 1;
themeSettings.NiceResume.resume.entryTitle.isUppercase = true;
themeSettings.NiceResume.resume.entryTitle.fontWeight = 900;
themeSettings.NiceResume.resume.entryTitle.letterSpacing = 1;
themeSettings.NiceResume.resume.entryPeriod.color =
  themeSettings.NiceResume.base.colors[2];
themeSettings.NiceResume.resume.entryOrganization.beforeSeparator = ">";
themeSettings.NiceResume.resume.entryOrganization.color =
  themeSettings.NiceResume.base.colors[2];
themeSettings.NiceResume.resume.entryLocation.beforeSeparator = ",";
themeSettings.NiceResume.resume.entryLocation.color =
  themeSettings.NiceResume.base.colors[2];
themeSettings.NiceResume.resume.entryHighlight.isItalic = true;
themeSettings.NiceResume.resume.entryHighlight.fontSize = 13;
themeSettings.NiceResume.resume.entryTag.color =
  themeSettings.NiceResume.base.colors[2];
themeSettings.NiceResume.resume.entryTag.backgroundColor =
  themeSettings.NiceResume.base.colors[1];
themeSettings.NiceResume.resume.entryTag.margin[0] = 12;
themeSettings.NiceResume.resume.entryTag.gap = 12;
themeSettings.NiceResume.letter.document.color =
  themeBaseSettings.NiceResume.colors[0];
themeSettings.NiceResume.letter.subject.isUppercase = true;
themeSettings.NiceResume.letter.subject.fontWeight = 900;
themeSettings.NiceResume.letter.subject.letterSpacing = 1;
themeSettings.NiceResume.letter.reference.color =
  themeBaseSettings.NiceResume.colors[2];
themeSettings.NiceResume.email.document.color =
  themeSettings.NiceResume.base.colors[0];
themeSettings.NiceResume.email.name.color =
  themeSettings.NiceResume.base.colors[0];
themeSettings.NiceResume.email.name.isUppercase = true;
themeSettings.NiceResume.email.name.fontSize = 34;
themeSettings.NiceResume.email.name.fontWeight = 900;
themeSettings.NiceResume.email.name.letterSpacing = 2;
themeSettings.NiceResume.email.title.color =
  themeSettings.NiceResume.base.colors[2];
themeSettings.NiceResume.email.title.isUppercase = true;
themeSettings.NiceResume.email.title.fontSize = 20;
themeSettings.NiceResume.email.title.fontWeight = 900;
themeSettings.NiceResume.email.title.letterSpacing = 2;
themeSettings.NiceResume.email.contactDetails.margin[0] = 12;
themeSettings.NiceResume.email.contactDetails.margin[2] = 12;
themeSettings.NiceResume.email.contactDetails.iconSize = 12;
themeSettings.NiceResume.email.contactDetails.iconGap = 12;
themeSettings.NiceResume.email.contactDetails.iconColor =
  themeSettings.NiceResume.base.colors[2];
themeSettings.NiceResume.email.contactDetails.fontSize = 12;
themeSettings.NiceResume.email.about.isItalic = true;
themeSettings.NiceResume.email.about.padding = [24, 12, 24, 12];
themeSettings.NiceResume.email.about.fontSize = 15;
themeSettings.NiceResume.email.aboutQuote.isShown = true;
themeSettings.NiceResume.email.aboutQuote.fontSize = 19;
themeSettings.NiceResume.email.aboutQuote.color =
  themeSettings.NiceResume.base.colors[4];

// Oilcloth
themeSettings.Oilcloth.resume.document.padding = [0, 0, 0, 0];
themeSettings.Oilcloth.resume.document.border = [15, 0, 20, 0];
themeSettings.Oilcloth.resume.document.borderColor =
  themeBaseSettings.Oilcloth.colors[1];
themeSettings.Oilcloth.resume.header.layout = 2;
themeSettings.Oilcloth.resume.header.backgroundColor =
  themeBaseSettings.Oilcloth.colors[0];
themeSettings.Oilcloth.resume.header.padding = [30, 40, 30, 40];
themeSettings.Oilcloth.resume.name.color = themeBaseSettings.Oilcloth.colors[1];
themeSettings.Oilcloth.resume.name.fontSize = 40;
themeSettings.Oilcloth.resume.name.fontWeight = 900;
themeSettings.Oilcloth.resume.name.letterSpacing = 2;
themeSettings.Oilcloth.resume.title.color =
  themeBaseSettings.Oilcloth.colors[3];
themeSettings.Oilcloth.resume.title.fontWeight = 600;
themeSettings.Oilcloth.resume.title.isUppercase = true;
themeSettings.Oilcloth.resume.title.letterSpacing = 4;
themeSettings.Oilcloth.resume.about.color =
  themeBaseSettings.Oilcloth.colors[3];
themeBaseSettings.Oilcloth.colors[3];
themeSettings.Oilcloth.resume.contactDetails.fontWeight = 600;
themeSettings.Oilcloth.resume.contactDetails.color =
  themeBaseSettings.Oilcloth.colors[3];
themeSettings.Oilcloth.resume.contactDetails.iconColor =
  themeBaseSettings.Oilcloth.colors[1];
themeSettings.Oilcloth.resume.aside.margin = [40, 0, 40, 40];
themeSettings.Oilcloth.resume.body.margin = [40, 40, 40, 40];
themeSettings.Oilcloth.resume.category.gap = 40;
themeSettings.Oilcloth.resume.categoryName.isUppercase = true;
themeSettings.Oilcloth.resume.categoryName.textAlign = "center";
themeSettings.Oilcloth.resume.categoryName.fontSize = 25;
themeSettings.Oilcloth.resume.categoryName.letterSpacing = 2;
themeSettings.Oilcloth.resume.categoryName.fontWeight = 300;
themeSettings.Oilcloth.resume.categoryName.margin[2] = 5;
themeSettings.Oilcloth.resume.entry.layout = 6;
themeSettings.Oilcloth.resume.entryPeriod.order = 1;
themeSettings.Oilcloth.resume.entryPeriod.margin[1] = 8;
themeSettings.Oilcloth.resume.entryPeriod.color =
  themeBaseSettings.Oilcloth.colors[1];
themeSettings.Oilcloth.resume.entryPeriod.fontSize = 16;
themeSettings.Oilcloth.resume.entryPeriod.fontWeight = 700;
themeSettings.Oilcloth.resume.entryTitle.order = 2;
themeSettings.Oilcloth.resume.entryTitle.fontSize = 16;
themeSettings.Oilcloth.resume.entryTitle.fontWeight = 900;
themeSettings.Oilcloth.resume.entryOrganization.fontWeight = 300;
themeSettings.Oilcloth.resume.entryOrganization.lineHeight = 1;
themeSettings.Oilcloth.resume.entryLocation.beforeSeparator = "-";
themeSettings.Oilcloth.resume.entryLocation.fontWeight = 300;
themeSettings.Oilcloth.resume.entryLocation.lineHeight = 1;
themeSettings.Oilcloth.resume.entrySummary.color =
  themeBaseSettings.Oilcloth.colors[0];
themeSettings.Oilcloth.resume.entrySummary.margin = [10, 0, 10, 0];
themeSettings.Oilcloth.resume.entrySummary.lineHeight = 1;
themeSettings.Oilcloth.resume.entryHighlight.fontWeight = 300;
themeSettings.Oilcloth.resume.entryHighlight.lineHeight = 1;
themeSettings.Oilcloth.resume.entryTag.margin[0] = 10;
themeSettings.Oilcloth.resume.entryTag.padding = [4, 12, 4, 12];
themeSettings.Oilcloth.resume.entryTag.backgroundColor =
  themeBaseSettings.Oilcloth.colors[0];
themeSettings.Oilcloth.resume.entryTag.color =
  themeBaseSettings.Oilcloth.colors[3];
themeSettings.Oilcloth.resume.entryTag.isUppercase = true;
themeSettings.Oilcloth.resume.entryTag.fontSize = 11;
themeSettings.Oilcloth.resume.entryTag.lineHeight = 1;
themeSettings.Oilcloth.resume.entryTag.gap = 10;
themeSettings.Oilcloth.letter.document.border = [15, 0, 20, 0];
themeSettings.Oilcloth.letter.document.borderColor =
  themeBaseSettings.Oilcloth.colors[1];
themeSettings.Oilcloth.letter.header.layout = 2;
themeSettings.Oilcloth.letter.header.padding = [30, 40, 30, 40];
themeSettings.Oilcloth.letter.name.color = themeBaseSettings.Oilcloth.colors[1];
themeSettings.Oilcloth.letter.name.fontSize = 40;
themeSettings.Oilcloth.letter.name.fontWeight = 900;
themeSettings.Oilcloth.letter.name.letterSpacing = 2;
themeSettings.Oilcloth.letter.title.color =
  themeBaseSettings.Oilcloth.colors[0];
themeSettings.Oilcloth.letter.title.fontWeight = 600;
themeSettings.Oilcloth.letter.title.isUppercase = true;
themeSettings.Oilcloth.letter.title.letterSpacing = 4;
themeSettings.Oilcloth.letter.about.color =
  themeBaseSettings.Oilcloth.colors[0];
themeBaseSettings.Oilcloth.colors[0];
themeSettings.Oilcloth.letter.contactDetails.fontWeight = 600;
themeSettings.Oilcloth.letter.contactDetails.color =
  themeBaseSettings.Oilcloth.colors[0];
themeSettings.Oilcloth.letter.contactDetails.iconColor =
  themeBaseSettings.Oilcloth.colors[1];
themeSettings.Oilcloth.letter.senderDetails.color =
  themeBaseSettings.Oilcloth.colors[0];
themeSettings.Oilcloth.letter.recipientDetails.color =
  themeBaseSettings.Oilcloth.colors[0];
themeSettings.Oilcloth.email.document.padding = [30, 40, 50, 40];
themeSettings.Oilcloth.email.document.border[0] = 15;
themeSettings.Oilcloth.email.document.borderColor =
  themeBaseSettings.Oilcloth.colors[1];
themeSettings.Oilcloth.email.name.color = themeBaseSettings.Oilcloth.colors[1];
themeSettings.Oilcloth.email.name.fontSize = 40;
themeSettings.Oilcloth.email.name.fontWeight = 900;
themeSettings.Oilcloth.email.name.letterSpacing = 2;
themeSettings.Oilcloth.email.title.color = themeBaseSettings.Oilcloth.colors[0];
themeSettings.Oilcloth.email.title.fontWeight = 600;
themeSettings.Oilcloth.email.title.isUppercase = true;
themeSettings.Oilcloth.email.title.letterSpacing = 4;
themeSettings.Oilcloth.email.contactDetails.margin[0] = 20;
themeSettings.Oilcloth.email.contactDetails.fontWeight = 600;
themeSettings.Oilcloth.email.contactDetails.color =
  themeBaseSettings.Oilcloth.colors[0];
themeSettings.Oilcloth.email.contactDetails.iconColor =
  themeBaseSettings.Oilcloth.colors[1];

// OpenResume
themeSettings.OpenResume.resume.document.padding = [0, 0, 0, 0];
themeSettings.OpenResume.resume.document.border = [8, 0, 0, 0];
themeSettings.OpenResume.resume.document.borderColor =
  themeBaseSettings.OpenResume.colors[0];
themeSettings.OpenResume.resume.header.layout = 0;
themeSettings.OpenResume.resume.header.margin = [24, 48, 24, 48];
themeSettings.OpenResume.resume.name.color =
  themeBaseSettings.OpenResume.colors[0];
themeSettings.OpenResume.resume.name.fontSize = 30;
themeSettings.OpenResume.resume.name.fontWeight = 700;
themeSettings.OpenResume.resume.name.lineHeight = 1.2;
themeSettings.OpenResume.resume.name.margin[2] = 10;
themeSettings.OpenResume.resume.title.fontSize = 20;
themeSettings.OpenResume.resume.title.fontWeight = 700;
themeSettings.OpenResume.resume.title.lineHeight = 1.2;
themeSettings.OpenResume.resume.title.margin[2] = 10;
themeSettings.OpenResume.resume.contactDetails.listOrientation = "row";
themeSettings.OpenResume.resume.contactDetails.gap = 40;
themeSettings.OpenResume.resume.about.isItalic = true;
themeSettings.OpenResume.resume.about.textAlign = "center";
themeSettings.OpenResume.resume.aside.margin = [24, 0, 24, 48];
themeSettings.OpenResume.resume.body.margin = [0, 48, 24, 48];
themeSettings.OpenResume.resume.categoryName.fontWeight = 700;
themeSettings.OpenResume.resume.categoryName.fontSize = 12;
themeSettings.OpenResume.resume.categoryNameSeparator.position = "left";
themeSettings.OpenResume.resume.categoryNameSeparator.height = 4;
themeSettings.OpenResume.resume.categoryNameSeparator.widthType = "custom";
themeSettings.OpenResume.resume.categoryNameSeparator.width = 8;
themeSettings.OpenResume.resume.categoryNameSeparator.margin[1] = 10;
themeSettings.OpenResume.resume.categoryNameSeparator.margin[2] = 12;
themeSettings.OpenResume.resume.categoryNameSeparator.backgroundColor =
  themeBaseSettings.OpenResume.colors[0];
themeSettings.OpenResume.resume.entry.layout = 7;
themeSettings.OpenResume.resume.entryTitle.fontWeight = 600;
themeSettings.OpenResume.resume.entryOrganization.order = 2;
themeSettings.OpenResume.resume.entryLocation.order = 3;
themeSettings.OpenResume.resume.entryLocation.beforeSeparator = ",";
themeSettings.OpenResume.resume.entryPeriod.order = 4;
themeSettings.OpenResume.resume.entrySummary.isItalic = true;
themeSettings.OpenResume.resume.entryHighlight.listMarker = "disc";
themeSettings.OpenResume.resume.entryHighlight.fontSize = 12;
themeSettings.OpenResume.resume.entryTag.margin[0] = 10;
themeSettings.OpenResume.resume.entryTag.gap = 10;
themeSettings.OpenResume.letter.document.border = [8, 0, 0, 0];
themeSettings.OpenResume.letter.document.borderColor =
  themeBaseSettings.OpenResume.colors[0];
themeSettings.OpenResume.letter.header.layout = 0;
themeSettings.OpenResume.letter.header.margin = [24, 48, 24, 48];
themeSettings.OpenResume.letter.name.color =
  themeBaseSettings.OpenResume.colors[0];
themeSettings.OpenResume.letter.name.fontSize = 30;
themeSettings.OpenResume.letter.name.fontWeight = 700;
themeSettings.OpenResume.letter.name.lineHeight = 1.2;
themeSettings.OpenResume.letter.name.margin[2] = 10;
themeSettings.OpenResume.letter.title.fontSize = 20;
themeSettings.OpenResume.letter.title.fontWeight = 700;
themeSettings.OpenResume.letter.title.lineHeight = 1.2;
themeSettings.OpenResume.letter.title.margin[2] = 10;
themeSettings.OpenResume.letter.contactDetails.listOrientation = "row";
themeSettings.OpenResume.letter.contactDetails.gap = 40;
themeSettings.OpenResume.letter.about.isItalic = true;
themeSettings.OpenResume.letter.about.textAlign = "center";
themeSettings.OpenResume.letter.senderDetails.isItalic = true;
themeSettings.OpenResume.letter.senderDetails.margin[0] = 48;
themeSettings.OpenResume.letter.senderDetails.margin[1] = 48;
themeSettings.OpenResume.letter.senderDetails.margin[3] = 48 * 2 + 4;
themeSettings.OpenResume.letter.recipientDetails.isItalic = true;
themeSettings.OpenResume.letter.recipientDetails.margin[0] = 24;
themeSettings.OpenResume.letter.recipientDetails.margin[1] = 48;
themeSettings.OpenResume.letter.reference.isBeforeSubject = true;
themeSettings.OpenResume.letter.reference.margin[1] = 48;
themeSettings.OpenResume.letter.reference.margin[3] = 48 * 2 + 4;
themeSettings.OpenResume.letter.reference.fontWeight = 700;
themeSettings.OpenResume.letter.reference.textAlign = "left";
themeSettings.OpenResume.letter.reference.color =
  themeBaseSettings.OpenResume.colors[0];
themeSettings.OpenResume.letter.subject.margin[1] = 48;
themeSettings.OpenResume.letter.subject.margin[3] = 48 * 2 + 4;
themeSettings.OpenResume.letter.subject.fontWeight = 700;
themeSettings.OpenResume.letter.subject.textAlign = "left";
themeSettings.OpenResume.letter.body.margin = [24, 48, 0, 48];
themeSettings.OpenResume.letter.body.indentation = 48;
themeSettings.OpenResume.email.document.padding = [24, 48, 24, 48];
themeSettings.OpenResume.email.document.border = [8, 0, 0, 0];
themeSettings.OpenResume.email.document.borderColor =
  themeBaseSettings.OpenResume.colors[0];
themeSettings.OpenResume.email.name.color =
  themeBaseSettings.OpenResume.colors[0];
themeSettings.OpenResume.email.name.fontSize = 30;
themeSettings.OpenResume.email.name.fontWeight = 700;
themeSettings.OpenResume.email.name.lineHeight = 1.2;
themeSettings.OpenResume.email.name.margin[2] = 10;
themeSettings.OpenResume.email.title.fontSize = 20;
themeSettings.OpenResume.email.title.fontWeight = 700;
themeSettings.OpenResume.email.title.lineHeight = 1.2;
themeSettings.OpenResume.email.title.margin[2] = 10;
themeSettings.OpenResume.email.contactDetails.listOrientation = "row";
themeSettings.OpenResume.email.contactDetails.gap = 40;
themeSettings.OpenResume.email.about.isItalic = true;
themeSettings.OpenResume.email.about.textAlign = "center";

// Paper
themeSettings.Paper.resume.document.padding = [80, 80, 80, 80];
themeSettings.Paper.resume.header.layout = 3;
themeSettings.Paper.resume.name.fontSize = 20;
themeSettings.Paper.resume.title.fontSize = 20;
themeSettings.Paper.resume.contactDetails.listOrientation = "row";
themeSettings.Paper.resume.contactDetails.gap = 12;
themeSettings.Paper.resume.contactDetails.fontSize = 12;
themeSettings.Paper.resume.about.fontSize = 12;
themeSettings.Paper.resume.about.padding = [16, 16, 16, 0];
themeSettings.Paper.resume.about.border[0] = 2;
themeSettings.Paper.resume.about.borderStyle = "dotted";
themeSettings.Paper.resume.about.borderColor =
  themeBaseSettings.Paper.colors[0];
themeSettings.Paper.resume.category.padding = [16, 16, 16, 0];
themeSettings.Paper.resume.category.border[0] = 2;
themeSettings.Paper.resume.category.borderStyle = "dotted";
themeSettings.Paper.resume.category.borderColor =
  themeBaseSettings.Paper.colors[0];
themeSettings.Paper.resume.categoryName.isAside = true;
themeSettings.Paper.resume.categoryName.widthType = "custom";
themeSettings.Paper.resume.categoryName.width = 20;
themeSettings.Paper.resume.categoryName.isUppercase = true;
themeSettings.Paper.resume.categoryName.fontSize = 12;
themeSettings.Paper.resume.entry.layout = 9;
themeSettings.Paper.resume.entryTitle.fontWeight = 700;
themeSettings.Paper.resume.entryTitle.fontSize = 13;
themeSettings.Paper.resume.entryOrganization.order = 2;
themeSettings.Paper.resume.entryOrganization.beforeSeparator = "|";
themeSettings.Paper.resume.entryOrganization.fontSize = 13;
themeSettings.Paper.resume.entryLocation.order = 3;
themeSettings.Paper.resume.entryLocation.beforeSeparator = ",";
themeSettings.Paper.resume.entryLocation.fontSize = 13;
themeSettings.Paper.resume.entryPeriod.order = 4;
themeSettings.Paper.resume.entryPeriod.fontSize = 13;
themeSettings.Paper.resume.entrySummary.fontSize = 13;
themeSettings.Paper.resume.entryHighlight.fontSize = 13;
themeSettings.Paper.resume.entryHighlight.listMarker = "circle";
themeSettings.Paper.resume.entryTag.border = [1, 1, 1, 1];
themeSettings.Paper.resume.entryTag.borderColor =
  themeBaseSettings.Paper.colors[0];
themeSettings.Paper.resume.entryTag.color = themeBaseSettings.Paper.colors[0];
themeSettings.Paper.resume.entryTag.backgroundColor = "transparent";
themeSettings.Paper.letter.document.padding = [80, 80, 80, 80];
themeSettings.Paper.letter.header.layout = 3;
themeSettings.Paper.letter.name.fontSize = 20;
themeSettings.Paper.letter.title.fontSize = 20;
themeSettings.Paper.letter.contactDetails.listOrientation = "row";
themeSettings.Paper.letter.contactDetails.gap = 12;
themeSettings.Paper.letter.contactDetails.fontSize = 12;
themeSettings.Paper.letter.about.fontSize = 12;
themeSettings.Paper.letter.about.padding = [16, 16, 16, 0];
themeSettings.Paper.letter.about.border[0] = 2;
themeSettings.Paper.letter.about.borderStyle = "dotted";
themeSettings.Paper.letter.about.borderColor =
  themeBaseSettings.Paper.colors[0];
themeSettings.Paper.letter.subject.textAlign = "left";
themeSettings.Paper.letter.reference.isItalic = true;
themeSettings.Paper.letter.reference.textAlign = "left";
themeSettings.Paper.letter.body.indentation = 0;
themeSettings.Paper.letter.body.isSignatureRightAligned = false;
themeSettings.Paper.email.document.layout = 3;
themeSettings.Paper.email.document.padding = [80, 80, 80, 80];
themeSettings.Paper.email.name.padding[0] = 16;
themeSettings.Paper.email.name.border[0] = 2;
themeSettings.Paper.email.name.borderStyle = "dotted";
themeSettings.Paper.email.name.borderColor = themeBaseSettings.Paper.colors[0];
themeSettings.Paper.email.name.fontSize = 20;
themeSettings.Paper.email.title.fontSize = 20;
themeSettings.Paper.email.contactDetails.listOrientation = "row";
themeSettings.Paper.email.contactDetails.gap = 12;
themeSettings.Paper.email.contactDetails.fontSize = 12;
themeSettings.Paper.email.about.fontSize = 12;
themeSettings.Paper.email.about.padding = [16, 16, 16, 0];

// Pharmacy
themeSettings.Pharmacy.resume.document.padding = [48, 48, 48, 48];
themeSettings.Pharmacy.resume.header.layout = 4;
themeSettings.Pharmacy.resume.name.color = themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.resume.name.isUppercase = true;
themeSettings.Pharmacy.resume.name.fontSize = 30;
themeSettings.Pharmacy.resume.name.letterSpacing = 2;
themeSettings.Pharmacy.resume.contactDetails.margin = [10, 0, 30, 0];
themeSettings.Pharmacy.resume.contactDetails.alignment = "end";
themeSettings.Pharmacy.resume.contactDetails.border[1] = 2;
themeSettings.Pharmacy.resume.contactDetails.borderColor =
  themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.resume.contactDetails.padding[1] = 20;
themeSettings.Pharmacy.resume.contactDetails.fontSize = 12;
themeSettings.Pharmacy.resume.contactDetails.isIconFirst = false;
themeSettings.Pharmacy.resume.title.color =
  themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.resume.title.fontSize = 36;
themeSettings.Pharmacy.resume.title.letterSpacing = 3;
themeSettings.Pharmacy.resume.title.textAlign = "center";
themeSettings.Pharmacy.resume.about.fontSize = 16;
themeSettings.Pharmacy.resume.about.color =
  themeBaseSettings.Pharmacy.colors[2];
themeSettings.Pharmacy.resume.about.textAlign = "center";
themeSettings.Pharmacy.resume.aside.margin[0] = 25;
themeSettings.Pharmacy.resume.aside.margin[1] = 25;
themeSettings.Pharmacy.resume.body.margin[0] = 25;
themeSettings.Pharmacy.resume.category.gap = 34;
themeSettings.Pharmacy.resume.categoryName.margin[2] = 6;
themeSettings.Pharmacy.resume.categoryName.isUppercase = true;
themeSettings.Pharmacy.resume.categoryName.fontSize = 16;
themeSettings.Pharmacy.resume.categoryName.fontWeight = 700;
themeSettings.Pharmacy.resume.categoryName.letterSpacing = 1;
themeSettings.Pharmacy.resume.entry.layout = 4;
themeSettings.Pharmacy.resume.entry.border[3] = 2;
themeSettings.Pharmacy.resume.entry.borderColor =
  themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.resume.entry.padding[3] = 20;
themeSettings.Pharmacy.resume.entryPeriod.order = 1;
themeSettings.Pharmacy.resume.entryPeriod.margin[1] = 13;
themeSettings.Pharmacy.resume.entryPeriod.color =
  themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.resume.entryTitle.order = 2;
themeSettings.Pharmacy.resume.entryOrganization.margin[1] = 13;
themeSettings.Pharmacy.resume.entryOrganization.color =
  themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.resume.entryLocation.color =
  themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.resume.entrySummary.color =
  themeBaseSettings.Pharmacy.colors[2];
themeSettings.Pharmacy.resume.entryHighlight.listMarker = "disc";
themeSettings.Pharmacy.resume.entryHighlight.color =
  themeBaseSettings.Pharmacy.colors[1];
themeSettings.Pharmacy.resume.entryTag.color =
  themeBaseSettings.Pharmacy.colors[2];
themeSettings.Pharmacy.resume.entryTag.backgroundColor = "transparent";
themeSettings.Pharmacy.resume.entryTag.borderRadius = 0;
themeSettings.Pharmacy.resume.entryTag.border[3] = 1;
themeSettings.Pharmacy.resume.entryTag.padding[0] = 0;
themeSettings.Pharmacy.resume.entryTag.padding[2] = 0;
themeSettings.Pharmacy.resume.entryTag.borderColor =
  themeBaseSettings.Pharmacy.colors[2];
themeSettings.Pharmacy.resume.entryTag.gap = 20;
themeSettings.Pharmacy.letter.document.padding = [48, 48, 48, 48];
themeSettings.Pharmacy.letter.header.layout = 0;
themeSettings.Pharmacy.letter.name.color = themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.letter.name.isUppercase = true;
themeSettings.Pharmacy.letter.name.fontSize = 30;
themeSettings.Pharmacy.letter.name.letterSpacing = 2;
themeSettings.Pharmacy.letter.contactDetails.margin = [10, 0, 30, 0];
themeSettings.Pharmacy.letter.contactDetails.alignment = "start";
themeSettings.Pharmacy.letter.contactDetails.border[3] = 2;
themeSettings.Pharmacy.letter.contactDetails.borderColor =
  themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.letter.contactDetails.padding[3] = 20;
themeSettings.Pharmacy.letter.contactDetails.fontSize = 12;
themeSettings.Pharmacy.letter.title.color =
  themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.letter.title.fontSize = 36;
themeSettings.Pharmacy.letter.title.letterSpacing = 3;
themeSettings.Pharmacy.letter.about.fontSize = 16;
themeSettings.Pharmacy.letter.about.color =
  themeBaseSettings.Pharmacy.colors[2];
themeSettings.Pharmacy.letter.senderDetails.borderColor =
  themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.letter.senderDetails.border[3] = 2;
themeSettings.Pharmacy.letter.senderDetails.padding[3] = 20;
themeSettings.Pharmacy.letter.recipientDetails.borderColor =
  themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.letter.recipientDetails.border[1] = 2;
themeSettings.Pharmacy.letter.recipientDetails.padding[1] = 20;
themeSettings.Pharmacy.letter.subject.fontSize = 18;
themeSettings.Pharmacy.letter.subject.color =
  themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.letter.reference.fontSize = 15;
themeSettings.Pharmacy.letter.reference.color =
  themeBaseSettings.Pharmacy.colors[2];
themeSettings.Pharmacy.email.document.padding = [48, 48, 48, 48];
themeSettings.Pharmacy.email.document.layout = 0;
themeSettings.Pharmacy.email.name.color = themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.email.name.isUppercase = true;
themeSettings.Pharmacy.email.name.fontSize = 30;
themeSettings.Pharmacy.email.name.letterSpacing = 2;
themeSettings.Pharmacy.email.contactDetails.margin = [10, 0, 30, 0];
themeSettings.Pharmacy.email.contactDetails.alignment = "start";
themeSettings.Pharmacy.email.contactDetails.border[3] = 2;
themeSettings.Pharmacy.email.contactDetails.borderColor =
  themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.email.contactDetails.padding[3] = 20;
themeSettings.Pharmacy.email.contactDetails.fontSize = 12;
themeSettings.Pharmacy.email.title.color = themeBaseSettings.Pharmacy.colors[0];
themeSettings.Pharmacy.email.title.letterSpacing = 3;
themeSettings.Pharmacy.email.about.fontSize = 16;
themeSettings.Pharmacy.email.about.color = themeBaseSettings.Pharmacy.colors[2];

// Red
themeSettings.Red.resume.document.padding = [48, 56, 48, 56];
themeSettings.Red.resume.header.layout = 1;
themeSettings.Red.resume.header.padding = [24, 40, 24, 40];
themeSettings.Red.resume.name.font = themeBaseSettings.Red.displayFont;
themeSettings.Red.resume.name.fontSize = 36;
themeSettings.Red.resume.name.isUppercase = true;
themeSettings.Red.resume.name.textAlign = "center";
themeSettings.Red.resume.name.lineHeight = 1;
themeSettings.Red.resume.name.padding = [10, 16, 0, 16];
themeSettings.Red.resume.name.border[0] = 4;
themeSettings.Red.resume.name.borderColor = themeBaseSettings.Red.colors[0];
themeSettings.Red.resume.title.font = themeBaseSettings.Red.displayFont;
themeSettings.Red.resume.title.fontSize = 24;
themeSettings.Red.resume.title.textAlign = "center";
themeSettings.Red.resume.title.padding = [0, 16, 10, 16];
themeSettings.Red.resume.title.border[2] = 4;
themeSettings.Red.resume.title.borderColor = themeBaseSettings.Red.colors[0];
themeSettings.Red.resume.contactDetails.margin[3] = 30;
themeSettings.Red.resume.contactDetails.border[3] = 1;
themeSettings.Red.resume.contactDetails.borderColor =
  themeBaseSettings.Red.colors[0];
themeSettings.Red.resume.contactDetails.padding[3] = 10;
themeSettings.Red.resume.contactDetails.fontSize = 11;
themeSettings.Red.resume.contactDetails.isItalic = true;
themeSettings.Red.resume.contactDetails.color = themeBaseSettings.Red.colors[0];
themeSettings.Red.resume.contactDetails.iconColor =
  themeBaseSettings.Red.colors[0];
themeSettings.Red.resume.aside.margin[0] = 22;
themeSettings.Red.resume.aside.margin[1] = 22;
themeSettings.Red.resume.body.margin[0] = 22;
themeSettings.Red.resume.categoryName.isUppercase = true;
themeSettings.Red.resume.categoryName.font = themeBaseSettings.Red.displayFont;
themeSettings.Red.resume.categoryName.fontSize = 28;
themeSettings.Red.resume.categoryName.textAlign = "center";
themeSettings.Red.resume.entry.layout = 8;
themeSettings.Red.resume.entryOrganization.order = 2;
themeSettings.Red.resume.entryOrganization.beforeSeparator = "-";
themeSettings.Red.resume.entryOrganization.color =
  themeBaseSettings.Red.colors[0];
themeSettings.Red.resume.entryPeriod.order = 3;
themeSettings.Red.resume.entryLocation.order = 4;
themeSettings.Red.resume.entryLocation.beforeSeparator = ",";
themeSettings.Red.resume.entrySummary.fontSize = 12;
themeSettings.Red.resume.entryHighlight.fontSize = 12;
themeSettings.Red.resume.entryHighlight.isItalic = true;
themeSettings.Red.resume.entryHighlight.margin[3] = 20;
themeSettings.Red.resume.entryHighlight.listMarker = "square";
themeSettings.Red.resume.entryHighlight.listMarkerColor =
  themeBaseSettings.Red.colors[0];
themeSettings.Red.resume.entryHighlight.color = themeBaseSettings.Red.colors[1];
themeSettings.Red.resume.entryTag.isUppercase = true;
themeSettings.Red.letter.document.padding = [48, 56, 48, 56];
themeSettings.Red.letter.header.layout = 1;
themeSettings.Red.letter.header.padding = [24, 40, 24, 40];
themeSettings.Red.letter.name.font = themeBaseSettings.Red.displayFont;
themeSettings.Red.letter.name.fontSize = 36;
themeSettings.Red.letter.name.isUppercase = true;
themeSettings.Red.letter.name.textAlign = "center";
themeSettings.Red.letter.name.lineHeight = 1;
themeSettings.Red.letter.name.padding = [10, 16, 0, 16];
themeSettings.Red.letter.name.border[0] = 4;
themeSettings.Red.letter.name.borderColor = themeBaseSettings.Red.colors[0];
themeSettings.Red.letter.title.font = themeBaseSettings.Red.displayFont;
themeSettings.Red.letter.title.fontSize = 24;
themeSettings.Red.letter.title.textAlign = "center";
themeSettings.Red.letter.title.padding = [0, 16, 10, 16];
themeSettings.Red.letter.title.border[2] = 4;
themeSettings.Red.letter.title.borderColor = themeBaseSettings.Red.colors[0];
themeSettings.Red.letter.contactDetails.margin[3] = 30;
themeSettings.Red.letter.contactDetails.border[3] = 1;
themeSettings.Red.letter.contactDetails.borderColor =
  themeBaseSettings.Red.colors[0];
themeSettings.Red.letter.contactDetails.padding[3] = 10;
themeSettings.Red.letter.contactDetails.fontSize = 11;
themeSettings.Red.letter.contactDetails.isItalic = true;
themeSettings.Red.letter.contactDetails.color = themeBaseSettings.Red.colors[0];
themeSettings.Red.letter.contactDetails.iconColor =
  themeBaseSettings.Red.colors[0];
themeSettings.Red.letter.senderDetails.margin[0] = 0;
themeSettings.Red.letter.senderDetails.isItalic = true;
themeSettings.Red.letter.senderDetails.fontSize = 12;
themeSettings.Red.letter.senderDetails.color = themeBaseSettings.Red.colors[0];
themeSettings.Red.letter.recipientDetails.margin[0] = 0;
themeSettings.Red.letter.recipientDetails.isItalic = true;
themeSettings.Red.letter.recipientDetails.fontSize = 12;
themeSettings.Red.letter.recipientDetails.color =
  themeBaseSettings.Red.colors[0];
themeSettings.Red.letter.subject.fontWeight = 600;
themeSettings.Red.letter.reference.color = themeBaseSettings.Red.colors[0];
themeSettings.Red.email.document.layout = 1;
themeSettings.Red.email.document.padding = [48, 56, 48, 56];
themeSettings.Red.email.name.font = themeBaseSettings.Red.displayFont;
themeSettings.Red.email.name.fontSize = 36;
themeSettings.Red.email.name.isUppercase = true;
themeSettings.Red.email.name.textAlign = "center";
themeSettings.Red.email.name.lineHeight = 1;
themeSettings.Red.email.name.padding = [10, 16, 0, 16];
themeSettings.Red.email.name.border[0] = 4;
themeSettings.Red.email.name.borderColor = themeBaseSettings.Red.colors[0];
themeSettings.Red.email.title.font = themeBaseSettings.Red.displayFont;
themeSettings.Red.email.title.fontSize = 24;
themeSettings.Red.email.title.textAlign = "center";
themeSettings.Red.email.title.padding = [0, 16, 10, 16];
themeSettings.Red.email.title.border[2] = 4;
themeSettings.Red.email.title.borderColor = themeBaseSettings.Red.colors[0];
themeSettings.Red.email.contactDetails.margin[3] = 30;
themeSettings.Red.email.contactDetails.border[3] = 1;
themeSettings.Red.email.contactDetails.borderColor =
  themeBaseSettings.Red.colors[0];
themeSettings.Red.email.contactDetails.padding[3] = 10;
themeSettings.Red.email.contactDetails.fontSize = 11;
themeSettings.Red.email.contactDetails.isItalic = true;
themeSettings.Red.email.contactDetails.color = themeBaseSettings.Red.colors[0];
themeSettings.Red.email.contactDetails.iconColor =
  themeBaseSettings.Red.colors[0];

// Shelf
themeSettings.Shelf.resume.header.layout = 2;
themeSettings.Shelf.resume.name.font = themeSettings.Shelf.base.displayFont;
themeSettings.Shelf.resume.name.fontSize = 40;
themeSettings.Shelf.resume.name.fontWeight = 900;
themeSettings.Shelf.resume.name.lineHeight = 1.1;
themeSettings.Shelf.resume.title.fontSize = 22;
themeSettings.Shelf.resume.title.fontWeight = 300;
themeSettings.Shelf.resume.title.letterSpacing = 2;
themeSettings.Shelf.resume.about.fontSize = 12;
themeSettings.Shelf.resume.contactDetails.fontSize = 12;
themeSettings.Shelf.resume.category.margin[0] = 16;
themeSettings.Shelf.resume.categoryName.fontWeight = 300;
themeSettings.Shelf.resume.categoryName.letterSpacing = 2;
themeSettings.Shelf.resume.categoryName.margin[2] = 22;
themeSettings.Shelf.resume.entry.layout = 13;
// TODO align title, period, location center or right when the concept of "entryHeader" exists? It could improuve legibility
themeSettings.Shelf.resume.entryPeriod.order = 1;
themeSettings.Shelf.resume.entryPeriod.fontSize = 12;
themeSettings.Shelf.resume.entryTitle.order = 2;
themeSettings.Shelf.resume.entryTitle.fontWeight = 700;
themeSettings.Shelf.resume.entryOrganization.fontSize = 12;
themeSettings.Shelf.resume.entryLocation.fontSize = 12;
themeSettings.Shelf.resume.entrySummary.lineHeight = 1.1;
themeSettings.Shelf.resume.entryHighlight.margin[0] = 8;
themeSettings.Shelf.resume.entryHighlight.fontSize = 12;
themeSettings.Shelf.resume.entryTag.margin[0] = 8;
themeSettings.Shelf.letter.header.layout = 2;
themeSettings.Shelf.letter.name.font = themeSettings.Shelf.base.displayFont;
themeSettings.Shelf.letter.name.fontSize = 40;
themeSettings.Shelf.letter.name.fontWeight = 900;
themeSettings.Shelf.letter.name.lineHeight = 1.1;
themeSettings.Shelf.letter.title.fontSize = 22;
themeSettings.Shelf.letter.title.fontWeight = 300;
themeSettings.Shelf.letter.title.letterSpacing = 2;
themeSettings.Shelf.letter.about.fontSize = 12;
themeSettings.Shelf.letter.contactDetails.fontSize = 12;
themeSettings.Shelf.email.document.layout = 2;
themeSettings.Shelf.email.name.font = themeSettings.Shelf.base.displayFont;
themeSettings.Shelf.email.name.fontSize = 40;
themeSettings.Shelf.email.name.fontWeight = 900;
themeSettings.Shelf.email.name.lineHeight = 1.1;
themeSettings.Shelf.email.title.fontSize = 22;
themeSettings.Shelf.email.title.fontWeight = 300;
themeSettings.Shelf.email.title.letterSpacing = 2;
themeSettings.Shelf.email.about.fontSize = 12;
themeSettings.Shelf.email.contactDetails.fontSize = 12;

// StackOverflow
themeSettings.StackOverflow.resume.name.fontSize = 36;
themeSettings.StackOverflow.resume.name.fontWeight = 100;
themeSettings.StackOverflow.resume.name.lineHeight = 1.2;
themeSettings.StackOverflow.resume.title.fontSize = 22;
themeSettings.StackOverflow.resume.title.fontWeight = 300;
themeSettings.StackOverflow.resume.title.color =
  themeSettings.StackOverflow.base.colors[3];
themeSettings.StackOverflow.resume.contactDetails.listOrientation = "row";
themeSettings.StackOverflow.resume.contactDetails.gap = 18;
themeSettings.StackOverflow.resume.contactDetails.color =
  themeSettings.StackOverflow.base.colors[5];
themeSettings.StackOverflow.resume.contactDetails.iconColor =
  themeSettings.StackOverflow.base.colors[6];
themeSettings.StackOverflow.resume.about.margin[0] = 20;
themeSettings.StackOverflow.resume.aside.margin[0] = 10;
themeSettings.StackOverflow.resume.aside.margin[1] = 10;
themeSettings.StackOverflow.resume.body.margin[0] = 10;
themeSettings.StackOverflow.resume.category.margin[0] = 10;
themeSettings.StackOverflow.resume.categoryName.isUppercase = true;
themeSettings.StackOverflow.resume.categoryName.fontSize = 12;
themeSettings.StackOverflow.resume.categoryName.fontWeight = 600;
themeSettings.StackOverflow.resume.categoryName.color =
  themeSettings.StackOverflow.base.colors[1];
themeSettings.StackOverflow.resume.categoryName.padding = [0, 12, 6, 0];
themeSettings.StackOverflow.resume.categoryNameSeparator.position = "right";
themeSettings.StackOverflow.resume.categoryNameSeparator.margin[2] = 8;
themeSettings.StackOverflow.resume.categoryNameSeparator.height = 1;
themeSettings.StackOverflow.resume.categoryNameSeparator.backgroundColor =
  themeSettings.StackOverflow.base.colors[6];
themeSettings.StackOverflow.resume.entry.layout = 9;
themeSettings.StackOverflow.resume.entryTitle.fontWeight = 600;
themeSettings.StackOverflow.resume.entryOrganization.order = 2;
themeSettings.StackOverflow.resume.entryOrganization.beforeSeparator = "|";
themeSettings.StackOverflow.resume.entryOrganization.fontSize = 12;
themeSettings.StackOverflow.resume.entryOrganization.color =
  themeSettings.StackOverflow.base.colors[3];
themeSettings.StackOverflow.resume.entryLocation.order = 3;
themeSettings.StackOverflow.resume.entryLocation.beforeSeparator = ",";
themeSettings.StackOverflow.resume.entryLocation.fontSize = 12;
themeSettings.StackOverflow.resume.entryLocation.color =
  themeSettings.StackOverflow.base.colors[3];
themeSettings.StackOverflow.resume.entryPeriod.order = 4;
themeSettings.StackOverflow.resume.entryPeriod.fontWeight = 600;
themeSettings.StackOverflow.resume.entrySummary.fontSize = 12;
themeSettings.StackOverflow.resume.entryHighlight.fontSize = 12;
themeSettings.StackOverflow.resume.entryTag.gap = 2;
themeSettings.StackOverflow.resume.entryTag.padding = [4, 5, 4, 5];
themeSettings.StackOverflow.resume.entryTag.backgroundColor =
  themeSettings.StackOverflow.base.colors[6];
themeSettings.StackOverflow.resume.entryTag.color =
  themeSettings.StackOverflow.base.colors[5];
themeSettings.StackOverflow.resume.entryTag.fontSize = 12;
themeSettings.StackOverflow.resume.entryTag.borderRadius = 0;
themeSettings.StackOverflow.letter.name.fontSize = 36;
themeSettings.StackOverflow.letter.name.fontWeight = 100;
themeSettings.StackOverflow.letter.name.lineHeight = 1.2;
themeSettings.StackOverflow.letter.title.fontSize = 22;
themeSettings.StackOverflow.letter.title.fontWeight = 300;
themeSettings.StackOverflow.letter.title.color =
  themeSettings.StackOverflow.base.colors[3];
themeSettings.StackOverflow.letter.contactDetails.listOrientation = "row";
themeSettings.StackOverflow.letter.contactDetails.gap = 18;
themeSettings.StackOverflow.letter.contactDetails.color =
  themeSettings.StackOverflow.base.colors[5];
themeSettings.StackOverflow.letter.contactDetails.iconColor =
  themeSettings.StackOverflow.base.colors[6];
themeSettings.StackOverflow.letter.senderDetails.fontSize = 12;
themeSettings.StackOverflow.letter.senderDetails.color =
  themeSettings.StackOverflow.base.colors[3];
themeSettings.StackOverflow.letter.recipientDetails.fontSize = 12;
themeSettings.StackOverflow.letter.recipientDetails.color =
  themeSettings.StackOverflow.base.colors[3];
themeSettings.StackOverflow.letter.subject.fontWeight = 600;
themeSettings.StackOverflow.letter.reference.padding = [4, 5, 4, 5];
themeSettings.StackOverflow.letter.reference.backgroundColor =
  themeSettings.StackOverflow.base.colors[6];
themeSettings.StackOverflow.letter.reference.color =
  themeSettings.StackOverflow.base.colors[5];
themeSettings.StackOverflow.letter.reference.fontSize = 12;
themeSettings.StackOverflow.letter.body.isJustified = false;
themeSettings.StackOverflow.email.name.fontSize = 36;
themeSettings.StackOverflow.email.name.fontWeight = 100;
themeSettings.StackOverflow.email.name.lineHeight = 1.2;
themeSettings.StackOverflow.email.title.fontSize = 22;
themeSettings.StackOverflow.email.title.fontWeight = 300;
themeSettings.StackOverflow.email.title.color =
  themeSettings.StackOverflow.base.colors[3];
themeSettings.StackOverflow.email.contactDetails.listOrientation = "row";
themeSettings.StackOverflow.email.contactDetails.gap = 18;
themeSettings.StackOverflow.email.contactDetails.color =
  themeSettings.StackOverflow.base.colors[5];
themeSettings.StackOverflow.email.contactDetails.iconColor =
  themeSettings.StackOverflow.base.colors[6];
themeSettings.StackOverflow.email.about.margin[0] = 20;

// Stone
themeSettings.Stone.resume.header.layout = 0;
themeSettings.Stone.resume.name.font = themeBaseSettings.Stone.displayFont;
themeSettings.Stone.resume.name.textAlign = "center";
themeSettings.Stone.resume.name.fontSize = 36;
themeSettings.Stone.resume.name.margin[2] = 2;
themeSettings.Stone.resume.title.textAlign = "center";
themeSettings.Stone.resume.title.fontSize = 20;
themeSettings.Stone.resume.title.margin[2] = 2;
themeSettings.Stone.resume.contactDetails.fontSize = 12;
themeSettings.Stone.resume.contactDetails.listOrientation = "row";
themeSettings.Stone.resume.contactDetails.alignment = "center";
themeSettings.Stone.resume.contactDetails.gap = 30;
themeSettings.Stone.resume.contactDetails.padding = [2, 20, 20, 20];
themeSettings.Stone.resume.about.font = themeBaseSettings.Stone.displayFont;
themeSettings.Stone.resume.about.textAlign = "center";
themeSettings.Stone.resume.about.fontSize = 12;
themeSettings.Stone.resume.about.padding = [25, 0, 25, 0];
themeSettings.Stone.resume.about.border[0] = 1;
themeSettings.Stone.resume.about.borderColor =
  themeBaseSettings.Stone.colors[2];
themeSettings.Stone.resume.aside.width = 25;
themeSettings.Stone.resume.aside.margin[1] = 25;
themeSettings.Stone.resume.category.padding = [25, 0, 25, 0];
themeSettings.Stone.resume.category.border[0] = 1;
themeSettings.Stone.resume.category.borderColor =
  themeBaseSettings.Stone.colors[2];
themeSettings.Stone.resume.categoryName.isUppercase = true;
themeSettings.Stone.resume.categoryName.color =
  themeBaseSettings.Stone.colors[0];
themeSettings.Stone.resume.categoryName.font =
  themeBaseSettings.Stone.displayFont;
themeSettings.Stone.resume.categoryName.fontSize = 20;
themeSettings.Stone.resume.categoryName.fontWeight = 700;
themeSettings.Stone.resume.categoryName.margin[2] = 20;
themeSettings.Stone.resume.entry.layout = 10;
themeSettings.Stone.resume.entryTitle.isUppercase = true;
themeSettings.Stone.resume.entryTitle.lineHeight = 1;
themeSettings.Stone.resume.entryTitle.fontSize = 13;
themeSettings.Stone.resume.entryOrganization.order = 2;
themeSettings.Stone.resume.entryOrganization.fontSize = 12;
themeSettings.Stone.resume.entryOrganization.color =
  themeBaseSettings.Stone.colors[1];
themeSettings.Stone.resume.entryLocation.order = 3;
themeSettings.Stone.resume.entryLocation.beforeSeparator = "|";
themeSettings.Stone.resume.entryLocation.fontSize = 12;
themeSettings.Stone.resume.entryLocation.color =
  themeBaseSettings.Stone.colors[1];
themeSettings.Stone.resume.entryPeriod.order = 4;
themeSettings.Stone.resume.entryPeriod.beforeSeparator = "|";
themeSettings.Stone.resume.entryPeriod.fontSize = 12;
themeSettings.Stone.resume.entryPeriod.color =
  themeBaseSettings.Stone.colors[1];
themeSettings.Stone.resume.entryTag.backgroundColor =
  themeBaseSettings.Stone.colors[2];
themeSettings.Stone.resume.entryTag.padding = [2, 10, 2, 10];
themeSettings.Stone.resume.entryTag.borderRadius = 0;
themeSettings.Stone.resume.entryTag.fontSize = 12;
themeSettings.Stone.letter.document.padding = [48, 48, 48, 48];
themeSettings.Stone.letter.header.layout = 0;
themeSettings.Stone.letter.name.font = themeBaseSettings.Stone.displayFont;
themeSettings.Stone.letter.name.fontSize = 24;
themeSettings.Stone.letter.title.fontSize = 16;
themeSettings.Stone.letter.contactDetails.fontSize = 12;
themeSettings.Stone.letter.contactDetails.listOrientation = "row";
themeSettings.Stone.letter.contactDetails.alignment = "center";
themeSettings.Stone.letter.contactDetails.gap = 24;
themeSettings.Stone.letter.contactDetails.padding = [10, 0, 10, 0];
themeSettings.Stone.letter.about.font = themeBaseSettings.Stone.displayFont;
themeSettings.Stone.letter.about.fontSize = 12;
themeSettings.Stone.letter.senderDetails.color =
  themeBaseSettings.Stone.colors[1];
themeSettings.Stone.letter.recipientDetails.color =
  themeBaseSettings.Stone.colors[1];
themeSettings.Stone.letter.recipientDetails.borderColor =
  themeBaseSettings.Stone.colors[2];
themeSettings.Stone.letter.recipientDetails.border = [1, 1, 1, 1];
themeSettings.Stone.letter.recipientDetails.padding = [6, 10, 6, 10];
themeSettings.Stone.letter.subject.textAlign = "left";
themeSettings.Stone.letter.subject.isUppercase = true;
themeSettings.Stone.letter.subject.fontSize = 20;
themeSettings.Stone.letter.subject.fontWeight = 600;
themeSettings.Stone.letter.subject.font = themeBaseSettings.Stone.displayFont;
themeSettings.Stone.letter.reference.margin[0] = 10;
themeSettings.Stone.letter.reference.textAlign = "left";
themeSettings.Stone.letter.reference.color = themeBaseSettings.Stone.colors[1];
themeSettings.Stone.letter.body.margin[0] = 40;
themeSettings.Stone.letter.body.indentation = 0;
themeSettings.Stone.letter.body.isSignatureRightAligned = false;
themeSettings.Stone.email.name.font = themeBaseSettings.Stone.displayFont;
themeSettings.Stone.email.name.fontSize = 36;
themeSettings.Stone.email.name.margin[2] = 2;
themeSettings.Stone.email.title.fontSize = 20;
themeSettings.Stone.email.title.margin[2] = 2;
themeSettings.Stone.email.contactDetails.fontSize = 12;
themeSettings.Stone.email.contactDetails.listOrientation = "row";
themeSettings.Stone.email.contactDetails.alignment = "center";
themeSettings.Stone.email.contactDetails.gap = 30;
themeSettings.Stone.email.contactDetails.padding = [2, 20, 20, 20];
themeSettings.Stone.email.about.font = themeBaseSettings.Stone.displayFont;
themeSettings.Stone.email.about.textAlign = "center";
themeSettings.Stone.email.about.fontSize = 12;
themeSettings.Stone.email.about.padding = [25, 0, 25, 0];
themeSettings.Stone.email.about.border[0] = 1;
themeSettings.Stone.email.about.borderColor = themeBaseSettings.Stone.colors[2];

// Toothpaste
themeSettings.Toothpaste.resume.document.padding = [0, 0, 0, 0];
themeSettings.Toothpaste.resume.header.layout = 1;
themeSettings.Toothpaste.resume.header.padding = [24, 40, 24, 40];
themeSettings.Toothpaste.resume.name.font =
  themeBaseSettings.Toothpaste.displayFont;
themeSettings.Toothpaste.resume.name.fontSize = 36;
themeSettings.Toothpaste.resume.name.isUppercase = true;
themeSettings.Toothpaste.resume.name.color =
  themeBaseSettings.Toothpaste.colors[0];
themeSettings.Toothpaste.resume.title.font =
  themeBaseSettings.Toothpaste.displayFont;
themeSettings.Toothpaste.resume.title.fontSize = 24;
themeSettings.Toothpaste.resume.title.isUppercase = true;
themeSettings.Toothpaste.resume.title.color =
  themeBaseSettings.Toothpaste.colors[1];
themeSettings.Toothpaste.resume.contactDetails.margin[1] = 80;
themeSettings.Toothpaste.resume.contactDetails.margin[3] = 60;
themeSettings.Toothpaste.resume.contactDetails.fontSize = 12;
themeSettings.Toothpaste.resume.about.textAlign = "center";
themeSettings.Toothpaste.resume.about.fontSize = 12;
themeSettings.Toothpaste.resume.aside.border[1] = 2;
themeSettings.Toothpaste.resume.aside.borderColor =
  themeBaseSettings.Toothpaste.colors[0];
themeSettings.Toothpaste.resume.category.gap = 0;
themeSettings.Toothpaste.resume.category.padding = [24, 40, 24, 40];
themeSettings.Toothpaste.resume.category.border[0] = 2;
themeSettings.Toothpaste.resume.category.borderColor =
  themeBaseSettings.Toothpaste.colors[0];
themeSettings.Toothpaste.resume.categoryName.font =
  themeBaseSettings.Toothpaste.displayFont;
themeSettings.Toothpaste.resume.categoryName.fontSize = 24;
themeSettings.Toothpaste.resume.categoryName.color =
  themeBaseSettings.Toothpaste.colors[0];
themeSettings.Toothpaste.resume.categoryName.isUppercase = true;
themeSettings.Toothpaste.resume.entry.layout = 1;
themeSettings.Toothpaste.resume.entryTitle.font =
  themeBaseSettings.Toothpaste.displayFont;
themeSettings.Toothpaste.resume.entryTitle.fontSize = 21;
themeSettings.Toothpaste.resume.entryTitle.color =
  themeBaseSettings.Toothpaste.colors[1];
themeSettings.Toothpaste.resume.entryOrganization.order = 2;
themeSettings.Toothpaste.resume.entryPeriod.order = 3;
themeSettings.Toothpaste.resume.entryPeriod.beforeSeparator = "·";
themeSettings.Toothpaste.resume.entryLocation.order = 4;
themeSettings.Toothpaste.resume.entryLocation.beforeSeparator = "·";
themeSettings.Toothpaste.resume.entryHighlight.isItalic = true;
themeSettings.Toothpaste.resume.entryTag.backgroundColor = "transparent";
themeSettings.Toothpaste.resume.entryTag.border = [1, 1, 1, 1];
themeSettings.Toothpaste.resume.entryTag.borderColor =
  themeBaseSettings.Toothpaste.colors[1];
themeSettings.Toothpaste.resume.entryTag.gap = 8;
themeSettings.Toothpaste.letter.header.layout = 1;
themeSettings.Toothpaste.letter.name.font =
  themeBaseSettings.Toothpaste.displayFont;
themeSettings.Toothpaste.letter.name.fontSize = 36;
themeSettings.Toothpaste.letter.name.isUppercase = true;
themeSettings.Toothpaste.letter.name.color =
  themeBaseSettings.Toothpaste.colors[0];
themeSettings.Toothpaste.letter.title.font =
  themeBaseSettings.Toothpaste.displayFont;
themeSettings.Toothpaste.letter.title.fontSize = 24;
themeSettings.Toothpaste.letter.title.isUppercase = true;
themeSettings.Toothpaste.letter.title.color =
  themeBaseSettings.Toothpaste.colors[1];
themeSettings.Toothpaste.letter.contactDetails.margin[1] = 80;
themeSettings.Toothpaste.letter.contactDetails.margin[3] = 60;
themeSettings.Toothpaste.letter.contactDetails.fontSize = 12;
themeSettings.Toothpaste.letter.about.textAlign = "center";
themeSettings.Toothpaste.letter.about.fontSize = 12;
themeSettings.Toothpaste.letter.senderDetails.fontSize = 12;
themeSettings.Toothpaste.letter.senderDetails.isItalic = true;
themeSettings.Toothpaste.letter.senderDetails.color =
  themeBaseSettings.Toothpaste.colors[0];
themeSettings.Toothpaste.letter.recipientDetails.fontSize = 12;
themeSettings.Toothpaste.letter.recipientDetails.isItalic = true;
themeSettings.Toothpaste.letter.recipientDetails.color =
  themeBaseSettings.Toothpaste.colors[0];
themeSettings.Toothpaste.letter.subject.fontWeight = 600;
themeSettings.Toothpaste.letter.reference.color =
  themeBaseSettings.Toothpaste.colors[0];
themeSettings.Toothpaste.email.name.font =
  themeBaseSettings.Toothpaste.displayFont;
themeSettings.Toothpaste.email.name.fontSize = 36;
themeSettings.Toothpaste.email.name.isUppercase = true;
themeSettings.Toothpaste.email.name.color =
  themeBaseSettings.Toothpaste.colors[0];
themeSettings.Toothpaste.email.title.font =
  themeBaseSettings.Toothpaste.displayFont;
themeSettings.Toothpaste.email.title.fontSize = 24;
themeSettings.Toothpaste.email.title.isUppercase = true;
themeSettings.Toothpaste.email.title.color =
  themeBaseSettings.Toothpaste.colors[1];
themeSettings.Toothpaste.email.contactDetails.margin[0] = 40;
themeSettings.Toothpaste.email.contactDetails.fontSize = 12;

// Wiki
themeSettings.Wiki.resume.document.padding = [24, 30, 24, 30];
themeSettings.Wiki.resume.header.layout = 2;
themeSettings.Wiki.resume.name.textAlign = "center";
themeSettings.Wiki.resume.name.fontSize = 30;
themeSettings.Wiki.resume.name.fontWeight = 700;
themeSettings.Wiki.resume.title.textAlign = "center";
themeSettings.Wiki.resume.title.fontSize = 20;
themeSettings.Wiki.resume.about.textAlign = "center";
themeSettings.Wiki.resume.about.fontSize = 12;
themeSettings.Wiki.resume.contactDetails.alignment = "end";
themeSettings.Wiki.resume.contactDetails.fontSize = 12;
themeSettings.Wiki.resume.aside.margin[1] = 20;
themeSettings.Wiki.resume.category.gap = 20;
themeSettings.Wiki.resume.categoryName.isUppercase = true;
themeSettings.Wiki.resume.categoryName.color = themeBaseSettings.Wiki.colors[0];
themeSettings.Wiki.resume.categoryName.margin[2] = 10;
themeSettings.Wiki.resume.categoryName.border[2] = 1;
themeSettings.Wiki.resume.categoryName.borderColor =
  themeBaseSettings.Wiki.colors[1];
themeSettings.Wiki.resume.entry.layout = 11;
themeSettings.Wiki.resume.entryTitle.fontWeight = 700;
themeSettings.Wiki.resume.entryTitle.fontSize = 11;
themeSettings.Wiki.resume.entryTitle.lineHeight = 1.5;
themeSettings.Wiki.resume.entryPeriod.fontSize = 11;
themeSettings.Wiki.resume.entryPeriod.lineHeight = 1.5;
themeSettings.Wiki.resume.entryOrganization.isItalic = true;
themeSettings.Wiki.resume.entryOrganization.fontSize = 11;
themeSettings.Wiki.resume.entryOrganization.lineHeight = 1.5;
themeSettings.Wiki.resume.entryLocation.isItalic = true;
themeSettings.Wiki.resume.entryLocation.fontSize = 11;
themeSettings.Wiki.resume.entryLocation.lineHeight = 1.5;
themeSettings.Wiki.resume.entrySummary.margin[0] = 4;
themeSettings.Wiki.resume.entrySummary.fontSize = 11;
themeSettings.Wiki.resume.entryHighlight.fontSize = 11;
themeSettings.Wiki.resume.entryTag.color = themeBaseSettings.Wiki.colors[0];
themeSettings.Wiki.resume.entryTag.borderRadius = 0;
themeSettings.Wiki.letter.document.padding = [24, 30, 24, 30];
themeSettings.Wiki.letter.header.layout = 2;
themeSettings.Wiki.letter.name.textAlign = "center";
themeSettings.Wiki.letter.name.fontSize = 30;
themeSettings.Wiki.letter.name.fontWeight = 700;
themeSettings.Wiki.letter.title.textAlign = "center";
themeSettings.Wiki.letter.title.fontSize = 20;
themeSettings.Wiki.letter.about.textAlign = "center";
themeSettings.Wiki.letter.about.fontSize = 12;
themeSettings.Wiki.letter.contactDetails.alignment = "end";
themeSettings.Wiki.letter.contactDetails.fontSize = 12;
themeSettings.Wiki.letter.senderDetails.fontSize = 12;
themeSettings.Wiki.letter.senderDetails.lineHeight = 1.2;
themeSettings.Wiki.letter.recipientDetails.fontSize = 12;
themeSettings.Wiki.letter.recipientDetails.lineHeight = 1.2;
themeSettings.Wiki.letter.subject.textAlign = "left";
themeSettings.Wiki.letter.subject.fontWeight = 700;
themeSettings.Wiki.letter.subject.fontSize = 16;
themeSettings.Wiki.letter.subject.lineHeight = 1.5;
themeSettings.Wiki.letter.reference.textAlign = "left";
themeSettings.Wiki.letter.reference.isUppercase = true;
themeSettings.Wiki.letter.reference.color = themeBaseSettings.Wiki.colors[0];
themeSettings.Wiki.letter.reference.margin[2] = 10;
themeSettings.Wiki.letter.reference.border[2] = 1;
themeSettings.Wiki.letter.reference.borderColor =
  themeBaseSettings.Wiki.colors[1];
themeSettings.Wiki.letter.body.margin[1] = 20;
themeSettings.Wiki.letter.body.margin[3] = 20;
themeSettings.Wiki.letter.body.fontSize = 12;
themeSettings.Wiki.email.document.padding = [24, 30, 24, 30];
themeSettings.Wiki.email.name.fontSize = 30;
themeSettings.Wiki.email.name.fontWeight = 700;
themeSettings.Wiki.email.title.fontSize = 20;
themeSettings.Wiki.email.about.fontSize = 12;
themeSettings.Wiki.email.contactDetails.fontSize = 12;

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
