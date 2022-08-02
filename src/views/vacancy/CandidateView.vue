<template>
  <ul
    role="list"
    class="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
  >
    <li v-for="(person, index) in serverData.data" :key="person.id">
      <div class="block group">
        <div class="flex items-center px-4 py-5 sm:py-6 sm:px-0">
          <div class="flex items-center flex-1 min-w-0">
            <div>
              <span class="inline-flex px-2 text-xs font-semibold">{{ (index + 1) + (serverData.current_page - 1) * serverData.per_page }}</span>
            </div>
            <div class="flex-shrink-0">
              <UserCircleIcon
                v-if="person.candidate.photo === null"
                class="w-12 h-12 text-gray-400 rounded-full cursor-auto group-hover:opacity-75"
              ></UserCircleIcon>
              <img
                v-if="person.candidate.photo !== null"
                class="w-12 h-12 rounded-full group-hover:opacity-75"
                :src="person.candidate.photo"
                alt=""
              />
            </div>
            <div class="flex-1 min-w-0 px-4 md:grid md:grid-cols-4 md:gap-1">
              <div>
                <p class="text-sm font-medium text-indigo-600 truncate">
                  {{ person.candidate.firstname }} {{ person.candidate.lastname }}
                </p>
                <p class="flex items-center mt-2 text-sm text-gray-500">
                  <MailIcon
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span class="truncate">{{ person.candidate.email }}</span>
                </p>
              </div>
              <div class="hidden md:block">
                <div>
                  <p class="text-sm text-gray-900">
                    {{person.candidate.job_function.name}} in
                  </p>
                  <p class="mt-2 text-sm text-gray-900">
                    {{person.candidate.industry.name}} with {{person.candidate.years_of_experience}} years of experience
                  </p>
                </div>
              </div>
              <div class="hidden md:block">
                <div>
                  <p class="text-sm text-gray-900">
                    {{person.candidate.gender_id === 0 ? 'Female': 'Male'}}
                  </p>
                  <p class="mt-2 text-sm text-gray-900">
                    {{FormatAge(person.candidate.dob)}} years old
                  </p>
                </div>
              </div>
              <div class="hidden md:block">
                <div>
                  <p class="text-sm text-gray-900">
                    Applied on
                    {{ " " }}
                    {{formatAppDate(person.candidate.created_at)}}
                  </p>
                  <p class="flex items-center mt-2 text-sm text-gray-500">
                    {{person.candidate.city.name}}, {{person.candidate.city.region.name}}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <a v-if="!isApplicant" v-tooltip="'View candidate\'s detail'" :href="`/candidate/detail/${person.candidate.id}`">
              <ChevronRightIcon
                class="w-5 h-5 text-gray-400 group-hover:text-gray-700"
                aria-hidden="true"
              />
            </a>
            <a v-if="isApplicant" v-tooltip="'View applicant\'s detail'" class="cursor-pointer" @click="gotoDetailPage(person.id)">
              <ChevronRightIcon
                class="w-5 h-5 text-gray-400 group-hover:text-gray-700"
                aria-hidden="true"
              />
            </a>
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
  // CheckCircleIcon,
  ChevronRightIcon,
} from "@heroicons/vue/solid";
import { useRouter } from "vue-router";
import { FormatAge, FormatLongDate2 } from '../../util/Formatter';
const props = defineProps({
  serverData: Object,
  isApplicant: Boolean,
  interviewId: String
});

const router = useRouter();

function formatAppDate(dateValue) {
  return FormatLongDate2(dateValue);
}

function gotoDetailPage(applicantid) {
  router.push({ name: 'ApplicantDetail', params: {id: applicantid, interviewId: props.interviewId}});
}
</script>

<style></style>
