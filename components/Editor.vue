<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import type { Export } from "@/types";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { capitalize } from "@/utils/string";
import LetterBodyEditor from "@/fragments/LetterBodyEditor.vue";
import LetterCustomizationEditor from "@/fragments/LetterCustomizationEditor.vue";
import ResumeCategoriesEditor from "@/fragments/ResumeCategoriesEditor.vue";
import ResumeCustomizationEditor from "@/fragments/ResumeCustomizationEditor.vue";
import LetterHeaderEditor from "@/fragments/LetterHeaderEditor.vue";
import PersonalDetailsEditor from "@/fragments/PersonalDetailsEditor.vue";
import { discouragedLayoutTemplates, fixedLayoutTemplates } from "@/globals";
import Button from "./Button.vue";

const { documentType } = storeToRefs(useEditorStore());

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
  profile.name.value = "Firstname Lastname";
  profile.title.value = "Title";
  resume.about.value = "About";
  resume.contactDetails.value = [
    { type: "personal", icon: "drivingLicense", value: "Driving license" },
    { type: "personal", icon: "address", value: "Address" },
    { type: "personal", icon: "email", value: "email@email.com" },
    { type: "personal", icon: "phone", value: "061122334455" },
    { type: "social", icon: "gitHub", value: "github.com" },
    { type: "social", icon: "linkedIn", value: "linkedin.com" },
    { type: "social", icon: "viadeo", value: "viadeo.com" },
  ];
  resume.categories.value = [
    {
      nature: "experience",
      type: "work",
      name: "Work experience",
      entries: [
        {
          nature: "experience",
          type: "work",
          title: "Title",
          organization: "Company",
          location: "Location",
          period: "Since",
          summary:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          highlights: ["A", "B", "C"],
          tags: ["1", "2", "3"],
        },
        {
          nature: "experience",
          type: "work",
          title: "Title",
          organization: "Company",
          location: "Location",
          period: "From To",
          summary:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          highlights: ["A", "B"],
          tags: ["1", "2"],
        },
      ],
      layout: "full",
    },
    {
      nature: "experience",
      type: "education",
      name: "Education",
      entries: [
        {
          nature: "experience",
          type: "education",
          title: "Title",
          organization: "Institution",
          location: "Location",
          period: "From To",
          summary:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          highlights: ["A", "B", "C"],
          tags: ["1", "2", "3"],
        },
        {
          nature: "experience",
          type: "education",
          title: "Title",
          organization: "Institution",
          location: "Location",
          period: "From To",
          summary:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          highlights: [],
          tags: [],
        },
      ],
      layout: "full",
    },
    {
      nature: "experience",
      type: "certificate",
      name: "Certificates",
      entries: [
        {
          nature: "experience",
          type: "certificate",
          title: "Title",
          organization: "Issuer",
          location: "Location",
          period: "Delivered (valid 2 years)",
          summary: "",
          highlights: [],
          tags: [],
        },
      ],
      layout: "half",
    },
    {
      nature: "asset",
      type: "skill",
      name: "Skills",
      entries: [
        {
          nature: "asset",
          type: "skill",
          title: "Title",
          highlights: ["A", "B", "C"],
          tags: ["1", "2", "3"],
        },
        {
          nature: "asset",
          type: "skill",
          title: "Title",
          highlights: ["A", "B", "C"],
          tags: ["1", "2", "3"],
        },
        {
          nature: "asset",
          type: "skill",
          title: "Title",
          highlights: ["A", "B"],
          tags: ["1", "2"],
        },
      ],
      layout: "half",
    },
    {
      nature: "asset",
      type: "language",
      name: "Languages",
      entries: [
        {
          nature: "asset",
          type: "language",
          title: "Title",
          highlights: ["A", "B", "C"],
          tags: ["1", "2", "3"],
        },
        {
          nature: "asset",
          type: "language",
          title: "Title",
          highlights: ["A", "B", "C"],
          tags: ["1", "2", "3"],
        },
        {
          nature: "asset",
          type: "language",
          title: "Title",
          highlights: ["A", "B"],
          tags: ["1", "2"],
        },
      ],
      layout: "half",
    },
  ];
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
  letter.reference.value = "Ref.: Application reference";
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
    class="m-auto p-16 rounded-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
  >
    <p class="mb-8 text-center text-2xl font-bold text-pink-500">
      How do you want to start editing?
    </p>
    <div class="flex flex-col gap-4">
      <Button class="shadow" @click="closeModal">
        Continue where I left off
      </Button>
      <Button class="shadow" @click="resetStores">Start from scratch</Button>
      <Button class="shadow" @click="generateStores">
        Edit pre-filled data
      </Button>
      <div>
        <label
          for="editorFileReader"
          class="shadow bg-white px-3 py-2 rounded cursor-pointer"
        >
          <span
            class="bg-gradient-to-br from-blue-700 to-pink-500 text-transparent bg-clip-text text-center font-black tracking-widest uppercase"
          >
            Import a save file from a previous session
          </span>
          <input
            id="editorFileReader"
            class="hidden"
            type="file"
            accept=".json"
            @change="importFromJson"
          />
        </label>
        <p v-if="isImportError" class="text-red-500">
          Error while importing data from local file.
        </p>
      </div>
      <!-- <Button>Import JSONResume.org</Button> -->
      <!-- <Button>Import LinkedIn profile</Button> -->
      <!-- <Button>Import Viadeo profile</Button> -->
      <p v-if="isImportError" class="text-red-500 text-center">
        Error while importing data from local file.
      </p>
    </div>
  </dialog>
  <main
    class="flex flex-col xl:flex-row overflow-y-auto text-white flex-1 scroll-smooth"
  >
    <header class="sticky z-10 top-[100px] md:top-0">
      <nav
        class="bg-white xl:bg-transparent px-10 py-2 xl:p-8 text-blue-500 xl:text-white flex xl:flex-col gap-x-5 flex-wrap"
      >
        <span class="text-pink-500">Navigate to</span>
        <a href="#Details">Details</a>
        <template v-if="documentType === 'letter'">
          <a href="#Header">Header</a>
          <a href="#Body">Body</a>
        </template>
        <template v-else>
          <a
            v-for="category in categories"
            :key="category.name"
            :href="`#${category.name}`"
          >
            {{ category.name }}
          </a>
        </template>
        <a href="#Customization">Customization</a>
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
    <div class="flex flex-col gap-8 p-4 md:p-8 w-full max-w-[860px] mx-auto">
      <PersonalDetailsEditor />
      <template v-if="documentType === 'letter'">
        <LetterHeaderEditor />
        <LetterBodyEditor />
        <LetterCustomizationEditor />
      </template>
      <template v-else>
        <ResumeCategoriesEditor />
        <ResumeCustomizationEditor />
      </template>
    </div>
  </main>
</template>
