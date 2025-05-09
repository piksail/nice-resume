import { nextTick } from "vue";
import type { Asset, Category, Experience, ListMarker } from "@/types";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { getRandomAsset, getRandomExperience } from "./random";

/**
 * Focus the last input of a given selector.
 */
export async function focusNextInput(selector: string) {
  await nextTick(); // Wait for the new input to be rendered before querying it
  const inputs = [...document.querySelectorAll(selector)];
  (inputs[inputs.length - 1] as HTMLInputElement).focus();
}

/**
 * Get entry heading given the type.
 */
export function generateStores(
  profile: ReturnType<typeof useProfileStore>,
  resume: ReturnType<typeof useResumeStore>,
  letter: ReturnType<typeof useLetterStore>,
  t: (message: string) => string,
) {
  const name = `${capitalize(t("givenName"))} ${t("name").toUpperCase()}`;
  const street = `X ${capitalize(t("street"))} ${capitalize(t("name"))}`;
  const address = `${t("postalCode").toUpperCase()} ${capitalize(t("city"))} ${capitalize(t("region"))}`;

  // Profile
  profile.name = name;
  profile.title = capitalize(t("title"));
  profile.about =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  profile.contactDetails = [
    {
      type: "personal",
      icon: "drivingLicense",
      value: capitalize(t("drivingLicense")),
    },
    {
      type: "personal",
      icon: "address",
      value: `${street}, ${address}`,
    },
    { type: "personal", icon: "email", value: "email@email.com" },
    { type: "personal", icon: "phone", value: "061122334455" },
    { type: "social", icon: "gitHub", value: "github.com" },
    { type: "social", icon: "linkedIn", value: "linkedin.com" },
    { type: "social", icon: "viadeo", value: "viadeo.com" },
  ];

  // Resume
  resume.categories = [
    {
      nature: "experience",
      type: "work",
      name: capitalize(t("workExperience")),
      entries: [
        getRandomExperience("work" as Experience["type"], t),
        getRandomExperience("work" as Experience["type"], t),
        getRandomExperience("work" as Experience["type"], t),
      ],
      layout: "full",
      isLocked: false,
      isVisible: true,
    },
    {
      nature: "experience",
      type: "education",
      name: capitalize(t("education")),
      entries: [
        getRandomExperience("education" as Experience["type"], t),
        getRandomExperience("education" as Experience["type"], t),
      ],
      layout: "full",
      isLocked: false,
      isVisible: true,
    },
    {
      nature: "experience",
      type: "certificate",
      name: capitalize(t("certificates")),
      entries: [getRandomExperience("certificate" as Experience["type"], t)],
      layout: "half",
      isLocked: false,
      isVisible: true,
    },
    {
      nature: "experience",
      type: "publication",
      name: capitalize(t("publications")),
      entries: [
        getRandomExperience("publication" as Experience["type"], t),
        getRandomExperience("publication" as Experience["type"], t),
      ],
      layout: "half",
      isLocked: false,
      isVisible: true,
    },
    {
      nature: "experience",
      type: "award",
      name: capitalize(t("awards")),
      entries: [getRandomExperience("award" as Experience["type"], t)],
      layout: "half",
      isLocked: false,
      isVisible: true,
    },
    {
      nature: "asset",
      type: "skill",
      name: capitalize(t("skills")),
      entries: [
        getRandomAsset("skill" as Asset["type"], t),
        getRandomAsset("skill" as Asset["type"], t),
        getRandomAsset("skill" as Asset["type"], t),
      ],
      layout: "half",
      isLocked: false,
      isVisible: true,
    },
    {
      nature: "asset",
      type: "language",
      name: capitalize(t("languages")),
      entries: [
        getRandomAsset("language" as Asset["type"], t),
        getRandomAsset("language" as Asset["type"], t),
        getRandomAsset("language" as Asset["type"], t),
      ],
      layout: "half",
      isLocked: false,
      isVisible: true,
    },
  ];

  // Letter
  letter.senderDetails = [name, street, address];
  letter.recipientDetails = [name, street, address];
  letter.subject = `${t("coverLetter")} ${t("subject")}`;
  letter.reference = "Ref.: Advertisement reference"; // TODO localize
  letter.paragraphs = [
    `${capitalize(t("letterGreeting"))},`,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    `${capitalize(t("letterSignOff"))},`,
  ];

  // Email has no specific content
}

export function getCategoryIconClass(categoryType: Category["type"]) {
  const iconMapper: { [key in Category["type"]]: string } = {
    award: "pi-trophy",
    certificate: "pi-verified",
    education: "pi-graduation-cap",
    interest: "pi-heart",
    language: "pi-language",
    project: "pi-box",
    publication: "pi-book",
    skill: "pi-wrench",
    voluntary: "pi-face-smile",
    work: "pi-briefcase",
  };
  return iconMapper[categoryType];
}

/**
 * Get entry heading given the type.
 */
export function getEntryHeading(entry: Asset | Experience, entryIndex: number) {
  if (entry.nature === "experience" && entry.title) {
    return entry.organization
      ? `${entry.title} | ${entry.organization}`
      : entry.title;
  }
  if (entry.nature === "asset") {
    return entry.title;
  }

  return `Entry #${entryIndex + 1}`;
}

/**
 * Adapt entry title label given the type.
 */
export function getEntryTitleLabel(type: Asset["type"] | Experience["type"]) {
  switch (type) {
    case "education":
      return "diploma";
    case "project":
    case "voluntary":
    case "work":
      return "position";
    case "language":
      return "language";
    default:
      return "title";
  }
}

/**
 * Adapt experience oragnization label given the type.
 */
export function getExperienceOrganizationLabel(type: Experience["type"]) {
  switch (type) {
    case "work":
      return "company";
    case "award":
    case "education":
    case "certificate":
      return "institution";
    case "publication":
      return "publisher";
    case "project":
    case "voluntary":
      return "organization";
  }
}

/**
 * Get actual marker symbol given list marker.
 */
export function getListMarker(value: ListMarker) {
  switch (value) {
    case "hyphen":
      return "'- '";
    case "triangle":
      return "disclosure-closed";
    case null:
      return "none";
    default:
      return value;
  }
}

/**
 * Convert 1/2/3/4 to top/right/bottom/left.
 */
export function getSideIndexLabel(index: number) {
  // Vue.js for loop is one-indexed
  if (index < 1 || index > 4) return "";
  return ["top", "right", "bottom", "left"][index - 1];
}
