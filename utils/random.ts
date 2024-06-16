import type { Asset, Experience } from "@/types";
import { getEntryTitleLabel, getExperienceOrganizationLabel } from "./editor";

export function getRandomAsset(type: Asset["type"]): Asset {
  return {
    nature: "asset" as Asset["nature"],
    type,
    title: getEntryTitleLabel(type),
    highlights: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Sed do eiusmod tempor incididunt ut labore",
    ],
    tags: ["Lorem ipsum", "Dolor", "Sit amet"],
  };
}

export function getRandomExperience(type: Experience["type"]): Experience {
  return {
    nature: "experience" as Experience["nature"],
    type,
    title: getEntryTitleLabel(type),
    organization: getExperienceOrganizationLabel(type),
    location: "Location",
    period:
      type === "certificate"
        ? "Delivered in X (valid 2 years)"
        : "From X - To Y",
    summary:
      type === "certificate"
        ? ""
        : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    highlights:
      type === "certificate"
        ? []
        : [
            "Lorem ipsum dolor sit amet",
            "Consectetur adipiscing elit",
            "Sed do eiusmod tempor incididunt ut labore",
          ],
    tags: type === "certificate" ? [] : ["Lorem ipsum", "Dolor", "Sit amet"],
  };
}
