<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="closeDialog">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        ></div>
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative px-2 pt-2 pb-2 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-6 sm:max-w-3xl sm:w-full sm:p-4"
            >
              <div>
                <div class="mt-3 text-left sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="mb-3 text-lg font-medium leading-6 text-left text-gray-900"
                  >
                    {{ title }}
                  </DialogTitle>
                  <div class="">
                    <slot></slot>
                  </div>
                </div>
              </div>
              <div
                v-if="showSubmitButton"
                class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
              >
                <AppButton
                  :processing="processing"
                  label="Submit"
                  class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  @click="submitData"
                ></AppButton>
                <button
                  type="button"
                  class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  @click="closeDialog"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
              <div v-if="!showSubmitButton" class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  @click="closeDialog"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const open = ref(false);
const props = defineProps({
  title: String,
  showModal: Boolean,
  processing: Boolean,
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["closeModal", "submit"]);

function closeDialog() {
  open.value = false;
  emits("closeModal");
}

function submitData() {
  emits("submit");
}

watch(
  () => props.showModal,
  (newValue) => {
    open.value = newValue;
  }
);
</script>
