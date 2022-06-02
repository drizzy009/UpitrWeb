<template>
  <div
    class="
      space-y-8
      divide-y divide-gray-200
      bg-white
      p-6
      mt-4
      rounded-md
      border border-gray-300
    "
  >
    <div v-for="section in data" :key="section.sectionName">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2 mt-4">
          {{ section.sectionName }}
        </h3>
      </div>

      <div class="space-y-6 sm:space-y-5">
        <div
          class="
            sm:grid
            sm:grid-cols-3
            sm:gap-4
            sm:items-start
            sm:border-t
            sm:border-gray-200
            sm:pt-5
          "
          v-for="item in section.fields"
          :key="item.name"
        >
          <label
            for="names"
            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >{{ item.name }}</label
          >
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <RadioGroup v-model="selected" class="mt-2">
              <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                <RadioGroupOption
                  as="template"
                  v-for="option in item.options"
                  :key="option.optionName"
                  :value="option"
                  v-slot="{ active, checked }"
                >
                  <div
                    :class="[
                      'cursor-pointer focus:outline-none',
                      active ? 'ring-2 ring-offset-2 ring-green-500' : '',
                      checked
                        ? 'bg-green-400 border-transparent text-white hover:bg-green-500'
                        : 'bg-[#E1E6EB] border-gray-200 text-gray-900 hover:bg-gray-50',
                      'border rounded-full py-1 px-1 flex items-center justify-center text-sm font-medium sm:flex-1',
                    ]"
                  >
                    <RadioGroupLabel as="span">
                      {{ option.optionName }}
                    </RadioGroupLabel>
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2 mt-4">
        Other Question
      </h3>
      <div class="space-y-6 sm:space-y-5">
        <div
          class="
            sm:grid
            sm:grid-cols-3
            sm:gap-4
            sm:items-start
            sm:border-t
            sm:border-gray-200
            sm:pt-5
          "
        >
          <button
            type="button"
            class="
              inline-flex
              border border-transparent
              shadow-sm
              text-sm
              leading-4
              font-medium
              rounded-md
              text-indigo-700
              focus:outline-none
            "
            @click="addQuestion"
          >
            <PlusSmIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Add a question or Use requirements as questions
          </button>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="flex justify-end">
        <CancelButton
          label="Previous"
           @click="$emit('prevPage')"
          class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        ></CancelButton>
        <AppButton
          label="Continue"
          @click="$emit('nextPage')"
          class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        ></AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import applicationData from "../../data/applicationForm";
import { PlusSmIcon } from "@heroicons/vue/solid";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

const selected = ref();
const data = ref(applicationData);

function addQuestion() {
    
}
</script>

<style></style>
