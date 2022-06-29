<template>
  <div
    class="border-2 border-indigo-200 rounded-lg shadow-md my-4 p-4"
    v-for="(question, index) in questions"
    :key="question.id"
  >
    <div class="grid grid-cols-6 gap-4">
      <div class="col-start-1 col-end-6">
        <label class="text-base font-medium text-gray-900">
        <span class="pr-3">{{ index+1 }}.</span>  {{ question.name }}</label>
        <fieldset class="mt-4">
          <div class="space-y-4">
            <ol
              v-for="option in question.options"
              :key="option"
              class="flex items-center"
            >
              <li>
                <label
                  :for="option"
                  class="ml-3 block text-sm font-medium text-gray-700"
                >
                  <i class="fa-solid fa-circle-dot pr-2"></i> {{ option.name }}
                </label>
              </li>
            </ol>
          </div>
        </fieldset>
      </div>
      <div class="col-end-7 col-span-1">
        <div class="flex flex-row-reverse">
          <TrashIcon class="h-6 w-6 text-red-500 cursor-pointer"></TrashIcon>
          <PencilIcon class="h-6 w-6 text-indigo-500 cursor-pointer"></PencilIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  TrashIcon,
  PencilIcon,
} from "@heroicons/vue/solid";
//import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
defineProps({
  questions: Array,
});
</script>

<style></style>
