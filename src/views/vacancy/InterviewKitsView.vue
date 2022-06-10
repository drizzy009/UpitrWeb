<template>
  <div class="space-y-8 divide-y divide-gray-200 bg-white">
    <div v-if="showEmptyKit" class="mt-6">
      <button type="button" @click="toggleEmptyKit()" class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 ">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No Interview Kits Here</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new interview kit.</p>
      </button>
    </div>

    <div v-if="showAddKit" id="newInterviewKit" class="mt-4">
      <div class="md:grid md:grid-cols-12 md:gap-6 pt-8 mb-4">
        <div class="mt-5 md:mt-0 md:col-span-10">
          <form v-for="(section, index) in sections"
                  :key="section">
            <div class="shadow overflow-hidden sm:rounded-md mb-4">
              <div class="px-4 py-2 bg-gray-50 sm:p-6 shadow">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-6">
                    <input                    
                        v-model="section.title"
                        type="text"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                  </div>
                  <div class="col-span-6 sm:col-span-6">
                    <textarea
                        id="skills"
                        v-model="section.skills"
                        name="skills"
                        rows="5"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Skills trait or requirements"
                      />
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-100 sm:px-6">
                <span
                  @click="saveSection()"
                  class="inline-flex cursor-pointer justify-center mr-2 w-auto px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600  rounded-md sm:text-sm sm:leading-5"
                >
                  Save Section
                </span>
                <span
                  @click="deleteSection(index)"
                  class="inline-flex cursor-pointer justify-center w-auto px-4 py-2 text-base font-medium leading-6 text-red-700 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                >
                  Delete Section
                </span>
              </div>
            </div>
          </form>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <ul>
            <li @click="openModal()" class="text-indigo-700 text-sm cursor-pointer font-medium mb-2">Preview Interview</li>
            <li @click="addNewSection()" class="text-indigo-700 text-sm  cursor-pointer font-medium mb-2">Add New Section</li>
            <li @click="deleteInterview()" class="text-red-700 text-sm  cursor-pointer font-medium mb-2">Delete Interview</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Dialog :open="isOpen" class="relative z-50">
    <!-- The backdrop, rendered as a fixed sibling to the panel container -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <!-- Full-screen scrollable container -->
    <div class="fixed inset-0 overflow-y-auto p-4">
      <!-- Container to center the panel -->
      <div class="flex min-h-full items-center justify-center">
        <!-- The actual dialog panel -->
        <DialogPanel class="w-full max-w-sm rounded bg-white">
          <DialogTitle>Complete your order</DialogTitle>

          <!-- ... -->
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Dialog, DialogTitle, DialogDescription } from '@headlessui/vue'
import {
  MenuIcon,
  TrashIcon,
} from "@heroicons/vue/solid";

let showAddKit = ref(false);
let showEmptyKit = ref(true);

let sections = ref([]);
let isOpen = ref(false);

function toggleEmptyKit() {
  showEmptyKit.value = false;
  showAddKit.value = true;  
  
  let section = {
    title: "",
    skills: "",
  };

  sections.value.push(section);
}

function addNewSection() {
  let section = {
    title: "",
    skills: "",
  };
  sections.value.push(section);
}

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}

function saveSection(title, skills) {
  console.log(title, skills);
}

function deleteSection(index) {
  console.log(index);
  sections.value.pop(index);
  if (sections.value.length == 0) {
    showEmptyKit.value = true;    
    showAddKit.value = false;
  }
}

function deleteInterview() {
  sections.value = [];
    showEmptyKit.value = true;    
    showAddKit.value = false;
}


onMounted(() => {
  if (sections.value.length > 0) {
    showAddKit.value = true;
  }
});
</script>