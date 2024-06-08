export type Template =
  | "Aster"
  | "CottonCandy"
  | "Cupcake"
  | "Macaron"
  | "Macchiato"
  | "OpenResume"
  | "Oilcloth"
  | "Paper"
  | "Pharmacy"
  | "Red"
  | "Stone"
  | "Toothpaste"
  | "Wiki";

export type DocumentType = "letter" | "resume";

export type SideSetting = number[];

export type ListMarker = null | "circle" | "disc" | "hyphen" | "square";

export type ListSettings = {
  listOrientation: "row" | "column";
  listMarker: ListMarker;
  listMarkerColor: string;
};

export type BlockSettings = {
  backgroundColor: string;
  padding: SideSetting;
  border: SideSetting;
  borderStyle: "dashed" | "dotted" | "solid";
  borderColor: string;
  borderRadius: number;
  margin: SideSetting;
  // TODO allow width -> This allow some templates to have the same width even though their text is different
};

export type TextSettings = {
  font?: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  fontWeight: number; // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
  isItalic?: boolean;
  isUppercase?: boolean;
  color: string;
};

export type TitleSettings = TextSettings & {
  textAlign: "left" | "center" | "right";
  // TODO move the width? property here? rework letter header (subject+ref)
};

// TODO get rid of below type which is too fourre-tout
export type Settings = {
  isCentered?: boolean;
  gap?: number;
};

export type BaseSettings = {
  isLetterMarginless: boolean;
  colors: string[];
  bodyFont: string;
  displayFont?: string;
};

export type TemplateBaseSettings = {
  [T in Template]: BaseSettings;
};

export type DocumentSettings = {
  bodyFont: string;
  color: string;
  backgroundColor: string;
  margin: SideSetting;
  border: SideSetting;
  borderStyle: "dashed" | "dotted" | "solid";
  borderColor: string;
};

// export type HeaderSettings = BlockSettings & {
//   justification:
//     | "left"
//     | "center"
//     | "space-around"
//     | "space-between"
//     | "space-between"
//     | "right";
//   alignment: "start" | "center" | "baseline" | "end";
// };

export type ResumeSettings = {
  document: DocumentSettings;
  header: BlockSettings & {
    layout: 0 | 1 | 2 | 3; // TODO other properties
  };
  name: BlockSettings & TitleSettings;
  title: BlockSettings & TitleSettings;
  about: BlockSettings & TitleSettings;
  contactDetails: BlockSettings &
    TextSettings &
    ListSettings & {
      alignment: "start" | "center" | "end";
      iconColor: string;
      iconGap: number;
      isIconFirst: boolean;
      gap: number; // Flex gap between details
    };
  // TODO provide Pick<BlockSettings, "margin">; to aside as well
  aside: {
    width: number;
    gap: number; // Flex gap between aside and main columns
  };
  body: Pick<BlockSettings, "margin">;
  category: BlockSettings & {
    gap: number; // Flex gap between categories
  };
  categoryName: BlockSettings &
    TitleSettings & {
      width?: number | "fit";
      isAside: boolean;
    };
  categoryNameSeparator: BlockSettings & {
    position: "bottom" | "left" | "right" | "top";
    height?: number;
    width?: number | "fit";
  };
  entry: BlockSettings & {
    layout: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
    gap: number; // Flex gap between entries
  };
  entryTitle: TextSettings;
  entryPeriod: TextSettings;
  entryOrganization: TextSettings;
  entryLocation: TextSettings;
  entrySummary: BlockSettings & TextSettings;
  entryHighlight: BlockSettings &
    TextSettings &
    ListSettings & {
      gap: number; // Flex gap between highlights
    };
};

export type LetterSettings = {
  document: DocumentSettings;
  senderDetails: Settings & BlockSettings & TextSettings;
  recipientDetails: Settings & BlockSettings & TextSettings;
  header: {
    isCentered: boolean;
    backgroundColor: string;
    borderStyle: "dashed" | "dotted" | "solid";
    borderColor: string;
    borderRadius: number;
    margin: SideSetting;
    border: SideSetting;
    padding: SideSetting;
  };
  subject: Settings & BlockSettings & TextSettings;
  reference: Settings & BlockSettings & TextSettings;
  body: {
    fontSize: number;
    lineHeight: number;
    fontWeight: number; // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    color: string;
    indentation: number;
    isJustified: boolean;
    margin: SideSetting;
    gap: number;
    isSignatureRightAligned: boolean;
  };
};

export type TemplateSettings = {
  [T in Template]: {
    base: BaseSettings;
    resume: ResumeSettings;
    letter: LetterSettings;
  };
};

export type DetailIcon =
  | null
  | "default"
  | "address"
  | "drivingLicense"
  | "email"
  | "phone";

export type SocialIcon =
  | null
  | "default"
  | "bandcamp"
  | "behance"
  | "facebook"
  | "gitHub"
  | "instagram"
  | "linkedIn"
  | "mastodon"
  | "soundCloud"
  | "stackOverflow"
  | "viadeo"
  | "x";

export interface ContactDetail {
  type: "personal" | "social";
  icon: DetailIcon | SocialIcon;
  value: string;
}

export interface Entry {
  nature: "asset" | "experience";
  type: string;
  title: string; // Position, Diploma, ...
  highlights: Array<string>;
}

export interface Experience extends Entry {
  nature: "experience";
  type: "certificate" | "education" | "project" | "voluntary" | "work";
  organization: string; // Institution, Company, ...
  location: string;
  period: string; // No strict format to allow custom values
  summary: string;
}

export interface Asset extends Entry {
  nature: "asset";
  type: "interest" | "language" | "skill";
}
export interface Category {
  nature: Entry["nature"];
  type: Asset["type"] | Experience["type"];
  name: string;
  entries: Array<Experience | Asset>;
  layout: "aside" | "full" | "half";
}

export interface Profile {
  isNiceResumeExport: boolean;
  template: Template;
  name: string;
  title: string;
  contactDetails: Array<ContactDetail>;
}

export interface Resume extends Profile {
  about: string;
  categories: Array<Category>;
}

export interface Letter extends Profile {
  recipientDetails: string[];
  subject: string;
  reference: string;
  paragraphs: string[];
}

export interface Export extends Resume, Letter {
  isNiceResumeExport: boolean;
}
