<script setup lang="ts">
import { type Component, computed } from "vue";
import {
  EnvelopeIcon,
  IdentificationIcon,
  LinkIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/vue/16/solid";
import {
  BandcampIcon,
  BehanceIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MastodonIcon,
  SoundCloudIcon,
  StackOverflowIcon,
  ViadeoIcon,
  XIcon,
} from "vue3-simple-icons";
import type { ContactDetail } from "@/types";
import useDocumentSettings from "~/composables/use-document-settings";

const { icon, type } = defineProps<{
  icon: ContactDetail["icon"];
  type: ContactDetail["type"];
}>();

const settings = useDocumentSettings();

type IconMapper = {
  [K in ContactDetail["icon"] as string]: Component;
};

const iconMapper: IconMapper = {
  default: type === "social" ? LinkIcon : UserCircleIcon,
  // Personal
  address: MapPinIcon,
  drivingLicense: IdentificationIcon,
  email: EnvelopeIcon,
  phone: PhoneIcon,
  // Social
  bandcamp: BandcampIcon,
  behance: BehanceIcon,
  facebook: FacebookIcon,
  gitHub: GitHubIcon,
  instagram: InstagramIcon,
  linkedIn: LinkedInIcon,
  mastodon: MastodonIcon,
  soundCloud: SoundCloudIcon,
  stackOverflow: StackOverflowIcon,
  viadeo: ViadeoIcon,
  x: XIcon,
};

const component: Component = computed(() => (icon ? iconMapper[icon] : null));
</script>

<template>
  <component
    :is="component"
    :style="{
      fill: 'currentColor',
      color: settings.contactDetails.iconColor,
      height: `${settings.contactDetails.iconSize}px`,
      width: `${settings.contactDetails.iconSize}px`,
    }"
  />
</template>
