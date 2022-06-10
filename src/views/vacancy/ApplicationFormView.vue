<template>
  <div>
    <div
      v-for="section in data"
      :key="section.sectionName"
      class="mt-10 sm:mt-0 space-y-8 divide-y divide-gray-200 pb-8 border-b-2 border-b-gray-200"
    >
      <div class="md:grid md:grid-cols-3 md:gap-6 pt-8">
        <SideBar>
          <h3 class="text-lg font-bold leading-6 text-gray-900">
            {{ section.sectionName }}
          </h3>
          <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
          <p class="mt-1 text-xs text-gray-500">
            {{ section.description }}
          </p>
        </SideBar>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div
                  v-for="item in section.fields"
                  :key="item.name"
                  class="col-span-6 sm:col-span-6"
                >
                  <label
                    for="names"
                    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >{{ item.name }}</label
                  >
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <RadioGroup v-model="item.model" class="mt-2">
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
                              active
                                ? 'ring-2 ring-offset-2 ring-green-500'
                                : '',
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
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 sm:mt-0 divide-y divide-gray-200 pb-8 border-b-2 border-b-gray-200">
      <div class="md:grid md:grid-cols-3 md:gap-6 pt-8">
        <SideBar>
          <h3 class="text-lg font-bold leading-6 text-gray-900">
            Other Questions
          </h3>
          <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
          <p class="mt-1 text-xs text-gray-500">
            Add other questions to the section
          </p>
        </SideBar>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-3 bg-white sm:p-6">
              <div class="grid grid-cols-12 gap-6">
                <div
                  v-for="q in questions"
                  :key="q.question"
                  :value="q.questionType"
                  class="shadow rounded-lg p-4 col-span-12 border border-gray-300"
                >
                  <h3 class="font-bold">{{ q.questionType }}</h3>
                  <p>{{ q.question }}</p>
                </div>
              </div>
              <div class="mt-10 sm:mt-0" v-if="questionPanel == true">
                <div class="md:grid md:grid-cols-3 md:gap-6 pt-8 mb-4">
                  <div class="mt-5 md:mt-0 md:col-span-3">
                    <form>
                      <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-gray-100 sm:p-6 shadow">
                          <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-6">
                              <label
                                for="question-type"
                                class="block text-sm font-medium text-gray-700"
                                >Question Type</label
                              >
                              <select
                                id="question-type"
                                name="question-type"
                                v-model="questionType"
                                autocomplete="question-type"
                                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option>Paragraph</option>
                                <option>Short Answer</option>
                                <option>Yes/No</option>
                                <option>Dropdown</option>
                                <option>Multiple Choice</option>
                                <option>Date</option>
                                <option>Number</option>
                              </select>
                            </div>
                            <div class="col-span-6 sm:col-span-6">
                              <label
                                for="question"
                                class="block text-sm font-medium text-gray-700"
                                >Question</label
                              >
                              <div class="mt-1">
                                <textarea
                                  id="question"
                                  v-model="question"
                                  name="question"
                                  rows="5"
                                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                  placeholder="List job responsibilities"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-100 text-right sm:px-6">
                          <span
                            @click="addQuestion()"
                            class="inline-flex cursor-pointer justify-center w-auto px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 sm:text-sm sm:leading-5"
                          >
                            Add Question
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50  sm:px-6">
              <button
                  v-if="questionPanel == false"
                  type="button"
                  class="inline-flex text-sm leading-4 font-medium rounded text-indigo-700 px-4 py-3 focus:outline-none"
                  @click="
                    questionPanel == true
                      ? (questionPanel = false)
                      : (questionPanel = true)
                  "
                >
                  <PlusSmIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                  Add Questions
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5 space-y-8 divide-y divide-gray-200">
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

const data = ref(applicationData);
const questionPanel = ref(false);

var questions = ref([]);

var question = ref("");
var questionType = ref("");

function addQuestion() {
  var currentQuestion = {
    question: question.value,
    questionType: questionType.value,
  };

  questions.value.push(currentQuestion);
  questionPanel.value = !questionPanel.value;
  // questionPanel.value == true
  //   ? (questionPanel.value = false)
  //   : (questionPanel.value = true);
}

</script>

<style></style>
