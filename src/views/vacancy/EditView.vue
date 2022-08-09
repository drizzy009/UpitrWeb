<template>
  <main class="flex-1 pb-8">
    <div class="px-4 mx-auto mt-6 max-w-7xl sm:px-6 lg:px-6">
      <nav aria-label="Progress" class="bg-white">
        <ol
          role="list"
          class="border border-gray-300 divide-y divide-gray-300 rounded-md md:flex md:divide-y-0"
        >
          <li
            v-for="(step, stepIdx) in steps"
            :key="step.name"
            class="relative md:flex-1 md:flex"
            @click="gotoPage(step.id)"
          >
            <a
              v-if="step.status === 'complete'"
              :href="step.href"
              class="flex items-center w-full group"
            >
              <span class="flex items-center px-6 py-4 text-sm font-medium">
                <span
                  class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full group-hover:bg-indigo-800"
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
              class="flex items-center px-6 py-4 text-sm font-medium"
              aria-current="step"
            >
              <span
                class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-indigo-600 rounded-full"
              >
                <span class="text-indigo-600">{{ step.id }}</span>
              </span>
              <span class="ml-4 text-sm font-medium text-indigo-600">{{
                step.name
              }}</span>
            </a>
            <a v-else :href="step.href" class="flex items-center group">
              <span class="flex items-center px-6 py-4 text-sm font-medium">
                <span
                  class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-gray-300 rounded-full group-hover:border-gray-400"
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
                class="absolute top-0 right-0 hidden w-5 h-full md:block"
                aria-hidden="true"
              >
                <svg
                  class="w-full h-full text-gray-300"
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
        class="pt-6 pl-4 space-y-8 border-0 divide-y divide-gray-200 rounded-md"
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
                  <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
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
                          class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        /> -->
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="department"
                          class="block text-sm font-medium text-gray-700"
                          >Department</label>
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
                  <div class="px-4 py-3 text-right bg-gray-50 sm:px-6"></div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="pt-8 md:grid md:grid-cols-3 md:gap-6">
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
                <div class="overflow-hidden shadow sm:rounded-md">
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
                          class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700"
                          >JOB IS FULLY REMOTE</label
                        >
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 text-right bg-gray-50 sm:px-6"></div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="pt-8 md:grid md:grid-cols-3 md:gap-6">
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
                <div class="overflow-hidden shadow sm:rounded-md">
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
                          ref="description"
                          id="description"
                          name="description"
                          contentType="html"
                          placeholder="Describe job in detail here"
                          v-model:content="jobDetail.description"
                          class="block w-full h-32 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
                          ref="responsibilities"
                          contentType="html"
                          v-model:content="jobDetail.responsibilities"
                          id="responsibilities"
                          name="responsibilities"
                          class="block w-full h-32 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                          ref="requirements"
                          contentType="html"
                          v-model:content="jobDetail.requirements"
                          id="requirements"
                          name="requirements"
                          class="block w-full h-32 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                          ref="benefit"
                          contentType="html"
                          v-model:content="jobDetail.benefit"
                          id="benefit"
                          name="benefit"
                          class="block w-full h-32 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="List job benefit"
                        />
                        <!-- <textarea id="about" name="about" rows="5" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="List job benefit" /> -->
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 text-right bg-gray-50 sm:px-6"></div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="pt-8 md:grid md:grid-cols-3 md:gap-6">
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
                <div class="overflow-hidden shadow sm:rounded-md">
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
                        <MultiSelect
                          searchable
                          mode="tags"
                          v-model="jobKeywords"
                          placeholder="add keywords"
                          label="name"
                          :options="jobKeywords"
                          :create-option="true"
                        ></MultiSelect>
                        <!-- <TagInput @on-tags-changed="keywordsChange" :tags="jobDetail.keywords"></TagInput> -->
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
                  <div class="px-4 py-3 text-right bg-gray-50 sm:px-6"></div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="pt-8 md:grid md:grid-cols-3 md:gap-6">
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
                <div class="overflow-hidden shadow sm:rounded-md">
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
                  <div class="px-4 py-3 text-right bg-gray-50 sm:px-6"></div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="pt-8 md:grid md:grid-cols-3 md:gap-6">
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
                <div class="overflow-hidden shadow sm:rounded-md">
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
                          class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 text-right bg-gray-50 sm:px-6"></div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <CancelButton
              label="Cancel"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ></CancelButton>
            <AppButton
              type="submit"
              label="Save"
              @click="submitVacancyDetail"
              :processing="processing"
              class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ></AppButton>
            <AppButton
              type="submit"
              label="Next"
              @click="gotoPage(2)"
              class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ></AppButton>
          </div>
        </div>
      </div>

      <ApplicationFormView
        :jobId="vacancyId"
        :existingQuestions="vacancyDetail.job_questions"
        :settingsId="settingsId"
        :vacancySettings="vacancySettings"
        @prevPage="gotoPage(1)"
        @nextPage="gotoPage(3)"
        v-if="stepNo === 2"
      ></ApplicationFormView>

      <div
        v-if="stepNo === 3"
        class="p-6 mt-4 space-y-8 bg-white border border-gray-300 divide-y divide-gray-200 rounded-md"
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
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { CheckIcon } from "@heroicons/vue/solid";
import WorkFlowView from "./WorkFlowView.vue";
import ApplicationFormView from "./ApplicationFormView.vue";
import { useDepartments } from "../../stores/department";
import { useMiscellaneous } from "../../stores/miscellaneous";
import MiscService from "../../service/miscellaneous.service";
import VacancyService from "../../service/vacancies.service";
import { FormatDate } from "../../util/Formatter";

const props = defineProps({
  id: Number
});

// const appStore = useAppStore();
// const { pageTitle } = storeToRefs(useAppStore());
const { departments } = storeToRefs(useDepartments());
const {
  countries,
  currencies,
  industries,
  jobFunctions,
  educationLevels,
  employmentTypes,
  experienceLevels,
} = storeToRefs(useMiscellaneous());

const swal = inject("$swal");
const $loading = inject("$loading");


const vacancySettings = ref(null);
const settingsId = ref(0);
const vacancyDetail = ref({});
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
  benefit: "",
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

const benefit = ref(null);
const description = ref(null);
const requirements = ref(null);
const responsibilities = ref(null);
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
    if (vacancyId.value > 0) {
      processing.value = true;
      if (jobKeywords.value.length > 0) {
        jobDetail.value.keywords = jobKeywords.value.join();
      }
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

  const loader = $loading.show();
  VacancyService.single(Number(props.id)).then(result => {
    const { data } = result.data;
    vacancyDetail.value = data;
    jobDetail.value.department_id = data.department.id;
    jobDetail.value.country_id = data.city.region.country.id;
    jobDetail.value.region_id = data.city.region.id;
    jobDetail.value.city_id = data.city.id;
    jobDetail.value.job_function_id = data.job_function.id;
    jobDetail.value.employment_type_id = data.employment_type.id;
    jobDetail.value.experience_level_id = data.experience_level.id;
    jobDetail.value.education_level_id = data.education_level.id;
    jobDetail.value.industry_id = data.industry.id;
    jobDetail.value.salary_currency_id = data.currency.id;
    jobDetail.value.deadline = FormatDate(data.deadline, "YYYY-MM-DD");
    jobDetail.value.code = data.code;
    jobDetail.value.title = data.title;
    jobDetail.value.location = data.location;
    jobDetail.value.keywords = data.keywords.split(',');
    jobDetail.value.head_count = data.head_count;
    jobDetail.value.salary_min = data.salary_min;
    jobDetail.value.salary_max = data.salary_max;
    jobKeywords.value = jobDetail.value.keywords;

    vacancyId.value = data.id;
    benefit.value.setHTML(data.benefit || '');
    description.value.setHTML(data.description || '');
    requirements.value.setHTML(data.requirements || '');
    responsibilities.value.setHTML(data.responsibilities || '');


    // appStore.setPageTitle(`Edit Vacancy - ${jobDetail.value.title}`);
    
    if ("job_settings" in data) {
      if (data.job_settings !== null) {
        vacancySettings.value = data.job_settings;
        settingsId.value = data.job_settings.id;
      }
    }

    if ("interviews" in data) {
      interviewId.value = data.interviews[0].id;
    }
  }).catch((error) => {
    console.error(error);
    let errorMessage = "Something went wrong, please try again later";
    if (error.status === 404) {
      errorMessage = "Vacancy information does not exist";
    }

    swal({
      title: "Not found",
      text: errorMessage,
      icon: "error",
    });
  }).finally(() => {
    loader.hide();
  })
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
