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
            @click="navigate(step)"
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

      <div
        v-if="stepNo === 1"
        class="space-y-8 divide-y divide-gray-200 pt-6 pl-4 rounded-md border-0"
      >
        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <SideBar>
              <h3 class="text-lg font-bold leading-6 text-gray-900">
                Vacancy Title
              </h3>
              <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
              <p class="mt-1 text-xs text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
              <p class="mt-4 text-xs text-gray-500">
                Use common job titles for searchability
              </p>
              <p class="mt-4 text-xs text-gray-500">
                Advertise for just one job eg: Project Manager, not Project
                Manangers
              </p>
              <p class="mt-4 text-xs text-gray-500">
                No general opportunities or events
              </p>
            </SideBar>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form>
                <div class="shadow sm:rounded-md sm:overflow-hidden">
                  <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-6">
                        <label
                          for="title"
                          class="block text-sm font-medium text-gray-700"
                          >Title</label
                        >
                        <FormInput
                          v-model="jobDetail.title"
                          :error="v$.title.$error"
                          id="title"
                        ></FormInput>
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
                          for="department"
                          class="block text-sm font-medium text-gray-700"
                          >Department</label
                        >
                        <MultiSelect
                          searchable
                          v-model="jobDetail.department_id"
                          :options="departmentList"
                          placeholder="Select a department"
                        >
                        </MultiSelect>
                        <!-- <SelectInput2 placeholder="Select a department" :items="departmentList" :modelValue="jobDetail.department_id"></SelectInput2> -->
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="code"
                          class="block text-sm font-medium text-gray-700"
                          >Internal Code</label
                        >
                        <FormInput
                          v-model="jobDetail.code"
                          :error="v$.code.$error"
                          id="code"
                        ></FormInput>
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
              <h3 class="text-lg font-bold leading-6 text-gray-900">
                Location Information
              </h3>
              <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
              <p class="mt-1 text-xs text-gray-500">
                Use a specific, full location to attract the most candidates
              </p>
            </SideBar>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form>
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-6">
                        <label
                          for="country"
                          class="block text-sm font-medium text-gray-700"
                          >Country</label
                        >
                        <MultiSelect
                          required
                          searchable
                          id="country"
                          value="id"
                          label="name"
                          valueProp="id"
                          v-model="jobDetail.country_id"
                          :options="countries"
                          placeholder="Select a country"
                          @change="onCountryChanged"
                        >
                        </MultiSelect>
                        <!-- <SelectInput
                          placeholder="Select Country"
                          v-model="jobDetail.country_id"
                          :items="countryList"
                          id="country"
                          @change="onCountryChanged"
                        ></SelectInput> -->
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                        <label
                          for="state"
                          class="block text-sm font-medium text-gray-700"
                          >State</label
                        >
                        <MultiSelect
                          required
                          searchable
                          id="state"
                          value="id"
                          label="name"
                          valueProp="id"
                          :loading="loadingRegion"
                          v-model="jobDetail.region_id"
                          :options="countryStates"
                          placeholder="Select a state"
                        ></MultiSelect>
                        <!-- <SelectInput
                          placeholder="Select State"
                          v-model="jobDetail.region_id"
                          :items="countryStates"
                          id="state"
                        ></SelectInput> -->
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label
                          for="city"
                          class="block text-sm font-medium text-gray-700"
                          >City
                        </label>
                        <MultiSelect
                          required
                          searchable
                          id="city"
                          value="id"
                          label="name"
                          valueProp="id"
                          :loading="loadingCity"
                          v-model="jobDetail.city_id"
                          :options="cities"
                          placeholder="Select a city"
                        ></MultiSelect>
                        <!-- <SelectInput
                          placeholder="Select City"
                          v-model="jobDetail.city_id"
                          :items="cities"
                          id="city"
                        ></SelectInput> -->
                      </div>

                      <div class="col-span-6">
                        <label
                          for="street-address"
                          class="block text-sm font-medium text-gray-700"
                          >Street address</label
                        >
                        <FormInput
                          v-model="jobDetail.location"
                          name="location"
                          id="location"
                        ></FormInput>
                      </div>
                    </div>
                    <div class="flex items-start mt-6">
                      <div class="flex items-center h-5">
                        <input
                          @change="onRemoteChange"
                          id="comments"
                          name="comments"
                          type="checkbox"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700"
                          >JOB IS FULLY REMOTE</label
                        >
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
              <h3 class="text-lg font-bold leading-6 text-gray-900">
                Job Description
              </h3>
              <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
              <p class="mt-1 text-xs text-gray-500">
                Format into sections and lists to improve readability
              </p>
              <p class="mt-4 text-xs text-gray-500">
                Avoid targeting specific demographics e.g. gender, nationality
                and age
              </p>
              <p class="mt-4 text-xs text-gray-500">
                No need to add a link to apply (one is added automatically)
              </p>
            </SideBar>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form>
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-0 bg-white sm:p-6">
                    <div>
                      <label
                        for="about"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <div class="mt-1">
                        <QuillEditor 
                          theme="snow"
                          id="description"
                          name="description"
                          contentType="html"
                          placeholder="Describe job in detail here"
                          v-model:content="jobDetail.description"
                          class="h-32 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" />
                      </div>
                    </div>

                    <div class="mt-6">
                      <label
                        for="about"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Responsibilities
                      </label>
                      <div class="mt-1">
                        <QuillEditor
                          contentType="html"
                          v-model:content="jobDetail.responsibilities"
                          id="responsibilities"
                          name="responsibilities"
                          class="h-32 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="List job responsibilities"
                        />
                      </div>
                    </div>

                    <div class="mt-6">
                      <label
                        for="about"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Requirements
                      </label>
                      <div class="mt-1">
                        <QuillEditor
                          contentType="html"
                          v-model:content="jobDetail.requirements"
                          id="requirements"
                          name="requirements"
                          class="h-32 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="List job requirements"
                        />
                      </div>
                    </div>

                    <div class="mt-6">
                      <label
                        for="about"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Benefits
                      </label>
                      <div class="mt-1">
                        <QuillEditor
                          contentType="html"
                          v-model:content="jobDetail.benefits"
                          id="benefits"
                          name="benefits"
                          class="h-32 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="List job benefits"
                        />
                        <!-- <textarea id="about" name="about" rows="5" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="List job benefits" /> -->
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
              <h3 class="text-lg font-bold leading-6 text-gray-900">
                Employment Information
              </h3>
              <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
              <p class="mt-1 text-xs text-gray-500">
                Include as many details as possible to boost the job’s
                performance on some job boards
              </p>
              <p class="mt-4 text-xs text-gray-500">
                Include as many keywords as possible to increase searchability
              </p>
            </SideBar>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form>
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="jobFunction"
                          class="block text-sm font-medium text-gray-700"
                          >Job Function</label
                        >
                        <MultiSelect
                          required
                          searchable
                          value="id"
                          label="name"
                          valueProp="id"
                          id="jobFunction"
                          v-model="jobDetail.job_function_id"
                          :options="jobFunctions"
                          placeholder="Select job function"
                        ></MultiSelect>
                        <!-- <SelectInput
                          placeholder="Select job function"
                          v-model="jobDetail.job_function_id"
                          :items="jobFunctions"
                          id="jobFunction"
                        ></SelectInput> -->
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                        <label
                          for="employmentType"
                          class="block text-sm font-medium text-gray-700"
                          >Employment Type</label
                        >
                        <MultiSelect
                          searchable
                          value="id"
                          label="name"
                          valueProp="id"
                          id="employmentType"
                          placeholder="Select employment type"
                          v-model="jobDetail.employment_type_id"
                          :options="employmentTypes"
                        ></MultiSelect>
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label
                          for="experience"
                          class="block text-sm font-medium text-gray-700"
                          >Experience
                        </label>
                        <MultiSelect
                          searchable
                          value="id"
                          label="name"
                          valueProp="id"
                          id="experience"
                          placeholder="Select job experience"
                          v-model="jobDetail.experience_level_id"
                          :options="experienceLevels"
                        ></MultiSelect>
                        <!-- <SelectInput
                          placeholder="Select Experience"
                          v-model="jobDetail.experience_level_id"
                          :items="experienceLevels"
                          id="experience"
                        ></SelectInput> -->
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label
                          for="educationLevel"
                          class="block text-sm font-medium text-gray-700"
                          >Education
                        </label>                        
                        <MultiSelect
                          searchable
                          value="id"
                          label="name"
                          valueProp="id"
                          id="educationLevel"
                          placeholder="Select education level"
                          v-model="jobDetail.education_level_id"
                          :options="educationLevels"
                        ></MultiSelect>
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label
                          for="industry"
                          class="block text-sm font-medium text-gray-700"
                          >Industries
                        </label>
                        <!-- <SelectInput
                          placeholder="Select Industries"
                          v-model="jobDetail.industry_id"
                          :items="industries"
                          id="industry"
                        ></SelectInput> -->
                        <MultiSelect
                          searchable
                          value="id"
                          label="name"
                          valueProp="id"
                          id="industry"
                          placeholder="Select industries"
                          v-model="jobDetail.industry_id"
                          :options="industries"
                        ></MultiSelect>
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label
                          for="street-address"
                          class="block text-sm font-medium text-gray-700"
                          >Keywords</label
                        >
                        <TagInput @on-tags-changed="keywordsChange" v-model="jobDetail.keywords"></TagInput>
                        <!-- <FormInput
                          name="keywords"
                          id="keywords"
                          v-model="jobDetail.keywords"
                          placeholder="Keywords are comma separated"
                        ></FormInput> -->
                      </div>
                      <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                        <label
                          for="headcount"
                          class="block text-sm font-medium text-gray-700"
                          >Head Count</label
                        >
                        <NumberInput
                          type="number"
                          name="headcount"
                          id="headcount"
                          v-model="jobDetail.head_count"
                          class="mt-1"
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
              <h3 class="text-lg font-bold leading-6 text-gray-900">
                Salary Information
              </h3>
              <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
              <p class="mt-1 text-xs text-gray-500">
                Adding the salary here will improve performance on some job
                boards. You can also include the salary in the job description
              </p>
            </SideBar>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form>
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="min-offer"
                          class="block text-sm font-medium text-gray-700"
                          >Minimum Offer</label
                        >
                        <NumberInput
                          type="number"
                          name="min-offer"
                          id="min-offer"
                          v-model="jobDetail.salary_min"
                          class="mt-1"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                        <label
                          for="max-offer"
                          class="block text-sm font-medium text-gray-700"
                          >Maximum Offer</label
                        >
                        <NumberInput
                          type="number"
                          name="max-offer"
                          id="max-offer"
                          v-model="jobDetail.salary_max"
                          class="mt-1"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label
                          for="currency"
                          class="block text-sm font-medium text-gray-700"
                          >Currency
                        </label>
                        <MultiSelect
                          searchable
                          value="id"
                          label="name"
                          valueProp="id"
                          id="currency"
                          placeholder="Select a currency"
                          v-model="jobDetail.salary_currency_id"
                          :options="currencies"
                        ></MultiSelect>
                        <!-- <SelectInput
                          placeholder="Select Currency"
                          v-model="jobDetail.salary_currency_id"
                          :items="currencies"
                          id="currency"
                        ></SelectInput> -->
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
              <h3 class="text-lg font-bold leading-6 text-gray-900">
                Application Deadline
              </h3>
              <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
              <p class="mt-1 text-xs text-gray-500">
                Adding a deadline will automatically close applications on the
                set date
              </p>
            </SideBar>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form>
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-6">
                        <label
                          for="min-offer"
                          class="block text-sm font-medium text-gray-700"
                          >Deadline</label
                        >
                        <DateInput
                          type="date"
                          name="deadline"
                          id="deadline"
                          v-model="jobDetail.deadline"
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

        <div class="pt-5">
          <div class="flex justify-end">
            <CancelButton
              label="Cancel"
              class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ></CancelButton>
            <AppButton
              type="submit"
              label="Continue"
              @click="submitVacancyDetail"
              :processing="processing"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ></AppButton>
          </div>
        </div>
      </div>

      <ApplicationFormView
        :jobId="vacancyId"
        @prevPage="gotoPage(1)"
        @nextPage="gotoPage(3)"
        v-if="stepNo === 2"
      ></ApplicationFormView>

      <div
        v-if="stepNo === 3"
        class="space-y-8 divide-y divide-gray-200 bg-white p-6 mt-4 rounded-md border border-gray-300"
      >
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <WorkFlowView :interviewId="interviewId" :jobId="vacancyId" @prevPage="gotoPage(2)"></WorkFlowView>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted, watch, inject } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { CheckIcon } from "@heroicons/vue/solid";
import WorkFlowView from "./WorkFlowView.vue";
import ApplicationFormView from "./ApplicationFormView.vue";
import { useDepartments } from "../../stores/department";
import { useMiscellaneous } from "../../stores/miscellaneous";
import MiscService from "../../service/miscellaneous.service";
import VacancyService from "../../service/vacancies.service";

const jobDetail = ref({
  title: "",
  department_id: 0,
  code: "",
  country_id: "",
  region_id: "",
  city_id: "",
  isRemote: false,
  description: "",
  responsibilities: "",
  requirements: "",
  benefits: "",
  job_function_id: "",
  employment_type_id: "",
  experience_level_id: "",
  education_level_id: "",
  salary_currency_id: "",
  deadline: "",
  zip_code: "",
  location: "",
  industry_id: "",
  keywords: [],
  salary_min: "",
  salary_max: "",
  head_count: "",
});

const rules = {
  deadline: { required: helpers.withMessage("Deadline", required) },
  code: { required: helpers.withMessage("Internal Code", required) },
  title: { required: helpers.withMessage("Vacancy title", required) },
  description: { required: helpers.withMessage("Description", required) },
  department_id: { required: helpers.withMessage("Department", required) },
  salary_max: { required: helpers.withMessage("Maximum Salary", required) },
  salary_min: { required: helpers.withMessage("Minimum Salary", required) },
  requirements: { required: helpers.withMessage("Requirements", required) },
  salary_currency_id: { required: helpers.withMessage("Currency", required) },
};

const v$ = useVuelidate(rules, jobDetail);

const steps = ref([
  { id: 1, name: "Job details", href: "#", status: "current" },
  { id: 2, name: "Application form", href: "#", status: "upcoming" },
  { id: 3, name: "Workflow", href: "#", status: "upcoming" },
]);

const {
  countries,
  currencies,
  industries,
  jobFunctions,
  educationLevels,
  employmentTypes,
  experienceLevels,
} = storeToRefs(useMiscellaneous());

const { departments } = storeToRefs(useDepartments());
const toast = useToast();
const swal = inject("$swal");
// const router = useRouter();
const stepNo = ref(1);
const vacancyId = ref(0);
const interviewId = ref(0);
const cities = ref([]);
const jobKeywords = ref([]);
const countryStates = ref([]);
const departmentList = ref([]);
const processing = ref(false);
const loadingCity = ref(false);
const loadingRegion = ref(false);
// const samplePayload = {
//   benefits: "Competitive Salary",
//   city_id: "76932",
//   code: "SAL-556632",
//   country_id: 161,
//   deadline: "2022-07-04",
//   department_id: "11",
//   description: "Sales Representative",
//   education_level_id: "2",
//   employment_type_id: "2",
//   experience_level_id: "4",
//   head_count: "2",
//   industry_id: "29",
//   isRemote: false,
//   job_function_id: "37",
//   keywords: "sales, buy, sell",
//   location: "Alausa Ikeja",
//   region_id: "306",
//   requirements: "Sales Representative",
//   responsibilities: "Sales Representative",
//   salary_currency_id: "102",
//   salary_max: "125000",
//   salary_min: "75000",
//   title: "Sale Rep",
//   zip_code: "",
// }

function keywordsChange(items) {
  jobKeywords.value = items;
}

function onRemoteChange(evt) {
  jobDetail.value.isRemote = evt.target.checked;
}

function gotoPage(step) {
  stepNo.value = step;
  steps.value[step - 1].status = "current";

  steps.value[step - 2].status = "complete";
  steps.value[step].status = "upcoming";
}

function showErrorMessage(errorMessage) {
  swal({
    title: "Invalid Data",
    text: errorMessage,
    icon: "error",
  });
}

function showErrorMessages(errors) {
  var errorMessage = "";
  Object.keys(errors).forEach((key) => {
    errorMessage += `${errors[key][0]}\n`;
  });

  swal({
    title: "Invalid Data",
    text: errorMessage,
    icon: "error",
  });
}

async function submitVacancyDetail() {
  const valid = await v$.value.$validate();

  if (valid) {
    processing.value = true;
    if (vacancyId.value === 0) {
      if (jobKeywords.value.length > 0) {
        jobDetail.value.keywords = jobKeywords.value.join();
      }
      VacancyService.create(jobDetail.value)
        .then((result) => {
          const { data } = result.data;
          interviewId.value = data.interviews[0].id;
          vacancyId.value = data.id;
          gotoPage(2);
        })
        .catch((error) => {
          const { data } = error;
          if (data.code === "062") {
            showErrorMessages(data.data);
          } else {
            showErrorMessage(data.message);
          }
        })
        .finally(() => {
          processing.value = false;
        });
    }

    if (vacancyId.value > 0) {
      VacancyService.update(vacancyId.value, jobDetail.value)
        .then(() => {
          // const { data } = result.data;
          // vacancyId.value = data.id;
          gotoPage(2);
        })
        .catch((error) => {
          const { data } = error;
          if (data.code === "062") {
            showErrorMessages(data.data);
          } else {
            showErrorMessage(data.message);
          }
        })
        .finally(() => {
          processing.value = false;
        });
    }
  }

  if (!valid) {
    console.clear();
    let errorMessage = 'The following fields are required ';
    const errors = [];
    v$.value.$errors.forEach(error => {
      errors.push(error.$message);
    });

    errorMessage = `${errorMessage}${errors.join(", ")}`

    swal({
      title: "Invalid Data",
      text: errorMessage,
      icon: "error",
    });
  }
}

onMounted(() => {
  departmentList.value = departments.value.data.map((item) => {
    return { label: item.name, value: item.id };
  });
});

watch(
  () => jobDetail.value.region_id,
  (newValue) => {
    cities.value = [];
    const id = Number(newValue);
    loadingCity.value = true;
    MiscService.getCities(id).then((result) => {
      cities.value = result.data.data;
      // cityList.value = cities.value.map((item) => {
      //   return { label: item.name, value: item.id };
      // });
    }).finally(() => {
      loadingCity.value = false;
    });
  }
);

watch(
  () => jobDetail.value.country_id,
  (newValue) => {
    countryStates.value = [];
    const id = Number(newValue);
    loadingRegion.value = true;
    MiscService.getRegions(id).then((result) => {
      countryStates.value = result.data.data;
      // countryStateList.value = countryStates.value.map((item) => {
      //   return { label: item.name, value: item.id };
      // });
    }).finally(() => {
      loadingRegion.value = false;
    });
  }
);
</script>