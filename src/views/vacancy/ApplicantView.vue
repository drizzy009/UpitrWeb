<template>
  <ul
    role="list"
    class="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
  >
    <li v-for="applicant in applicants" :key="applicant.email">
      <div class="block group">
        <div class="flex items-center px-4 py-5 sm:py-6 sm:px-0">
          <div class="flex items-center flex-1 min-w-0">
            <div class="flex items-center h-5">
              <input type="checkbox" @change="onChanged" v-model="applicant.checked" class="w-4 h-4 mr-3 text-indigo-600 border-gray-300 rounded hover:cursor-pointer focus:ring-indigo-500" />
            </div>
            <div class="flex-shrink-0">
              <UserCircleIcon
                v-if="applicant.candidate.photo === null"
                class="w-12 h-12 text-gray-400 rounded-full cursor-auto group-hover:opacity-75"
              ></UserCircleIcon>
              <img
                v-if="applicant.candidate.photo !== null"
                class="w-12 h-12 rounded-full group-hover:opacity-75"
                :src="applicant.candidate.photo"
                alt=""
              />
            </div>
            <div class="flex-1 min-w-0 px-4 md:grid md:grid-cols-4 md:gap-2">
              <div>
                <p class="text-sm font-medium text-indigo-600 truncate">
                  {{ applicant.candidate.firstname }} {{ applicant.candidate.lastname }} {{ applicant.candidate.middlename }}
                </p>
                <p class="flex items-center mt-2 text-sm text-gray-500">
                  <MailIcon
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span class="truncate">{{ applicant.candidate.email }}</span>
                </p>
              </div>              
              <div class="hidden md:block">
                <div>
                  <p class="text-sm text-gray-900">
                    {{applicant.candidate.gender_id === 0 ? 'Female': 'Male'}}
                  </p>
                  <p class="mt-2 text-sm text-gray-900">
                    {{FormatAge(applicant.candidate.dob)}} years old
                  </p>
                </div>
              </div>              
              <div class="hidden md:block">
                <div>
                  <p class="text-sm text-gray-900">
                    Applied on
                    {{ " " }}
                    {{formatAppDate(applicant.candidate.created_at)}}
                  </p>
                  <p class="flex items-center mt-2 text-sm text-gray-500">
                    {{applicant.candidate.city.name}}, {{applicant.candidate.city.region.name}}
                  </p>
                </div>
              </div>
              <div>
                <p class="text-sm truncate">
                  Current Stage: <span class="font-medium">{{ applicant.job_workflow_stage.name }}</span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <span v-tooltip="'View applicant\'s detail'" class="cursor-pointer" @click="gotoDetailPage(applicant.id)">
              <ChevronRightIcon
                class="w-5 h-5 text-gray-400 group-hover:text-gray-700"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import {
  MailIcon,
  UserCircleIcon,
  ChevronRightIcon,
} from "@heroicons/vue/solid";
import { useRouter } from "vue-router";
import { FormatAge, FormatLongDate2 } from '../../util/Formatter';
const props = defineProps({
  applicants: Array,
  vacancyId: String,
  interviewId: String,
});

const router = useRouter();
const emits = defineEmits(['selected']);

function formatAppDate(dateValue) {
  return FormatLongDate2(dateValue);
}

function onChanged() {
  const checkedApplicants = props.applicants.filter(applicant => applicant.checked === true);
  emits('selected', checkedApplicants);
}

function gotoDetailPage(applicantid) {
  router.push({ name: 'ApplicantDetail', params: {id: applicantid, interviewId: props.interviewId}});
}
</script>

<style></style>
