<template>
  <main class="flex-1 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 mt-6 lg:px-6">
      <nav
        aria-label="Progress"
        class="bg-white"
      >
        <ol
          role="list"
          class="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0"
        >
          <li
            v-for="(step, stepIdx) in steps"
            :key="step.name"
            class="relative md:flex-1 md:flex"
            @click="navigate(step)"
          >
            <a
              v-if="step.status === 'complete'"
              :href="step.href"
              class="group flex items-center w-full"
            >
              <span class="px-6 py-4 flex items-center text-sm font-medium">
                <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                  <CheckIcon
                    class="w-6 h-6 text-white"
                    aria-hidden="true"
                  />
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
              <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
                <span class="text-indigo-600">{{ step.id }}</span>
              </span>
              <span class="ml-4 text-sm font-medium text-indigo-600">{{
                step.name
              }}</span>
            </a>
            <a
              v-else
              :href="step.href"
              class="group flex items-center"
            >
              <span class="px-6 py-4 flex items-center text-sm font-medium">
                <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                  <span class="text-gray-500 group-hover:text-gray-900">{{
                    step.id
                  }}</span>
                </span>
                <span class="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{{ step.name }}</span>
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

      <div
        v-if="stepNo === 1"
        class="space-y-8 divide-y divide-gray-200 pt-6 pl-4 rounded-md border-0"
      >
        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <SideBar>
              <h3 class="text-lg font-bold leading-6 text-gray-900">Vacancy Title</h3>
              <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
              <p class="mt-1 text-xs text-gray-500">This information will be displayed publicly so be careful what you share.</p>
              <p class="mt-4 text-xs text-gray-500">Use common job titles for searchability</p>
              <p class="mt-4 text-xs text-gray-500">Advertise for just one job eg: Project Manager, not Project Manangers</p>
              <p class="mt-4 text-xs text-gray-500">No general opportunities or events</p>
            </SideBar>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form
                action="#"
                method="POST"
              >
                <div class="shadow sm:rounded-md sm:overflow-hidden">
                  <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-6">
                        <label
                          for="title"
                          class="block text-sm font-medium text-gray-700"
                        >Title</label>
                        <FormInput :error="v$.title.$error" id="title"></FormInput>
                        <!-- <input
                          type="text"
                          name="job-title"
                          id="first-name"
                          autocomplete="job-title"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        /> -->
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="first-name"
                          class="block text-sm font-medium text-gray-700"
                        >Select Department</label>
                        <SelectInput
                          :items="[
                            { name: 'Account', id: 1 },
                            { name: 'Human Resources', id: 2 },
                            { name: 'Marketing', id: 3 },
                            { name: 'Sales', id: 4 },
                            { name: 'Support', id: 5 },
                          ]"
                          id="department"
                          name="department"
                          class="mt-1"
                        ></SelectInput>
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="last-name"
                          class="block text-sm font-medium text-gray-700"
                        >Internal Code</label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autocomplete="family-name"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
       
        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6 pt-8">
            <SideBar>
                <h3 class="text-lg font-bold leading-6 text-gray-900">Location Information</h3>
                <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
                <p class="mt-1 text-xs text-gray-500">Use a specific, full location to attract the most candidates</p>
            </SideBar>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form
                action="#"
                method="POST"
              >
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      
                      <div class="col-span-6 sm:col-span-6">
                        <label
                          for="country"
                          class="block text-sm font-medium text-gray-700"
                        >Country</label>
                        <select
                          id="country"
                          name="country"
                          autocomplete="country-name"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Nigeria</option>
                          <option>Ghana</option>
                          <option>Togo</option>
                        </select>
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                        <label
                          for="city"
                          class="block text-sm font-medium text-gray-700"
                        >State</label>
                        <select
                          id="country"
                          name="country"
                          autocomplete="country-name"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Lagos</option>
                          <option>Abuja</option>
                          <option>Ogun</option>
                          <option>Delta</option>
                        </select>
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label
                          for="region"
                          class="block text-sm font-medium text-gray-700"
                        >City </label>
                        
                        <select
                          id="country"
                          name="country"
                          autocomplete="country-name"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Victoria Island</option>
                          <option>Asaba</option>
                          <option>Ogara</option>
                          <option>Delta</option>
                        </select>
                      </div>

                      <div class="col-span-6">
                        <label
                          for="street-address"
                          class="block text-sm font-medium text-gray-700"
                        >Street address</label>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autocomplete="street-address"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div class="flex items-start mt-6">
                      <div class="flex items-center h-5">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          for="comments"
                          class="font-medium text-gray-700"
                        >JOB IS FULLY REMOTE</label>
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6 pt-8">
            <SideBar>
              <h3 class="text-lg font-bold leading-6 text-gray-900">Job Description</h3>
              <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
              <p class="mt-1 text-xs text-gray-500">Format into sections and lists to improve readability</p>
              <p class="mt-4 text-xs text-gray-500">Avoid targeting specific demographics e.g. gender, nationality and age</p>
              <p class="mt-4 text-xs text-gray-500">No need to add a link to apply (one is added automatically)</p>
            </SideBar>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form
                action="#"
                method="POST"
              >
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-0 bg-white sm:p-6">
                    <div>
                      <label for="about" class="block text-sm font-medium text-gray-700"> Description </label>
                      <div class="mt-1">
                        <!-- <ckeditor :editor="editor" v-model="description" :config="editorConfig"></ckeditor> -->
                        <textarea id="about" name="about" rows="5" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Describe job in detail here" />
                      </div>
                    </div>

                    <div class="mt-6">
                      <label for="about" class="block text-sm font-medium text-gray-700"> Responsibilities </label>
                      <div class="mt-1">
                        <textarea id="about" name="about" rows="5" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="List job responsibilities" />
                      </div>
                    </div>

                    <div class="mt-6">
                      <label for="about" class="block text-sm font-medium text-gray-700"> Requirements </label>
                      <div class="mt-1">
                        <textarea id="about" name="about" rows="5" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="List job requirements" />
                      </div>
                    </div>

                    <div class="mt-6">
                      <label for="about" class="block text-sm font-medium text-gray-700"> Benefits </label>
                      <div class="mt-1">
                        <textarea id="about" name="about" rows="5" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="List job benefits" />
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6 pt-8">
            <SideBar>
              <h3 class="text-lg font-bold leading-6 text-gray-900">Employment Information</h3>
              <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
              <p class="mt-1 text-xs text-gray-500">Include as many details as possible to boost the job’s performance on some job boards</p>
              <p class="mt-4 text-xs text-gray-500">Include as many keywords as possible to increase searchability</p>
            </SideBar>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form
                action="#"
                method="POST"
              >
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="country"
                          class="block text-sm font-medium text-gray-700"
                        >Job Function</label>
                        <select
                          id="job-function"
                          name="job-function"
                          autocomplete="job-function"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Product Management</option>
                          <option>Project Management</option>
                          <option>Facility Manager</option>
                        </select>
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                        <label
                          for="city"
                          class="block text-sm font-medium text-gray-700"
                        >Employment Type</label>
                        <select
                          id="employment-type"
                          name="employment-type"
                          autocomplete="employment-type"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Contract</option>
                          <option>Temporary</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label
                          for="region"
                          class="block text-sm font-medium text-gray-700"
                        >Experience </label>
                        
                        <select
                          id="experience"
                          name="experience"
                          autocomplete="experience"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Not Applicable</option>
                          <option>Internship</option>
                          <option>Entry Level</option>
                          <option>Associate</option>
                          <option>Mid Level</option>
                        </select>
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label
                          for="region"
                          class="block text-sm font-medium text-gray-700"
                        >Education </label>
                        
                        <select
                          id="experience"
                          name="experience"
                          autocomplete="experience"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Not Applicable</option>
                          <option>High School</option>
                          <option>Certification</option>
                          <option>Vocational</option>
                          <option>Associate Degree</option>
                        </select>
                      </div>
                      
                      <div class="col-span-6">
                        <label
                          for="street-address"
                          class="block text-sm font-medium text-gray-700"
                        >Keywords</label>
                        <input
                          type="text"
                          name="keywords"
                          id="keywords"
                          autocomplete="keywords"
                          placeholder="Keywords are comma separated"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6 pt-8">
            <SideBar>
              <h3 class="text-lg font-bold leading-6 text-gray-900">Salary Information</h3>
              <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
              <p class="mt-1 text-xs text-gray-500">Adding the salary here will improve performance on some job boards. You can also include the salary in the job description</p>
            </SideBar>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form
                action="#"
                method="POST"
              >
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="min-offer"
                          class="block text-sm font-medium text-gray-700"
                        >Minimum Offer</label>
                         <input
                          type="number"
                          name="min-offer"
                          id="min-offer"
                          autocomplete="min-offer"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                        <label
                          for="max-offer"
                          class="block text-sm font-medium text-gray-700"
                        >Maximum Offer</label>
                        <input
                          type="number"
                          name="max-offer"
                          id="max-offer"
                          autocomplete="max-offer"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label
                          for="currency"
                          class="block text-sm font-medium text-gray-700"
                        >Currency </label>
                        
                        <select
                          id="currency"
                          name="currency"
                          autocomplete="currency"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Naira</option>
                          <option>US Dollars</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6 pt-8">
            <SideBar>
              <h3 class="text-lg font-bold leading-6 text-gray-900">Application Deadline</h3>
              <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
              <p class="mt-1 text-xs text-gray-500">Adding a deadline will automatically close applications on the set date</p>
            </SideBar>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form
                action="#"
                method="POST"
              >
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      
                      <div class="col-span-6 sm:col-span-6">
                        <label
                          for="min-offer"
                          class="block text-sm font-medium text-gray-700"
                        >Deadline</label>
                         <input
                          type="date"
                          name="min-offer"
                          id="min-offer"
                          autocomplete="min-offer"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    
                  </div>
                </div>
              </form>
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
              label="Continue"
              @click="gotoPage(2)"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ></AppButton>
          </div>
        </div>
      </div>

      <ApplicationFormView
        @prevPage="gotoPage(1)"
        @nextPage="gotoPage(3)"
        v-if="stepNo === 2"
      ></ApplicationFormView>
      
      <div
        v-if="stepNo === 3"
        class="space-y-8 divide-y divide-gray-200 bg-white p-6 mt-4 rounded-md border border-gray-300"
      >
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <WorkFlowView @prevPage="gotoPage(2)"></WorkFlowView>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { CheckIcon } from "@heroicons/vue/solid";
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import WorkFlowView from "./WorkFlowView.vue";
import ApplicationFormView from "./ApplicationFormView.vue";

const jobDetail = ref({
  title: '',
  departmentId: '',
  internalCode: '',
  countryId: '',
  countryStateId: '',
  cityId: '',
  streetAddress: '',
  isRemote: false,
  description: '',
  responsibilities: '',
  requirements: '',
  benefits: '',
  jobFunctionId: '',
  employmentTypeId: '',
  experienceId: '',
  educationId: '',
  minimumOffer: '',
  maximumOffer: '',
  currencyId: '',
  deadline: '',
});

const rules = {
  title: { required },
  departmentId: { required },
  internalCode: { required },
  countryId: { required },
  countryStateId: { required },
}

const v$ = useVuelidate(rules, jobDetail);

const steps = [
  { id: 1, name: "Job details", href: "#", status: "current" },
  { id: 2, name: "Application form", href: "#", status: "upcoming" },
  { id: 3, name: "Workflow", href: "#", status: "upcoming" },
];

const stepNo = ref(1);
// const editor = ClassicEditor;
// const description = ref("");
// const editorConfig = {
//   toolbar: {
//     items: [
//       'heading',
//       'bold',
//       'italic',
//       '|',
//       'undo',
//       'redo',
//       'list'
//     ]
//   }
// }

async function gotoPage(value) {
  const valid = await v$.value.$validate();
  // if (valid) {
  stepNo.value = value;
  steps[value].status = "current";

  steps[value - 1].status = "complete";
  steps[value + 1].status = "upcoming";
  // }
}
</script>
