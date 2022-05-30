<template>
  <main class="flex-1 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 mt-6 lg:px-6">
      <nav aria-label="Progress" class="bg-white">
        <ol
          role="list"
          class="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0"
        >
          <li
            v-for="(step, stepIdx) in steps"
            :key="step.name"
            class="relative md:flex-1 md:flex"
          >
            <a
              v-if="step.status === 'complete'"
              :href="step.href"
              class="group flex items-center w-full"
            >
              <span class="px-6 py-4 flex items-center text-sm font-medium">
                <span
                  class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800"
                >
                  <CheckIcon class="w-6 h-6 text-white" aria-hidden="true" />
                </span>
                <span class="ml-4 text-sm font-medium text-gray-900">{{
                  step.name
                }}</span>
              </span>
            </a>
            <a
              v-else-if="step.status === 'current'"
              :href="step.href"
              class="px-6 py-4 flex items-center text-sm font-medium"
              aria-current="step"
            >
              <span
                class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full"
              >
                <span class="text-indigo-600">{{ step.id }}</span>
              </span>
              <span class="ml-4 text-sm font-medium text-indigo-600">{{
                step.name
              }}</span>
            </a>
            <a v-else :href="step.href" class="group flex items-center">
              <span class="px-6 py-4 flex items-center text-sm font-medium">
                <span
                  class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400"
                >
                  <span class="text-gray-500 group-hover:text-gray-900">{{
                    step.id
                  }}</span>
                </span>
                <span
                  class="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900"
                  >{{ step.name }}</span
                >
              </span>
            </a>
            <template v-if="stepIdx !== steps.length - 1">
              <!-- Arrow separator for lg screens and up -->
              <div
                class="hidden md:block absolute top-0 right-0 h-full w-5"
                aria-hidden="true"
              >
                <svg
                  class="h-full w-full text-gray-300"
                  viewBox="0 0 22 80"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 -2L20 40L0 82"
                    vector-effect="non-scaling-stroke"
                    stroke="currentcolor"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </template>
          </li>
        </ol>
      </nav>

      <form
        class="space-y-8 divide-y divide-gray-200 bg-white p-6 mt-4 rounded-md border border-gray-300"
      >
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Job title and Department details
              </h3>
              <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p> -->
            </div>

            <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div
                class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  for="jobtitle"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Job Title
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <div class="max-w-lg flex rounded-md shadow-sm">
                    <FormInput
                      type="text"
                      id="jobtitle"
                      name="jobtitle"
                      class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    ></FormInput>
                  </div>
                </div>
              </div>
              <div
                class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  for="department"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >Department</label
                >
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <div class="max-w-lg flex rounded-md shadow-sm">
                    <SelectInput
                      :items="[
                        { name: 'Account', id: 'account' },
                        { name: 'Human Resources', id: 'hr' },
                      ]"
                      id="department"
                      name="department"
                    ></SelectInput>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Location
              </h3>
            </div>
            <div class="space-y-6 sm:space-y-5">
              <div
                class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  for="country"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Country
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <SelectInput
                    v-model="selectedCountry"
                    :items="countries"
                  ></SelectInput>
                </div>
              </div>

              <div
                class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  for="city"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  City
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5"
          >
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Job Description
              </h3>
              <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">We'll always let you know about important changes, but you pick what else you want to hear about.</p> -->
            </div>
            <div class="space-y-6 sm:space-y-5">
              <div
                class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Description
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <TextArea cols="4"></TextArea>
                  <!-- <ckeditor :config="editorConfig"></ckeditor> -->
                </div>
              </div>
            </div>
          </div>
          
          <div
            class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5"
          >
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Job Function
              </h3>
              <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">We'll always let you know about important changes, but you pick what else you want to hear about.</p> -->
            </div>
            <div class="space-y-6 sm:space-y-5">
              <div
                class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  for="jobfunction"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Select Job Function
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <SelectInput id="jobfunction"></SelectInput>
                </div>
              </div>
            </div>
          </div>

          <div
            class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5"
          >
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Employment Details
              </h3>
              <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">We'll always let you know about important changes, but you pick what else you want to hear about.</p> -->
            </div>
            <div class="space-y-6 sm:space-y-5">
              <div
                class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  for="empType"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Employment Type
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <SelectInput id="empType"></SelectInput>
                </div>
              </div>
              <div
                class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  for="experience"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Experience
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <SelectInput id="experience"></SelectInput>
                </div>
              </div>
              <div
                class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  for="education"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Education
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <SelectInput id="education"></SelectInput>
                </div>
              </div>
            </div>
          </div>

          <div
            class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5"
          >
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Annual Salary
              </h3>
              <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">We'll always let you know about important changes, but you pick what else you want to hear about.</p> -->
            </div>
            <div class="space-y-6 sm:space-y-5">
              <div
                class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  for="startSalary"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  From
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <FormInput id="startSalary"></FormInput>
                </div>
              </div>
              <div
                class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  for="toSalary"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  To
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <FormInput id="toSalary"></FormInput>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <CancelButton
              label="Cancel"
              class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ></CancelButton>
            <AppButton
              type="submit"
              label="Save"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ></AppButton>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import { CheckIcon } from "@heroicons/vue/solid";

const selectedCountry = ref({});

const steps = [
  { id: "01", name: "Job details", href: "#", status: "complete" },
  { id: "02", name: "Application form", href: "#", status: "current" },
  { id: "03", name: "Preview", href: "#", status: "upcoming" },
];

const countries = [
  { id: "01", name: "Nigeria" },
  { id: "02", name: "Ghana" },
  { id: "03", name: "South Africa" },
];

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

const editorConfig = {
  toolbar: [
    [
      "Format",
      "Bold",
      "Italic",
      "BulletedList",
      "NumberedList",
      "Link",
      "Maximize",
    ],
  ],
};
</script>
