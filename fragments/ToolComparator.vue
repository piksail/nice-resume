<script setup lang="ts">
type Tool = {
  name: string;
  free: boolean | "freemium" | "?";
  registerless: boolean;
  preview: "direct" | "formFirst" | "?";
  easyEdit: boolean;
  dataExport: boolean;
  customization: "none" | "sm" | "md" | "full" | "?";
  themes: number | "?";
  coverLetter: boolean;
};

const tools: Tool[] = [
  // TODO provide all tools
  {
    name: "Nice Resume",
    free: true,
    registerless: true,
    preview: "direct",
    easyEdit: true,
    dataExport: true,
    customization: "full",
    themes: 18,
    coverLetter: true,
  },
  {
    name: "Adecco CV",
    free: true,
    registerless: true,
    preview: "direct",
    easyEdit: true,
    dataExport: false,
    customization: "sm",
    themes: 1,
    coverLetter: false,
  },
  {
    name: "Aide CV",
    free: true,
    registerless: false,
    preview: "formFirst",
    easyEdit: true,
    dataExport: false,
    customization: "md",
    themes: 1,
    coverLetter: false,
  },
  {
    name: "Canva",
    free: "freemium",
    registerless: false,
    preview: "direct",
    easyEdit: false,
    dataExport: false,
    customization: "full",
    themes: 50,
    coverLetter: true,
  },
  {
    name: "Career.io",
    free: true,
    registerless: true,
    preview: "direct",
    easyEdit: true,
    dataExport: true,
    customization: "none",
    themes: 32,
    coverLetter: true,
  },
  {
    name: "CV.fr",
    free: "freemium",
    registerless: false,
    preview: "direct",
    easyEdit: true,
    dataExport: false,
    customization: "md",
    themes: 12,
    coverLetter: false,
  },
  {
    name: "CV Builder",
    free: "?",
    registerless: false,
    preview: "?",
    easyEdit: false,
    dataExport: false,
    customization: "?",
    themes: "?",
    coverLetter: false,
  },
  {
    name: "CV Designr",
    free: true,
    registerless: false,
    preview: "?",
    easyEdit: false,
    dataExport: false,
    customization: "?",
    themes: "?",
    coverLetter: false,
  },
  {
    name: "CV Maker",
    free: false,
    registerless: false,
    preview: "?",
    easyEdit: true,
    dataExport: false,
    customization: "?",
    themes: 9,
    coverLetter: false,
  },
  {
    name: "CV-Template",
    free: "freemium",
    registerless: false,
    preview: "direct",
    easyEdit: true,
    dataExport: false,
    customization: "sm",
    themes: 17,
    coverLetter: false,
  },
  // {
  //   name: "Do You Buzz",
  //   free: "?",
  //   registerless: false,
  //   preview: "?",
  //   easyEdit: false,
  //   dataExport: false,
  //   customization: "sm",
  //   themes: ?,
  //   coverLetter: false,
  // },
  {
    name: "Enhancv",
    free: "?",
    registerless: false,
    preview: "direct",
    easyEdit: true,
    dataExport: false,
    customization: "full",
    themes: 14,
    coverLetter: false,
  },
];
</script>

<template>
  <DataTable :value="tools" tableStyle="min-width: 50rem" class="">
    <Column field="name" :header="capitalize($t('name'))" />
    <Column field="free" :header="capitalize($t('free'))">
      <template #body="slotProps">
        <i class="pi" :class="slotProps.data.free ? 'pi-check' : 'pi-cross'" />
      </template>
    </Column>
    <Column field="registerless" :header="capitalize($t('registerless'))">
      <template #body="slotProps">
        <i
          class="pi text-center"
          :class="slotProps.data.registerless ? 'pi-check' : 'pi-cross'"
        />
      </template>
    </Column>
    <Column field="dataExport" :header="capitalize($t('dataExport'))">
      <template #body="slotProps">
        <i
          class="pi"
          :class="slotProps.data.dataExport ? 'pi-check' : 'pi-cross'"
        />
      </template>
    </Column>
    <Column field="themes" :header="capitalize($t('themes'))" />
    <Column field="coverLetter" :header="capitalize($t('coverLetter'))">
      <template #body="slotProps">
        <i
          class="pi"
          :class="slotProps.data.coverLetter ? 'pi-check' : 'pi-cross'"
        />
      </template>
    </Column>
  </DataTable>
</template>
