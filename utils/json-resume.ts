import type { Asset, Experience, JsonResume, Resume } from "@/types";

/**
 * Convert a time period to two dates.
 */
export function getPeriodBounds(period: string) {
  // TODO handle several formats (YYYY-MM currently breaks)
  const bounds = period.split("-");
  return {
    startDate: bounds[0]?.trim(),
    endDate: bounds[1]?.trim(),
  };
}

/**
 * Format a resume in accordance to the JSON Resume schema.
 * See: https://jsonresume.org/schema
 */
export function formatResumeAsJsonResume(
  resume: Omit<Resume, "isNiceResumeExport" | "settings" | "template">,
) {
  const toExport: JsonResume = {
    basics: {
      name: resume.name,
      label: resume.title,
      image: "", // TODO
      email: resume.contactDetails.find(
        (detail) => detail.type === "personal" && detail.value.includes("@"),
      )?.value,
      phone: resume.contactDetails.find(
        (detail) =>
          detail.type === "personal" &&
          (detail.value.startsWith("0") || detail.value.startsWith("+")),
      )?.value,
      url: "",
      summary: resume.about,
      location: {
        address: "",
        postalCode: "",
        city: "",
        countryCode: "",
        region: "",
      },
      profiles: resume.contactDetails
        .filter((detail) => detail.type === "social")
        .map((detail) => {
          return {
            network: detail.icon as string,
            username: resume.name,
            url: detail.value,
          };
        }),
    },
    work: (
      resume.categories
        .filter((category) => category.type === "work")
        .flatMap((category) => category.entries) as Experience[]
    ).map((entry) => {
      const { startDate, endDate } = getPeriodBounds(entry.period);
      return {
        name: entry.organization,
        position: entry.title,
        url: "",
        startDate,
        endDate,
        summary: entry.summary,
        highlights: entry.highlights.concat(entry.tags),
      };
    }),
    volunteer: (
      resume.categories
        .filter((category) => category.type === "voluntary")
        .flatMap((category) => category.entries) as Experience[]
    ).map((entry) => {
      const { startDate, endDate } = getPeriodBounds(entry.period);
      return {
        organization: entry.organization,
        position: entry.title,
        url: "",
        startDate,
        endDate,
        summary: entry.summary,
        highlights: entry.highlights.concat(entry.tags),
      };
    }),
    education: (
      resume.categories
        .filter((category) => category.type === "education")
        .flatMap((category) => category.entries) as Experience[]
    ).map((entry) => {
      const { startDate, endDate } = getPeriodBounds(entry.period);
      return {
        institution: entry.organization,
        url: "",
        area: entry.title,
        studyType: entry.title,
        startDate,
        endDate,
        score: "",
        courses: entry.highlights.concat(entry.tags),
      };
    }),
    awards: (
      resume.categories
        .filter((category) => category.type === "award")
        .flatMap((category) => category.entries) as Experience[]
    ).map((entry) => {
      const { startDate } = getPeriodBounds(entry.period);
      return {
        title: entry.title,
        date: startDate,
        awarder: entry.organization,
        summary: entry.summary,
      };
    }),
    certificates: (
      resume.categories
        .filter((category) => category.type === "certificate")
        .flatMap((category) => category.entries) as Experience[]
    ).map((entry) => {
      const { startDate } = getPeriodBounds(entry.period);
      return {
        name: entry.title,
        date: startDate,
        issuer: entry.organization,
        url: "",
      };
    }),
    publications: (
      resume.categories
        .filter((category) => category.type === "publication")
        .flatMap((category) => category.entries) as Experience[]
    ).map((entry) => {
      const { startDate } = getPeriodBounds(entry.period);
      return {
        name: entry.title,
        publisher: entry.organization,
        releaseDate: startDate,
        summary: entry.summary,
        url: "",
      };
    }),
    skills: (
      resume.categories
        .filter((category) => category.type === "skill")
        .flatMap((category) => category.entries) as Asset[]
    ).map((entry) => {
      return {
        name: entry.title,
        level: entry.highlights.join(", "),
        keywords: entry.tags,
      };
    }),
    languages: (
      resume.categories
        .filter((category) => category.type === "language")
        .flatMap((category) => category.entries) as Asset[]
    ).map((entry) => {
      return {
        language: entry.title,
        fluency: entry.highlights
          .join(", ")
          .concat(`(${entry.tags.join(", ")})`),
      };
    }),
    interests: (
      resume.categories
        .filter((category) => category.type === "interest")
        .flatMap((category) => category.entries) as Asset[]
    ).map((entry) => {
      return {
        name: entry.title,
        keywords: entry.tags,
      };
    }),
    references: [], // TODO prompt definition
    projects: (
      resume.categories
        .filter((category) => category.type === "project")
        .flatMap((category) => category.entries) as Experience[]
    ).map((entry) => {
      const { startDate, endDate } = getPeriodBounds(entry.period);
      return {
        name: entry.title,
        startDate,
        endDate,
        description: entry.summary,
        highlights: entry.highlights.concat(entry.tags),
        url: "",
      };
    }),
  };
  return toExport;
}

export function importResumeFromJsonResume() {
  // TODO
}
