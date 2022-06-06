<template>
  <div class="space-y-8 divide-y divide-gray-200 bg-white">
    <div v-if="!showNewKit">
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2">
          <h4
            class="text-md leading-6 font-medium text-gray-900 mb-2 mt-4 flex flex-row space-between"
          >
            <!-- <h5>Interview Kits</h5> -->
            Add questions to your interview kit
          </h4>
          <div
            v-for="item in data"
            :key="item.id"
            class="border rounded mt-2 border-gray-200 p-4 flex flex-row w-full"
          >
            <!-- <div class="flex flex-row"> -->
              <div class="w-11/12">
                <h4 class="font-bold">{{ item.name }}</h4>
                <div class="flex flex-col">
                  <span
                    v-for="option in item.items"
                    :key="option.id"
                    class="font-sm ml-2"
                  >
                    {{ option.name }}
                  </span>
                </div>
              </div>
              <div class="w-1/12 flex flex-row">
                <PencilIcon class="h-5 w-5 text-gray-400"></PencilIcon>
                <TrashIcon class="h-5 w-5 text-gray-400"></TrashIcon>
              </div>
            <!-- </div> -->
          </div>
          <!-- <div class="pt-5">
            <div class="flex justify-start">
              <CancelButton
                @click="$emit('toggleMain')"
                label="Cancel"
                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              ></CancelButton>
            </div>
          </div> -->
        </div>
        <div class="mt-12">
          <button>Create a new section</button>
        </div>
      </div>
    </div>

    <div v-if="showNewKit" id="newInterviewKit" class="mt-4">
      <FormInput placeholder="Section title"></FormInput>
      <div class="mt-2 flex rounded-md shadow-sm">
        <div
          class="relative border-1 border-gray-200 flex items-stretch flex-grow focus-within:z-10"
        >
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <MenuIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            class="block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
            placeholder="Skill, requirement"
          />
        </div>
        <button
          type="button"
          class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100"
        >
          <TrashIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
      <div class="mt-2 flex rounded-md shadow-sm">
        <div
          class="relative border-1 border-gray-200 flex items-stretch flex-grow focus-within:z-10"
        >
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <MenuIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            class="block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
            placeholder="Skill, requirement"
          />
        </div>
        <button
          type="button"
          class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100"
        >
          <TrashIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
      <div class="mt-2 flex rounded-md shadow-sm">
        <div
          class="relative border-1 border-gray-200 flex items-stretch flex-grow focus-within:z-10"
        >
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <MenuIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            class="block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
            placeholder="Skill, requirement"
          />
        </div>
        <button
          type="button"
          class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100"
        >
          <TrashIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>

      <div class="pt-5">
        <div class="flex justify-start">
          <AppButton
            type="submit"
            label="Save Section"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></AppButton>
          <CancelButton
            @click="toggleAddKits"
            label="Cancel"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></CancelButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  MenuIcon,
  UserIcon,
  UsersIcon,
  TrashIcon,
  PencilIcon,
  CreditCardIcon,
  SortAscendingIcon,
  OfficeBuildingIcon,
} from "@heroicons/vue/solid";
import questions from "../../data/interviewKits";

const data = ref(questions);
let showNewKit = ref(false);

function toggleAddKits() {
  showNewKit.value = !showNewKit.value;
}

onMounted(() => {
  if (questions.length === 0) {
    showNewKit.value = true;
  }
});
</script>

<style></style>
