import type {
  Asset,
  BaseSettings,
  Category,
  ContactDetail,
  DocumentType,
  Experience,
  LetterSettings,
  ListMarker,
  ResumeSettings,
  Template,
  TemplateBaseSettings,
  TemplateSettings,
} from "@/types";

export const documentTypes: Array<DocumentType> = ["resume", "letter"];

export const fonts: string[] = [
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
  "Roboto",
  "Roboto Condensed",
  "Yanone Kaffeesatz",
];

export const templates: Array<Template> = [
  "Aster",
  "CottonCandy",
  "Cupcake",
  "Macaron",
  "Macchiato",
  "Oilcloth",
  "OpenResume",
  "Paper",
  "Pharmacy",
  "Red",
  "Stone",
  "Toothpaste",
  "Wiki",
];

export const fixedLayoutTemplates: Array<Template> = ["Cupcake", "Paper"];

export const discouragedLayoutTemplates: {
  [T in Template]: Array<Category["layout"]>;
} = {
  Aster: ["aside", "half"],
  CottonCandy: ["aside"],
  Cupcake: [],
  Macaron: [],
  Macchiato: [],
  Oilcloth: [],
  OpenResume: [],
  Paper: [],
  Pharmacy: [],
  Red: ["full"],
  Stone: [],
  Toothpaste: ["aside"],
  Wiki: [],
};

// export const fontWeights: {
//   "Open Sans": [200, 300, 500, 600, 900];
// }; // TODO one entry per font-family

// TODO tous les :style={} pourraient être le résultat d'un getter qui renvoie u objet en fonction d'un type genre "getBlockStyle, getTextStyle, getTitleStyle" pour éviter de tout c/c
// TODO settings réduire espace entrelistmarker et text
// TODO autoriser le Block settings pour le entry carrément (iso letter header)
// TODO fournir le uppercase pour ceux qui n'en ont pas (recherche globale sur isItalic pour trouver)
export const listMarkers: ListMarker[] = ["circle", "disc", "hyphen", "square"];

export const resumeSettings: ResumeSettings = {
  document: {
    bodyFont: "serif",
    color: "#000000",
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderColor: "#000000",
    margin: [40, 40, 40, 40], // TODO [80, 80, 80, 80]; feel VERY nice
    border: [0, 0, 0, 0],
  },
  header: {
    layout: 0,
    backgroundColor: "#ffffff",
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
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
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
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
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
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
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
  contactDetails: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
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
  aside: {
    width: 20, // Percentage
    gap: 16,
  },
  body: {
    margin: [0, 0, 0, 0],
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
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
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
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    // TODO allow bg color, padding, radius, etc. to make it like a badge?
  },
  entryPeriod: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    // TODO allow bg color, padding, radius, etc. to make it like a badge?
  },
  entryOrganization: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    // TODO allow bg color, padding, radius, etc. to make it like a badge?
  },
  entryLocation: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    isItalic: false,
    isUppercase: false,
    color: "currentColor",
    // TODO allow bg color, padding, radius, etc. to make it like a badge?
  },
  entrySummary: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
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
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
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
};

// TODO for ANY element that is text, have below properties+letterSPacing
export const letterSettings: LetterSettings = {
  document: {
    bodyFont: "serif",
    color: "#000000",
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderColor: "#000000",
    margin: [40, 40, 40, 40],
    border: [0, 0, 0, 0],
  },
  senderDetails: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    isItalic: false,
    color: "currentColor",
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0], // If sender details is used, it is the first element on the document (no need for margins)
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    gap: 12,
  },
  recipientDetails: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    isItalic: false,
    color: "currentColor",
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [40, 0, 40, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    gap: 12,
  },
  // TODO rename below property as subjectWrapper ? Or "chapeau"?
  header: {
    isCentered: true,
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 40, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  subject: {
    font: "inherit",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    isItalic: false,
    isUppercase: false,
    isCentered: true,
    color: "currentColor",
    backgroundColor: "#ffffff",
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
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    isItalic: false,
    isCentered: true,
    color: "currentColor",
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  body: {
    fontSize: 14,
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    color: "currentColor",
    indentation: 48,
    isJustified: true,
    margin: [0, 0, 0, 0],
    gap: 12,
    isSignatureRightAligned: true,
  },
};

export const templateBaseSettings: TemplateBaseSettings = {
  Aster: {
    isLetterMarginless: true,
    colors: ["#713c97", "#f6881f", "#ffffff", "#000000"],
    bodyFont: "Fira Sans",
  },
  CottonCandy: {
    isLetterMarginless: true,
    colors: ["#ed3660", "#5662e8", "#e8afcf", "#ffffff", "#1e1e1e"],
    bodyFont: "Mulish",
    displayFont: "League Gothic",
  },
  Cupcake: {
    isLetterMarginless: true,
    colors: ["#f2b150", "#e593aa", "#a9d7e2", "#231f20"],
    bodyFont: "Open Sans Condensed",
    displayFont: "Yanone Kaffeesatz",
  },
  Macaron: {
    isLetterMarginless: true,
    colors: ["#d88277", "#f8aaa6", "#f8d5cd", "#f8f4f2", "#ffffff", "#414e66"],
    bodyFont: "Karla",
    displayFont: "Caveat",
  },
  Macchiato: {
    isLetterMarginless: true,
    colors: ["#56817a", "#f8f8ff", "#39424b"],
    bodyFont: "Lato",
    displayFont: "Josefin Sans",
  },
  Oilcloth: {
    isLetterMarginless: true,
    colors: ["#0f9ef8", "#ff9b08", "#43a385", "#ffffff", "#231f20"],
    bodyFont: "Open Sans",
    displayFont: "Yanone Kaffeesatz",
  },
  OpenResume: {
    isLetterMarginless: true,
    colors: ["#38bdf8", "#000000"],
    bodyFont: "Roboto",
  },
  Paper: {
    isLetterMarginless: false,
    colors: ["#cfcfcf", "#000000"],
    bodyFont: "Times New Roman",
  },
  Pharmacy: {
    isLetterMarginless: false,
    colors: ["#06b6d4", "#475569", "#94a3b8", "#0f172a"],
    bodyFont: "Libre Franklin",
  },
  Red: {
    isLetterMarginless: true,
    colors: ["#ab3134", "#231f20"],
    bodyFont: "Mulish",
    displayFont: "League Gothic",
  },
  Stone: {
    isLetterMarginless: false,
    colors: ["#000000", "#a1a1aa", "#e4e4e7", "#52525b"],
    bodyFont: "sans-serif",
    displayFont: "Kaisei Tokumin",
  },
  Toothpaste: {
    isLetterMarginless: true,
    colors: ["#ed3660", "#5662e8", "#e8afcf", "#1e1e1e"],
    bodyFont: "Mulish",
    displayFont: "League Gothic",
  },
  Wiki: {
    isLetterMarginless: false,
    colors: ["#1e3a8a", "#000000"],
    bodyFont: "Fira Sans",
  },
};

export const templateSettings: TemplateSettings = {
  Aster: {
    base: templateBaseSettings.Aster,
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
  isLetterMarginless: boolean,
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

  if (isLetterMarginless) {
    settings.letter.senderDetails.margin[1] = 64;
    settings.letter.senderDetails.margin[3] = 64;
    settings.letter.recipientDetails.margin[1] = 64;
    settings.letter.recipientDetails.margin[3] = 64;
    settings.letter.header.margin[1] = 64;
    settings.letter.header.margin[3] = 64;
    settings.letter.body.margin[1] = 64;
    settings.letter.body.margin[3] = 64;
  }
  templateSettings[template] = settings;
}

// TODO reprendre ici :
// Remplacer chaque --var ou classe tailwind par son style défini below
// pour rappel, les templatezs sont en fait dsormais à la fois des presets (colors = blabla)
// réfléchir au concept de layout de section, où on peut dire par ex que les company et title sont sur la même ligne ou pas
Object.entries(templateBaseSettings).forEach(([key, value]) => {
  scaffoldTemplateSettings(key as Template, value, value.isLetterMarginless);
});

if (templateSettings.Aster.resume && templateSettings.Aster.letter) {
  templateSettings.Aster.resume.document.margin = [0, 0, 0, 0];
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
  templateSettings.Aster.resume.entryTitle.fontWeight = 500;
  templateSettings.Aster.resume.entryOrganization.isItalic = true;
  templateSettings.Aster.resume.entrySummary.padding[3] = 16;
  templateSettings.Aster.resume.entryHighlight.padding[3] = 16;
  templateSettings.Aster.letter.document.margin = [0, 0, 0, 0];
  templateSettings.Aster.letter.senderDetails.fontWeight = 300;
  templateSettings.Aster.letter.recipientDetails.fontWeight = 300;
  templateSettings.Aster.letter.header.isCentered;
  templateSettings.Aster.letter.subject.fontSize = 18;
  templateSettings.Aster.letter.subject.fontWeight = 300;
  templateSettings.Aster.letter.reference.fontSize = 15;
  templateSettings.Aster.letter.reference.fontWeight = 300;
  templateSettings.Aster.letter.reference.color =
    templateBaseSettings.Aster.colors[0];
  templateSettings.Aster.letter.body.fontWeight = 300;
  templateSettings.Aster.letter.body.lineHeight = 1.6;
}

if (
  templateSettings.CottonCandy.resume &&
  templateSettings.CottonCandy.letter
) {
  templateSettings.CottonCandy.resume.document.margin = [0, 0, 0, 0];
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
  templateSettings.CottonCandy.resume.category.padding = [24, 40, 24, 40];
  templateSettings.CottonCandy.resume.category.backgroundColor =
    templateBaseSettings.CottonCandy.colors[0];
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
  templateSettings.CottonCandy.resume.entryPeriod.color =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entryOrganization.color =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entryLocation.color =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entrySummary.color =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entryHighlight.color =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entryHighlight.listMarkerColor =
    templateBaseSettings.CottonCandy.colors[3];
  templateSettings.CottonCandy.resume.entryHighlight.isItalic = true;
  templateSettings.CottonCandy.letter.document.margin = [0, 0, 0, 0];
  templateSettings.CottonCandy.letter.senderDetails.color =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.letter.senderDetails.margin[0] = 0;
  templateSettings.CottonCandy.letter.senderDetails.margin[1] = 40;
  templateSettings.CottonCandy.letter.senderDetails.margin[3] = 40;
  templateSettings.CottonCandy.letter.senderDetails.isItalic = true;
  templateSettings.CottonCandy.letter.recipientDetails.color =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.letter.recipientDetails.margin[0] = 0;
  templateSettings.CottonCandy.letter.recipientDetails.margin[1] = 40;
  templateSettings.CottonCandy.letter.recipientDetails.margin[3] = 40;
  templateSettings.CottonCandy.letter.recipientDetails.isItalic = true;
  templateSettings.CottonCandy.letter.header.margin[1] = 40;
  templateSettings.CottonCandy.letter.header.margin[3] = 40;
  templateSettings.CottonCandy.letter.subject.fontWeight = 700;
  templateSettings.CottonCandy.letter.reference.fontSize = 11;
  templateSettings.CottonCandy.letter.body.margin[1] = 40;
  templateSettings.CottonCandy.letter.body.margin[3] = 40;
}

if (templateSettings.Cupcake.resume && templateSettings.Cupcake.letter) {
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
  templateSettings.Cupcake.resume.entryPeriod.color =
    templateBaseSettings.Cupcake.colors[1];
  templateSettings.Cupcake.resume.entryTitle.isItalic = true;
  templateSettings.Cupcake.resume.entryHighlight.listMarker = "disc";
  templateSettings.Cupcake.resume.entryHighlight.listMarkerColor =
    templateBaseSettings.Cupcake.colors[0];
  templateSettings.Cupcake.resume.entryHighlight.color =
    templateBaseSettings.Cupcake.colors[3];
  templateSettings.Cupcake.letter.document.margin = [32, 32, 32, 32];
  templateSettings.Cupcake.letter.senderDetails.fontSize = 16;
  templateSettings.Cupcake.letter.senderDetails.lineHeight = 1;
  templateSettings.Cupcake.letter.recipientDetails.fontSize = 16;
  templateSettings.Cupcake.letter.recipientDetails.lineHeight = 1;
  templateSettings.Cupcake.letter.subject.fontWeight = 600;
  templateSettings.Cupcake.letter.subject.fontSize = 20;
  templateSettings.Cupcake.letter.reference.fontSize = 15;
  templateSettings.Cupcake.letter.body.fontSize = 16;
}

if (templateSettings.Macaron.resume && templateSettings.Macaron.letter) {
  templateSettings.Macaron.resume.document.margin = [0, 0, 0, 0];
  templateSettings.Macaron.resume.aside.width = 25;
  templateSettings.Macaron.resume.header.layout = 2;
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
  templateSettings.Macaron.resume.body.margin = [40, 40, 40, 40];
  templateSettings.Macaron.resume.category.gap = 30;
  templateSettings.Macaron.resume.categoryName.color =
    templateBaseSettings.Macaron.colors[0];
  templateSettings.Macaron.resume.categoryName.fontSize = 24;
  templateSettings.Macaron.resume.categoryName.fontWeight = 600;
  templateSettings.Macaron.resume.entry.layout = 4;
  templateSettings.Macaron.resume.entryTitle.fontWeight = 700;
  templateSettings.Macaron.resume.entryPeriod.color =
    templateBaseSettings.Macaron.colors[0];
  templateSettings.Macaron.resume.entryPeriod.fontWeight = 700;
  templateSettings.Macaron.resume.entryOrganization.fontWeight = 300;
  templateSettings.Macaron.resume.entryLocation.fontWeight = 300;
  templateSettings.Macaron.resume.entrySummary.fontWeight = 300;
  templateSettings.Macaron.resume.entryHighlight.isItalic = true;
  templateSettings.Macaron.resume.entryHighlight.listMarker = "disc";
  templateSettings.Macaron.letter.document.margin = [0, 0, 0, 0];
  templateSettings.Macaron.letter.senderDetails.margin[1] = 40;
  templateSettings.Macaron.letter.recipientDetails.margin[1] = 40;
  templateSettings.Macaron.letter.subject.fontWeight = 600;
  templateSettings.Macaron.letter.subject.fontSize = 19;
  templateSettings.Macaron.letter.reference.color =
    templateBaseSettings.Macaron.colors[0];
  templateSettings.Macaron.letter.reference.fontSize = 16;
}

if (templateSettings.Macchiato.resume && templateSettings.Macchiato.letter) {
  templateSettings.Macchiato.resume.document.margin = [0, 0, 0, 0];
  templateSettings.Macchiato.resume.document.border = [10, 0, 0, 0];
  templateSettings.Macchiato.resume.document.borderColor =
    templateBaseSettings.Macchiato.colors[0];
  templateSettings.Macchiato.resume.header.layout = 2;
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
  templateSettings.Macchiato.resume.entryPeriod.fontWeight = 300;
  templateSettings.Macchiato.resume.entryPeriod.isItalic = true;
  templateSettings.Macchiato.resume.entryTitle.fontWeight = 300;
  templateSettings.Macchiato.resume.entryOrganization.fontSize = 12;
  templateSettings.Macchiato.resume.entryLocation.fontSize = 12;
  templateSettings.Macchiato.resume.entrySummary.fontSize = 12;
  templateSettings.Macchiato.resume.entryHighlight.fontSize = 12;
  templateSettings.Macchiato.resume.entryHighlight.listMarker = "disc";
  templateSettings.Macchiato.letter.document.margin = [0, 0, 0, 0];
  templateSettings.Macchiato.letter.document.border = [10, 0, 0, 0];
  templateSettings.Macchiato.letter.document.borderColor =
    templateBaseSettings.Macchiato.colors[0];
  templateSettings.Macchiato.letter.senderDetails.margin = [0, 48, 48, 48];
  templateSettings.Macchiato.letter.senderDetails.fontSize = 12;
  templateSettings.Macchiato.letter.recipientDetails.margin = [0, 48, 48, 48];
  templateSettings.Macchiato.letter.recipientDetails.fontSize = 12;
  templateSettings.Macchiato.letter.header.margin[1] = 48;
  templateSettings.Macchiato.letter.header.margin[3] = 48;
  templateSettings.Macchiato.letter.subject.font =
    templateBaseSettings.Macchiato.displayFont;
  templateSettings.Macchiato.letter.subject.fontSize = 17;
  templateSettings.Macchiato.letter.reference.color =
    templateBaseSettings.Macchiato.colors[0];
  templateSettings.Macchiato.letter.body.margin = [0, 48, 48, 48];
}

if (templateSettings.Oilcloth.resume && templateSettings.Oilcloth.letter) {
  templateSettings.Oilcloth.resume.document.margin = [0, 0, 0, 0];
  templateSettings.Oilcloth.resume.document.border = [15, 0, 20, 0];
  templateSettings.Oilcloth.resume.document.borderColor =
    templateBaseSettings.Oilcloth.colors[1];
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
  templateSettings.Oilcloth.resume.body.margin = [40, 40, 40, 40];
  templateSettings.Oilcloth.resume.category.gap = 40;
  templateSettings.Oilcloth.resume.categoryName.isUppercase = true;
  templateSettings.Oilcloth.resume.categoryName.textAlign = "center";
  templateSettings.Oilcloth.resume.categoryName.fontSize = 25;
  templateSettings.Oilcloth.resume.categoryName.letterSpacing = 2;
  templateSettings.Oilcloth.resume.categoryName.fontWeight = 300;
  templateSettings.Oilcloth.resume.categoryName.margin[2] = 5;
  templateSettings.Oilcloth.resume.entry.layout = 6;
  templateSettings.Oilcloth.resume.entryPeriod.color =
    templateBaseSettings.Oilcloth.colors[1];
  templateSettings.Oilcloth.resume.entryPeriod.fontSize = 16;
  templateSettings.Oilcloth.resume.entryPeriod.fontWeight = 700;
  templateSettings.Oilcloth.resume.entryTitle.fontSize = 16;
  templateSettings.Oilcloth.resume.entryTitle.fontWeight = 900;
  templateSettings.Oilcloth.resume.entryOrganization.fontWeight = 300;
  templateSettings.Oilcloth.resume.entryOrganization.lineHeight = 1;
  templateSettings.Oilcloth.resume.entryLocation.fontWeight = 300;
  templateSettings.Oilcloth.resume.entryLocation.lineHeight = 1;
  templateSettings.Oilcloth.resume.entrySummary.color =
    templateBaseSettings.Oilcloth.colors[0];
  templateSettings.Oilcloth.resume.entrySummary.margin = [10, 0, 10, 0];
  templateSettings.Oilcloth.resume.entrySummary.lineHeight = 1;
  templateSettings.Oilcloth.resume.entryHighlight.fontWeight = 300;
  templateSettings.Oilcloth.resume.entryHighlight.lineHeight = 1;
  templateSettings.Oilcloth.letter.document.margin = [0, 0, 0, 0];
  templateSettings.Oilcloth.letter.senderDetails.color =
    templateBaseSettings.Oilcloth.colors[0];
  templateSettings.Oilcloth.letter.recipientDetails.color =
    templateBaseSettings.Oilcloth.colors[0];
}

if (templateSettings.OpenResume.resume && templateSettings.OpenResume.letter) {
  templateSettings.OpenResume.resume.document.margin = [0, 0, 0, 0];
  templateSettings.OpenResume.resume.document.border = [8, 0, 0, 0];
  templateSettings.OpenResume.resume.document.borderColor =
    templateBaseSettings.OpenResume.colors[0];
  templateSettings.OpenResume.resume.header.layout = 2;
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
  templateSettings.OpenResume.resume.entrySummary.isItalic = true;
  templateSettings.OpenResume.resume.entryHighlight.listMarker = "disc";
  templateSettings.OpenResume.resume.entryHighlight.fontSize = 12;
  templateSettings.OpenResume.letter.document.margin = [0, 0, 0, 0];
  templateSettings.OpenResume.letter.document.border = [8, 0, 0, 0];
  templateSettings.OpenResume.letter.document.borderColor =
    templateBaseSettings.OpenResume.colors[0];
  templateSettings.OpenResume.letter.senderDetails.isItalic = true;
  templateSettings.OpenResume.letter.senderDetails.margin[0] = 24;
  templateSettings.OpenResume.letter.senderDetails.margin[1] = 48;
  templateSettings.OpenResume.letter.recipientDetails.isItalic = true;
  templateSettings.OpenResume.letter.recipientDetails.margin[0] = 24;
  templateSettings.OpenResume.letter.recipientDetails.margin[1] = 48;
  templateSettings.OpenResume.letter.header.isCentered = false;
  templateSettings.OpenResume.letter.header.margin[3] = 48 * 2;
  templateSettings.OpenResume.letter.subject.fontWeight = 800;
  templateSettings.OpenResume.letter.subject.isCentered = false;
  templateSettings.OpenResume.letter.reference.fontWeight = 800;
  templateSettings.OpenResume.letter.reference.isCentered = false;
  templateSettings.OpenResume.letter.reference.color =
    templateBaseSettings.OpenResume.colors[0];
  templateSettings.OpenResume.letter.body.margin = [0, 48, 0, 48];
}

if (templateSettings.Paper.resume && templateSettings.Paper.letter) {
  templateSettings.Paper.resume.document.margin = [80, 80, 80, 80];
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
  templateSettings.Paper.resume.entryOrganization.fontSize = 13;
  templateSettings.Paper.resume.entryLocation.fontSize = 13;
  templateSettings.Paper.resume.entryPeriod.fontSize = 13;
  templateSettings.Paper.resume.entrySummary.fontSize = 13;
  templateSettings.Paper.resume.entryHighlight.fontSize = 13;
  templateSettings.Paper.resume.entryHighlight.listMarker = "circle";
  templateSettings.Paper.letter.document.margin = [80, 80, 80, 80];
  templateSettings.Paper.letter.header.isCentered = false;
  templateSettings.Paper.letter.subject.isCentered = false;
  templateSettings.Paper.letter.reference.isItalic = true;
  templateSettings.Paper.letter.reference.isCentered = false;
  templateSettings.Paper.letter.body.indentation = 0;
  templateSettings.Paper.letter.body.isSignatureRightAligned = false;
}

if (templateSettings.Pharmacy.resume && templateSettings.Pharmacy.letter) {
  templateSettings.Pharmacy.resume.document.margin = [48, 48, 48, 48];
  templateSettings.Pharmacy.letter.document.margin = [48, 48, 48, 48];
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
  templateSettings.Red.resume.document.margin = [48, 56, 48, 56];
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
  templateSettings.Red.resume.body.margin[0] = 22;
  templateSettings.Red.resume.categoryName.isUppercase = true;
  templateSettings.Red.resume.categoryName.font =
    templateBaseSettings.Red.displayFont;
  templateSettings.Red.resume.categoryName.fontSize = 28;
  templateSettings.Red.resume.categoryName.textAlign = "center";
  templateSettings.Red.resume.entry.layout = 8;
  templateSettings.Red.resume.entryOrganization.color =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.resume.entrySummary.fontSize = 12;
  templateSettings.Red.resume.entryHighlight.fontSize = 12;
  templateSettings.Red.resume.entryHighlight.isItalic = true;
  templateSettings.Red.resume.entryHighlight.margin[3] = 20;
  templateSettings.Red.resume.entryHighlight.listMarker = "square";
  templateSettings.Red.resume.entryHighlight.listMarkerColor =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.resume.entryHighlight.color =
    templateBaseSettings.Red.colors[1];
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

if (templateSettings.Stone.resume && templateSettings.Stone.letter) {
  templateSettings.Stone.resume.aside.width = 25;
  templateSettings.Stone.letter.document.margin = [48, 48, 48, 48];
  templateSettings.Stone.letter.senderDetails.color =
    templateBaseSettings.Stone.colors[1];
  templateSettings.Stone.letter.recipientDetails.color =
    templateBaseSettings.Stone.colors[1];
  templateSettings.Stone.letter.recipientDetails.borderColor =
    templateBaseSettings.Stone.colors[2];
  templateSettings.Stone.letter.recipientDetails.border = [1, 1, 1, 1];
  templateSettings.Stone.letter.recipientDetails.padding = [6, 10, 6, 10];
  templateSettings.Stone.letter.header.isCentered = false;
  templateSettings.Stone.letter.subject.isCentered = false;
  templateSettings.Stone.letter.subject.isUppercase = true;
  templateSettings.Stone.letter.subject.fontSize = 20;
  templateSettings.Stone.letter.subject.fontWeight = 600;
  templateSettings.Stone.letter.subject.font =
    templateBaseSettings.Stone.displayFont;
  templateSettings.Stone.letter.reference.margin[0] = 10;
  templateSettings.Stone.letter.reference.isCentered = false;
  templateSettings.Stone.letter.reference.color =
    templateBaseSettings.Stone.colors[1];
  templateSettings.Stone.letter.body.indentation = 0;
  templateSettings.Stone.letter.body.isSignatureRightAligned = false;
}

if (templateSettings.Toothpaste.resume && templateSettings.Toothpaste.letter) {
  templateSettings.Toothpaste.resume.document.margin = [0, 0, 0, 0];
  templateSettings.Toothpaste.resume.header.layout = 1;
  templateSettings.Toothpaste.resume.name.font =
    templateBaseSettings.Toothpaste.displayFont;
  templateSettings.Toothpaste.resume.name.fontSize = 36;
  templateSettings.Toothpaste.resume.name.isUppercase = true;
  templateSettings.Toothpaste.resume.title.font =
    templateBaseSettings.Toothpaste.displayFont;
  templateSettings.Toothpaste.resume.title.fontSize = 24;
  templateSettings.Toothpaste.resume.title.isUppercase = true;
  templateSettings.Toothpaste.resume.category.padding = [24, 40, 24, 40];
  templateSettings.Toothpaste.resume.category.border[0] = 4;
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
    templateBaseSettings.Toothpaste.colors[0];
  templateSettings.Toothpaste.resume.entryHighlight.isItalic = true;
  templateSettings.Toothpaste.letter.document.margin = [0, 0, 0, 0];
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
  templateSettings.Wiki.resume.document.margin = [24, 20, 24, 20];
  templateSettings.Wiki.letter.document.margin = [24, 20, 24, 20];
  templateSettings.Wiki.letter.senderDetails.fontSize = 12;
  templateSettings.Wiki.letter.senderDetails.lineHeight = 1.2;
  templateSettings.Wiki.letter.recipientDetails.fontSize = 12;
  templateSettings.Wiki.letter.recipientDetails.lineHeight = 1.2;
  templateSettings.Wiki.letter.header.margin[1] = 20;
  templateSettings.Wiki.letter.header.margin[3] = 20;
  templateSettings.Wiki.letter.subject.isItalic = true;
  templateSettings.Wiki.letter.subject.fontSize = 16;
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
  "certificate",
  "education",
  "project",
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
  "certificate",
  "education",
  "project",
  "voluntary",
  "work",
];
