export type LocaleCode = "br" | "de" | "en" | "es" | "fr" | "it";

export type RegionCode = "br" | "de" | "es" | "fr" | "it" | "uk";

export type Theme =
  | "default"
  | "Aster"
  | "Astro"
  | "Care"
  | "CottonCandy"
  | "Cupcake"
  | "Elegant"
  | "Glaze"
  | "Kendall"
  | "Macaron"
  | "Macchiato"
  | "NeoBrutalism"
  | "NiceResume" // TODO renommer avec un nom parmi ceux éventuels OU créer un thème qui portera le futur nom de Nice Resume (nom pas encore trouvé) et les couleurs actuelles (noir, rouge)
  | "OpenResume"
  | "Oilcloth"
  | "Paper"
  | "Pharmacy"
  | "Red"
  | "Shelf"
  | "StackOverflow"
  | "Stone"
  | "Toothpaste"
  | "Wiki";

export type DocumentType = "letter" | "resume" | "email";

export type Font =
  | "inherit"
  | "sans-serif"
  | "serif"
  | "monospace"
  | "Archivo"
  | "Caveat"
  | "Crimson Text"
  | "Fira Sans"
  | "Fira Sans Condensed"
  | "Helvetica"
  | "Josefin Sans"
  | "Kaisei Tokumin"
  | "Karla"
  | "Lato"
  | "League Gothic"
  | "Libre Franklin"
  | "Mulish"
  | "Open Sans"
  | "Open Sans Condensed"
  | "Playwrite AU NSW"
  | "Poppins"
  | "PT Serif"
  | "Roboto"
  | "Roboto Condensed"
  | "Rubik"
  | "Sarabun" // Also used in this webapp
  | "Times New Roman"
  | "Yanone Kaffeesatz";

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type SideSetting = number[];

export type BorderStyle = "dashed" | "dotted" | "solid";

export type TextSeparator = "|" | "-" | "·" | "*" | ">" | "," | " ";

export type HeaderLayout = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type EntryLayout =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13;

export type ListMarker =
  | null
  | "circle"
  | "disc"
  | "hyphen"
  | "square"
  | "triangle";

export type ListMarkerPosition = "inside" | "outside";

export type ListSettings = {
  listOrientation: "row" | "column";
  listMarker: ListMarker;
  listMarkerColor: string;
  listMarkerPosition: ListMarkerPosition;
};

export type SizeableSettings = {
  width: number; // Percent
  widthType: "auto" | "fit-content" | "custom";
};

export type BlockSettings = {
  backgroundColor: string;
  padding: SideSetting;
  border: SideSetting;
  borderStyle: BorderStyle;
  borderColor: string;
  borderRadius: number;
  margin: SideSetting;
};

export type TextSettings = {
  font?: Font;
  fontSize: number;
  lineHeight?: number | "normal";
  letterSpacing: number;
  fontWeight: FontWeight;
  isItalic?: boolean;
  isUppercase?: boolean;
  color: string;
};

export type TitleSettings = SizeableSettings &
  TextSettings & {
    textAlign: "left" | "center" | "right";
    isGradient?: boolean;
    fromColor: string;
    toColor: string;
    gradientAngle: number;
  };

export type BaseSettings = {
  isLetterPaddingless: boolean;
  colors: string[];
  bodyFont: Font;
  displayFont?: Font;
};

export type ThemeBaseSettings = {
  [T in Theme]: BaseSettings;
};

export type DocumentSettings = {
  bodyFont: Font;
  color: string;
  backgroundColor: string;
  border: SideSetting;
  borderStyle: BorderStyle;
  borderColor: string;
  padding: SideSetting;
};

export type CommonDocumentSettings = {
  name: BlockSettings & TitleSettings;
  title: BlockSettings & TitleSettings;
  about: BlockSettings & TitleSettings;
  aboutQuote: Omit<
    TextSettings,
    "letterSpacing" | "lineHeight" | "isUppercase"
  > & {
    isShown: boolean;
  };
  contactDetails: BlockSettings &
    TextSettings &
    ListSettings & {
      alignment: "start" | "center" | "end"; // Handles justify-content on column flex-direction and align-items on  row flex-direction
      iconSize: number;
      iconColor: string;
      iconGap: number;
      isIconFirst: boolean;
      gap: number; // Flex gap between details
    };
};

export type PaperDocumentSettings = CommonDocumentSettings & {
  document: DocumentSettings;
  header: BlockSettings & {
    layout: HeaderLayout;
  };
};

export type ResumeSettings = PaperDocumentSettings & {
  aside: BlockSettings &
    SizeableSettings & {
      isRightPositioned: boolean;
    };
  body: BlockSettings;
  category: BlockSettings & {
    isMasonry: false;
    gap: number; // Flex gap between categories
  };
  categoryName: BlockSettings &
    TitleSettings & {
      isAside: boolean;
    };
  categoryNameSeparator: BlockSettings &
    SizeableSettings & {
      position: "bottom" | "left" | "right" | "top";
      height?: number;
    };
  entry: BlockSettings & {
    layout: EntryLayout;
    gap: number; // Flex gap between entries
  };
  entryTitle: BlockSettings &
    TextSettings & {
      order: 1 | 2 | 3 | 4;
      beforeSeparator?: TextSeparator;
    };
  entryPeriod: BlockSettings &
    TextSettings & {
      order: 1 | 2 | 3 | 4;
      beforeSeparator?: TextSeparator;
    };
  entryOrganization: BlockSettings &
    TextSettings & {
      order: 1 | 2 | 3 | 4;
      beforeSeparator?: TextSeparator;
    };
  entryLocation: BlockSettings &
    TextSettings & {
      order: 1 | 2 | 3 | 4;
      beforeSeparator?: TextSeparator;
    };
  entrySummary: BlockSettings & TextSettings;
  entryHighlight: BlockSettings &
    TextSettings &
    ListSettings & {
      gap: number; // Flex gap between highlights
    };
  entryTag: BlockSettings &
    TextSettings & {
      gap: number; // Flex gap between tags
    };
};

export type LetterSettings = PaperDocumentSettings & {
  senderDetails: BlockSettings & TitleSettings & { gap: number };
  recipientDetails: BlockSettings & TitleSettings & { gap: number };
  subject: BlockSettings & TitleSettings;
  reference: BlockSettings & TitleSettings & { isBeforeSubject: boolean };
  body: {
    fontSize: number;
    lineHeight?: number | "normal"; // Unitless
    fontWeight: FontWeight;
    color: string;
    indentation: number;
    isJustified: boolean;
    margin: SideSetting;
    gap: number;
    isSignatureRightAligned: boolean;
  };
};

export type EmailSettings = CommonDocumentSettings & {
  document: DocumentSettings & { layout: HeaderLayout };
};

export type ThemeSettings = {
  [T in Theme]: {
    base: BaseSettings;
    resume: ResumeSettings;
    letter: LetterSettings;
    email: EmailSettings;
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
  highlights: string[];
  tags: string[];
  isVisible: boolean; // Preserve data but exclude it from the resume
}

export interface Experience extends Entry {
  nature: "experience";
  type:
    | "award"
    | "certificate"
    | "education"
    | "project"
    | "publication"
    | "voluntary"
    | "work";
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
  entries: (Experience | Asset)[];
  layout: "aside" | "full" | "half";
  isLocked: boolean; // Disable data edition
  isVisible: boolean; // Preserve data but exclude it from the resume
}

export interface Profile {
  theme: Theme;
  name: string;
  title: string;
  contactDetails: ContactDetail[];
}

export interface Resume extends Profile {
  about: string;
  categories: Category[];
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

export interface JsonResume {
  basics: {
    name: string;
    label: string; // = title
    image?: string; // Not supported
    email?: string; // = contact detail
    phone?: string; // = contact detail
    url?: string; // = contact detail
    summary?: string; // = about
    location: {
      address: string;
      postalCode: string;
      city: string;
      countryCode: string;
      region: string;
    };
    profiles: {
      network: string;
      username: string;
      url: string;
    }[];
  };
  work: {
    name: string;
    position: string;
    url: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
  }[];
  volunteer: {
    organization: string;
    position: string;
    url: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
  }[];
  education: {
    institution: string;
    url: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    score: string | number;
    courses: string[];
  }[];
  awards: {
    title: string;
    date: string;
    awarder: string;
    summary: string;
  }[];
  certificates: {
    name: string;
    date: string;
    issuer: string;
    url: string;
  }[];
  publications: {
    name: string;
    publisher: string;
    releaseDate: string;
    url: string;
    summary: string;
  }[];
  skills: {
    name: string;
    level: string;
    keywords: string[];
  }[];
  languages: {
    language: string;
    fluency: string; // = highlight
  }[];
  interests: {
    name: string;
    keywords: string[]; // = tag
  }[];
  references: // Not supported
  {
    name: string;
    reference: string;
  }[];
  projects: {
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    highlights: string[];
    url: string;
  }[];
}
