<template>
  <div class="border-2 border-cyan-100 my-4 p-4" v-for="question in questions" :key="question.id">
    <label class="text-base font-medium text-gray-900">{{ question.name }}</label>
    <fieldset class="mt-4">
      <div class="space-y-4">
        <ol v-for="option in question.options" :key="option" class="flex items-center">
          <li>
            <label :for="option" class="ml-3 block text-sm font-medium text-gray-700">
                {{ option.name }}
            </label>
          </li>
        </ol>
      </div>
    </fieldset>
    <!-- <label class="text-base font-medium text-gray-900">{{ question.name }}</label> -->
    <!-- <fieldset class="mt-4">
      <div class="space-y-4">
        <div v-for="option in question.options" :key="option" class="flex items-center">
          <input :id="option" name="notification-method" type="radio" :checked="option" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
          <label :for="option" class="ml-3 block text-sm font-medium text-gray-700">
            {{ option }}
          </label>
        </div>
      </div>
    </fieldset> -->
  </div>
</template>

<script setup>
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
defineProps({
    questions: Array,
});
</script>

<style>

</style>