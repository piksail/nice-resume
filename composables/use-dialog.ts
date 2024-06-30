import { ref } from "vue";

export default function useDialog() {
  const dialog = ref<HTMLDialogElement>();

  function closeDialog() {
    dialog.value?.close();
  }

  function openDialog() {
    dialog.value?.showModal();
  }

  return { closeDialog, dialog, openDialog };
}
