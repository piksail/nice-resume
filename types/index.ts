export type Template =
  | "default"
  | "Aster"
  | "Care"
  | "CottonCandy"
  | "Cupcake"
  | "Elegant"
  | "Kendall"
  | "Macaron"
  | "Macchiato"
  | "NeoBrutalism"
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
  | "Times New Roman"
  | "Yanone Kaffeesatz";

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type SideSetting = number[];

export type BorderStyle = "dashed" | "dotted" | "solid";

export type TextSeparator = "|" | "-" | "·" | "*" | ">" | "," | " ";

export type HeaderLayout = 0 | 1 | 2 | 3 | 4 | 5;

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

export type ListSettings = {
  listOrientation: "row" | "column";
  listMarker: ListMarker;
  listMarkerColor: string;
};

export type BlockSettings = {
  backgroundColor: string;
  padding: SideSetting;
  border: SideSetting;
  borderStyle: BorderStyle;
  borderColor: string;
  borderRadius: number;
  margin: SideSetting;
  // TODO allow width -> This allow some templates to have the same width even though their text is different
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

export type TitleSettings = TextSettings & {
  textAlign: "left" | "center" | "right";
  // TODO move the width? property here?
};

export type BaseSettings = {
  isLetterPaddingless: boolean;
  colors: string[];
  bodyFont: Font;
  displayFont?: Font;
};

export type TemplateBaseSettings = {
  [T in Template]: BaseSettings;
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
      alignment: "start" | "center" | "end";
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
  aside: BlockSettings & {
    width: number; // Percentage
    isRightPositioned: boolean;
  };
  body: BlockSettings;
  category: BlockSettings & {
    gap: number; // Flex gap between categories
  };
  categoryName: BlockSettings &
    TitleSettings & {
      width?: number | "fit"; // Percentage
      isAside: boolean;
    };
  categoryNameSeparator: BlockSettings & {
    position: "bottom" | "left" | "right" | "top";
    height?: number;
    width?: number | "fit";
  };
  entry: BlockSettings & {
    layout: EntryLayout;
    gap: number; // Flex gap between entries
  };
  entryTitle: TextSettings & {
    order: 1 | 2 | 3 | 4;
    beforeSeparator?: TextSeparator;
  };
  entryPeriod: TextSettings & {
    order: 1 | 2 | 3 | 4;
    beforeSeparator?: TextSeparator;
  };
  entryOrganization: TextSettings & {
    order: 1 | 2 | 3 | 4;
    beforeSeparator?: TextSeparator;
  };
  entryLocation: TextSettings & {
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

export type TemplateSettings = {
  [T in Template]: {
    base: BaseSettings;
    resume: ResumeSettings;
    letter: LetterSettings;
    email: EmailSettings;
  };
};

export type CommonStyleEditorTab = "Document" | "Profile" | "About" | "Contact";

export type ResumeStyleEditorTab =
  | CommonStyleEditorTab
  | "Sections"
  | "Category"
  | "Entry";

export type LetterStyleEditorTab =
  | CommonStyleEditorTab
  | "Header"
  | "Address details"
  | "Subject"
  | "Body";

export type EmailStyleEditorTab = CommonStyleEditorTab | "Signature";

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
  tags: Array<string>;
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
  entries: Array<Experience | Asset>;
  layout: "aside" | "full" | "half";
  isVisible: boolean; // Preserve data but exclude it from the resume
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
