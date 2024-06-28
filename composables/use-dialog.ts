import { ref } from "vue";

export default function useDialog() {
  const dialog = ref<HTMLDialogElement>();

  function closeModal() {
    dialog.value?.close();
  }

  function openModal() {
    dialog.value?.showModal();
  }

  return { closeModal, dialog, openModal };
}
