<template>
  <div
    class="p-4 my-4 border-2 border-indigo-200 rounded-lg shadow-md"
    v-for="(question, index) in questions"
    :key="question.id"
  >
    <div class="grid grid-cols-6 gap-4">
      <div class="col-start-1 col-end-6">
        <label class="text-base font-medium text-gray-900">
          <span class="pr-3">{{ index + 1 }}.</span> {{ question.name }}</label>
        <fieldset class="mt-4">
          <div class="space-y-4">
            <div
              :key="option"
              class="flex items-center"
              v-for="option in question.options"
            >
              <input
                type="radio"
                :id="option.id"
                :name="question.name"
                :checked="option.is_answer"
                v-bind:value="option.is_answer"
                @change="optionChange(question.id, option)"
                class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label
                :for="option.id"
                class="block ml-3 text-sm font-medium text-gray-700"
              >
                {{ option.value }}
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="col-span-1 col-end-7">
        <div class="flex flex-row-reverse">
          <TrashIcon
            @click="onDelete(question.id)"
            class="w-6 h-6 text-red-500 cursor-pointer"
          ></TrashIcon>
          <!-- <PencilIcon class="w-6 h-6 text-indigo-500 cursor-pointer"></PencilIcon> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon } from "@heroicons/vue/solid";
defineProps({
  questions: Array,
});

const emits = defineEmits(["removeQuestion", "answerSelected"]);

function onDelete(id) {
  emits("removeQuestion", id);
}

function optionChange(id, item) {
  emits('answerSelected', { questionId: id, optionId: item.id})
}
</script>

<style></style>
