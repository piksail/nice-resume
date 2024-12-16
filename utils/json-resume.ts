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
 * Format a JSON Resume in accordance to the Nice Resume interface.
 * See: https://jsonresume.org/schema
 */
export function formatJsonResumeAsResume(jsonResume: JsonResume) {
  const toImport: Resume = {
    template: "default",
    name: "",
    title: "",
    about: "",
    contactDetails: [],
    categories: [],
  };
  Object.entries(jsonResume).forEach(([key, value]) => {
    if (key === "basics") {
      const basics: JsonResume["basics"] = value;
      toImport.name = basics.name;
      toImport.title = basics.label;
      toImport.about = basics.summary ?? "";
      toImport.contactDetails = [];
      if (basics.email) {
        toImport.contactDetails.push({
          type: "personal",
          icon: null,
          value: basics.email,
        });
      }
      if (basics.phone) {
        toImport.contactDetails.push({
          type: "personal",
          icon: null,
          value: basics.phone,
        });
      }
      if (
        basics.location.address ||
        basics.location.postalCode ||
        basics.location.city ||
        basics.location.countryCode ||
        basics.location.region
      ) {
        toImport.contactDetails.push({
          type: "personal",
          icon: null,
          value: `${basics.location.address ? `${basics.location.address}, ` : ""}${basics.location.postalCode ? `${basics.location.postalCode}, ` : ""}${basics.location.city ? `${basics.location.city}, ` : ""}${basics.location.countryCode ? `${basics.location.countryCode}, ` : ""}${basics.location.region ?? ""}`,
        });
      }
      if (basics.url) {
        toImport.contactDetails.push({
          type: "personal",
          icon: null,
          value: basics.url,
        });
      }
      basics.profiles?.forEach((profile) => {
        toImport.contactDetails.push({
          type: "social",
          icon: null,
          value: profile.url,
        });
      });
    }

    if (key === "work" && value?.length) {
      const work: JsonResume["work"] = value;
      toImport.categories.push({
        nature: "experience",
        type: "work",
        name: "Work", // TODO detect locale and adapt
        entries: work.map((work) => {
          return {
            nature: "experience",
            type: "work",
            title: work.position,
            organization: work.name,
            location: "",
            period: `${work.startDate} - ${work.endDate}`,
            summary: work.summary,
            highlights: [...work.highlights],
            tags: [],
          };
        }),
        layout: "full",
        isLocked: false,
        isVisible: true,
      });
    }
    if (key === "volunteer" && value?.length) {
      const volunteer: JsonResume["volunteer"] = value;
      toImport.categories.push({
        nature: "experience",
        type: "voluntary",
        name: "Voluntary", // TODO detect locale and adapt
        entries: volunteer.map((voluntary) => {
          return {
            nature: "experience",
            type: "voluntary",
            title: voluntary.position,
            organization: voluntary.organization,
            location: "",
            period: `${voluntary.startDate} - ${voluntary.endDate}`,
            summary: voluntary.summary,
            highlights: [...voluntary.highlights],
            tags: [],
          };
        }),
        layout: "full",
        isLocked: false,
        isVisible: true,
      });
    }
    if (key === "education" && value?.length) {
      const education: JsonResume["education"] = value;
      toImport.categories.push({
        nature: "experience",
        type: "education",
        name: "Education", // TODO detect locale and adapt
        entries: education.map((education) => {
          return {
            nature: "experience",
            type: "education",
            title: `${education.studyType} - ${education.area}`,
            organization: education.institution,
            location: "",
            period: `${education.startDate} - ${education.endDate}`,
            summary: "",
            highlights: [...education.courses],
            tags: [`${education.score}`],
          };
        }),
        layout: "full",
        isLocked: false,
        isVisible: true,
      });
    }
    if (key === "awards" && value?.length) {
      const awards: JsonResume["awards"] = value;
      toImport.categories.push({
        nature: "experience",
        type: "award",
        name: "Award", // TODO detect locale and adapt
        entries: awards.map((award) => {
          return {
            nature: "experience",
            type: "award",
            title: award.title,
            organization: award.awarder,
            location: "",
            period: award.date,
            summary: award.summary,
            highlights: [],
            tags: [],
          };
        }),
        layout: "full",
        isLocked: false,
        isVisible: true,
      });
    }
    if (key === "certificates" && value?.length) {
      const certificates: JsonResume["certificates"] = value;
      toImport.categories.push({
        nature: "experience",
        type: "certificate",
        name: "Certificate", // TODO detect locale and adapt
        entries: certificates.map((certificate) => {
          return {
            nature: "experience",
            type: "certificate",
            title: certificate.name,
            organization: certificate.issuer,
            location: "",
            period: certificate.date,
            summary: "",
            highlights: [],
            tags: [],
          };
        }),
        layout: "full",
        isLocked: false,
        isVisible: true,
      });
    }
    if (key === "publications" && value?.length) {
      const publications: JsonResume["publications"] = value;
      toImport.categories.push({
        nature: "experience",
        type: "publication",
        name: "Publication", // TODO detect locale and adapt
        entries: publications.map((publication) => {
          return {
            nature: "experience",
            type: "publication",
            title: publication.name,
            organization: publication.publisher,
            location: "",
            period: publication.releaseDate,
            summary: "",
            highlights: [],
            tags: [],
          };
        }),
        layout: "full",
        isLocked: false,
        isVisible: true,
      });
    }
    if (key === "skills" && value?.length) {
      const skills: JsonResume["skills"] = value;
      toImport.categories.push({
        nature: "asset",
        type: "skill",
        name: "Skill", // TODO detect locale and adapt
        entries: skills.map((skill) => {
          return {
            nature: "asset",
            type: "skill",
            title: skill.name,
            highlights: [skill.level],
            tags: [...skill.keywords],
          };
        }),
        layout: "full",
        isLocked: false,
        isVisible: true,
      });
    }
    if (key === "languages" && value?.length) {
      const languages: JsonResume["languages"] = value;
      toImport.categories.push({
        nature: "asset",
        type: "language",
        name: "Language", // TODO detect locale and adapt
        entries: languages.map((language) => {
          return {
            nature: "asset",
            type: "language",
            title: language.language,
            highlights: [language.fluency],
            tags: [],
          };
        }),
        layout: "full",
        isLocked: false,
        isVisible: true,
      });
    }
    if (key === "interests" && value?.length) {
      const interests: JsonResume["interests"] = value;
      toImport.categories.push({
        nature: "asset",
        type: "interest",
        name: "Interest", // TODO detect locale and adapt
        entries: interests.map((interest) => {
          return {
            nature: "asset",
            type: "interest",
            title: interest.name,
            highlights: [],
            tags: [...interest.keywords],
          };
        }),
        layout: "full",
        isLocked: false,
        isVisible: true,
      });
    }
    // Ignore references
    if (key === "projects" && value?.length) {
      const projects: JsonResume["projects"] = value;
      toImport.categories.push({
        nature: "experience",
        type: "project",
        name: "Project", // TODO detect locale and adapt
        entries: projects.map((project) => {
          return {
            nature: "experience",
            type: "project",
            title: project.name,
            organization: "",
            location: "",
            period: `${project.startDate} - ${project.endDate}`,
            summary: project.description,
            highlights: [...project.highlights],
            tags: [],
          };
        }),
        layout: "full",
        isLocked: false,
        isVisible: true,
      });
    }
  });
  return toImport as Resume;
}

/**
 * Format a resume in accordance to the JSON Resume schema.
 * See: https://jsonresume.org/schema
 */
export function formatResumeAsJsonResume(
  resume: Omit<Resume, "settings" | "template">,
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
    references: [],
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
