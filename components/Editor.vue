<script setup lang="ts">
import { computed, onMounted, ref, type Component } from "vue";
import { storeToRefs } from "pinia";
import {
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
  CubeIcon,
  DocumentTextIcon,
  EnvelopeOpenIcon,
  HeartIcon,
  LanguageIcon,
  LifebuoyIcon,
  TrophyIcon,
  UserIcon,
  WrenchIcon,
} from "@heroicons/vue/16/solid";
import type { Asset, Category, Experience, Export } from "@/types";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { getRandomAsset, getRandomExperience } from "@/utils/random";
import { capitalize } from "@/utils/string";
import LetterEditor from "@/fragments/LetterEditor.vue";
import ProfileEditor from "@/fragments/ProfileEditor.vue";
import ResumeEditor from "@/fragments/ResumeEditor.vue";
import StyleEditor from "@/fragments/StyleEditor.vue";
import { discouragedLayoutTemplates, fixedLayoutTemplates } from "@/globals";

const { documentType } = defineProps<{
  documentType: "letter" | "resume";
}>();

const { template } = storeToRefs(useProfileStore());

const { categories } = storeToRefs(useResumeStore());

const profileStore = useProfileStore();
const profile = storeToRefs(profileStore);
const resumeStore = useResumeStore();
const resume = storeToRefs(resumeStore);
const letterStore = useLetterStore();
const letter = storeToRefs(letterStore);

const dialog = ref(null);
const isImportError = ref(false);

const isLayoutDisabled = computed(() =>
  fixedLayoutTemplates.includes(template.value),
);

const isLayoutDiscouraged = computed(() => {
  const discouragedLayouts = discouragedLayoutTemplates[template.value];
  return categories.value.some((category) =>
    discouragedLayouts.includes(category.layout),
  );
});

const discouragedLayoutText = computed(() => {
  const isPlural = discouragedLayoutTemplates[template.value].length > 1;
  const layouts = discouragedLayoutTemplates[template.value].join(" and ");
  return `${capitalize(layouts)} ${isPlural ? "layouts are" : "layout is"} discouraged for this template.`;
});

function closeModal() {
  // @ts-expect-error TODO type
  dialog.value.close();
}

function openModal() {
  // @ts-expect-error TODO type
  dialog.value.showModal();
}

function generateStores() {
  // Profile
  profile.name.value = "Firstname Lastname";
  profile.title.value = "Title";
  profile.about.value = "About";
  profile.contactDetails.value = [
    { type: "personal", icon: "drivingLicense", value: "Driving license" },
    { type: "personal", icon: "address", value: "Address" },
    { type: "personal", icon: "email", value: "email@email.com" },
    { type: "personal", icon: "phone", value: "061122334455" },
    { type: "social", icon: "gitHub", value: "github.com" },
    { type: "social", icon: "linkedIn", value: "linkedin.com" },
    { type: "social", icon: "viadeo", value: "viadeo.com" },
  ];

  // Resume
  resume.categories.value = [
    {
      nature: "experience",
      type: "work",
      name: "Work experience",
      entries: [
        getRandomExperience("work" as Experience["type"]),
        getRandomExperience("work" as Experience["type"]),
        getRandomExperience("work" as Experience["type"]),
      ],
      layout: "full",
      isVisible: true,
    },
    {
      nature: "experience",
      type: "education",
      name: "Education",
      entries: [
        getRandomExperience("education" as Experience["type"]),
        getRandomExperience("education" as Experience["type"]),
      ],
      layout: "full",
      isVisible: true,
    },
    {
      nature: "experience",
      type: "certificate",
      name: "Certificates",
      entries: [getRandomExperience("certificate" as Experience["type"])],
      layout: "half",
      isVisible: true,
    },
    {
      nature: "experience",
      type: "publication",
      name: "Publications",
      entries: [
        getRandomExperience("publication" as Experience["type"]),
        getRandomExperience("publication" as Experience["type"]),
      ],
      layout: "half",
      isVisible: true,
    },
    {
      nature: "experience",
      type: "award",
      name: "Awards",
      entries: [getRandomExperience("award" as Experience["type"])],
      layout: "half",
      isVisible: true,
    },
    {
      nature: "asset",
      type: "skill",
      name: "Skills",
      entries: [
        getRandomAsset("skill" as Asset["type"]),
        getRandomAsset("skill" as Asset["type"]),
        getRandomAsset("skill" as Asset["type"]),
      ],
      layout: "half",
      isVisible: true,
    },
    {
      nature: "asset",
      type: "language",
      name: "Languages",
      entries: [
        getRandomAsset("language" as Asset["type"]),
        getRandomAsset("language" as Asset["type"]),
        getRandomAsset("language" as Asset["type"]),
      ],
      layout: "half",
      isVisible: true,
    },
  ];

  // Letter
  letter.senderDetails.value = [
    "Firstname Lastname",
    "Streetnumber Streetname Street",
    "Zip code City Country",
  ];
  letter.recipientDetails.value = [
    "Firstname Lastname",
    "Streetnumber Streetname Street",
    "Zip code City Country",
  ];
  letter.subject.value = "Cover letter subject";
  letter.reference.value = "Ref.: Advertisement reference";
  letter.paragraphs.value = [
    "Salutation,",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    "Outroduction.",
    "Regards.",
  ];

  closeModal();
}

function getCategoryIcon(categoryType: Category["type"]) {
  const iconMapper: { [key in Category["type"]]: Component } = {
    award: TrophyIcon,
    certificate: CheckBadgeIcon,
    education: AcademicCapIcon,
    interest: HeartIcon,
    language: LanguageIcon,
    project: CubeIcon,
    publication: BookOpenIcon,
    skill: WrenchIcon,
    voluntary: LifebuoyIcon,
    work: BriefcaseIcon,
  };
  return iconMapper[categoryType];
}

function importFromJson(event: Event) {
  isImportError.value = false;
  try {
    // @ts-expect-error It seems there is no default <input type=file /> native TS type...
    const file = event.currentTarget?.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = function (fileReaderEvent) {
      if (!fileReaderEvent.target?.result) {
        isImportError.value = true;
        return;
      }

      const toImport: Export = JSON.parse(
        fileReaderEvent.target.result.toString(),
      );
      if (!toImport.isNiceResumeExport) {
        isImportError.value = true;
        return;
      }

      Object.entries(toImport).forEach(([key, value]) => {
        // @ts-expect-error Build object on the fly
        if (letter[key]) {
          // @ts-expect-error Build object on the fly
          letter[key].value = value;
        }
        // @ts-expect-error Build object on the fly
        if (profile[key]) {
          // @ts-expect-error Build object on the fly
          profile[key].value = value;
        }
        // @ts-expect-error Build object on the fly
        if (resume[key]) {
          // @ts-expect-error Build object on the fly
          resume[key].value = value;
        }
      });

      closeModal();
    };
    fileReader.onerror = function () {
      isImportError.value = true;
    };
  } catch {
    isImportError.value = true;
  }
}

function importFromJsonResume(event: Event) {
  isImportError.value = false;
  try {
    // @ts-expect-error It seems there is no default <input type=file /> native TS type...
    const file = event.currentTarget?.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = function (fileReaderEvent) {
      if (!fileReaderEvent.target?.result) {
        isImportError.value = true;
        return;
      }

      const toImport: Export = JSON.parse(
        fileReaderEvent.target.result.toString(),
      );

      // TODO start user-journey to apply mapping
      // TODO improve mapping (startDate/endDate->period)
      // TODO improve mapping (highlights/tags->handle)
      // TODO improve mapping (references->lost)

      Object.entries(toImport).forEach(([key, value]) => {
        // @ts-expect-error Build object on the fly
        if (letter[key]) {
          // @ts-expect-error Build object on the fly
          letter[key].value = value;
        }
        // @ts-expect-error Build object on the fly
        if (profile[key]) {
          // @ts-expect-error Build object on the fly
          profile[key].value = value;
        }
        // @ts-expect-error Build object on the fly
        if (resume[key]) {
          // @ts-expect-error Build object on the fly
          resume[key].value = value;
        }
      });

      closeModal();
    };
    fileReader.onerror = function () {
      isImportError.value = true;
    };
  } catch {
    isImportError.value = true;
  }
}

function resetStores() {
  profileStore.$reset();
  resumeStore.$reset();
  letterStore.$reset();
  closeModal();
}

onMounted(() => {
  openModal();
});
</script>

<template>
  <dialog
    ref="dialog"
    class="print:hidden max-w-screen-sm m-auto p-16 rounded-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
  >
    <p class="mb-8 text-center text-2xl font-bold text-pink-500">
      How do you want to start editing?
    </p>
    <div class="flex flex-col gap-4">
      <button class="button bg-white" @click="closeModal">
        <span class="textGradient">Continue where I left off</span>
      </button>
      <button class="button bg-white" @click="resetStores">
        <span class="textGradient">Start from scratch</span>
      </button>
      <button class="button bg-white" @click="generateStores">
        <span class="textGradient">Edit pre-filled data</span>
      </button>
      <label for="editorSaveFileReader" class="button bg-white cursor-pointer">
        <span class="textGradient">
          Import a save file from a previous session
        </span>
        <input
          id="editorSaveFileReader"
          class="hidden"
          type="file"
          accept=".json"
          @change="importFromJson"
        />
      </label>
      <label
        for="editorJsonResumeFileReader"
        class="button bg-white cursor-pointer"
      >
        <span class="textGradient">Import a JSON Resume file*</span>
        <input
          id="editorJsonResumeFileReader"
          class="hidden"
          type="file"
          accept=".json"
          @change="importFromJsonResume"
        />
      </label>
      <p class="text-blue-500 text-center">
        *Full compatibility will be soon available. In The meantime,
        double-check dates, highlights and tags after import, and be informed
        that profile image and references are not supported yet.
      </p>
      <p v-if="isImportError" class="text-red-500 text-center">
        Error while importing data from local file.
      </p>
    </div>
  </dialog>
  <main
    class="print:hidden relative flex flex-col xl:flex-row text-white flex-1"
  >
    <header class="sticky z-10 top-[100px] lg:top-0">
      <nav
        class="bg-white xl:bg-transparent px-10 py-2 xl:p-8 text-blue-500 xl:text-white flex xl:flex-col gap-x-5 flex-wrap"
      >
        <a
          href="#Profile"
          class="underline-offset-4 hover:underline flex gap-1 items-center w-fit"
        >
          <UserIcon class="w-4" />
          Profile
        </a>
        <template v-if="documentType === 'letter'">
          <a
            href="#Header"
            class="underline-offset-4 hover:underline flex gap-1 items-center w-fit"
          >
            <EnvelopeOpenIcon class="w-4" />
            Header
          </a>
          <a
            href="#Body"
            class="underline-offset-4 hover:underline flex gap-1 items-center w-fit"
          >
            <DocumentTextIcon class="w-4" />
            Body
          </a>
        </template>
        <template v-else>
          <a
            v-for="category in categories"
            :key="category.name"
            :href="`#${category.name}`"
            class="underline-offset-4 hover:underline flex gap-1 items-center w-fit"
          >
            <component :is="getCategoryIcon(category.type)" class="w-4" />
            {{ category.name }}
          </a>
        </template>
      </nav>
      <template v-if="documentType === 'resume'">
        <p v-if="isLayoutDisabled" class="text-center px-10 py-2 bg-amber-500">
          Category layouts are fixed for this template.
        </p>
        <p
          v-if="isLayoutDiscouraged"
          class="text-center px-10 py-2 bg-amber-500"
        >
          {{ discouragedLayoutText }}
        </p>
      </template>
    </header>
    <section class="w-full overflow-y-auto scroll-smooth">
      <div class="flex flex-col gap-8 p-4 lg:p-8 max-w-[860px] mx-auto">
        <ProfileEditor />
        <LetterEditor v-if="documentType === 'letter'" />
        <ResumeEditor v-else />
      </div>
    </section>
    <footer class="fixed z-10 bottom-8 left-8 overflow-x-auto">
      <StyleEditor />
    </footer>
  </main>
</template>
