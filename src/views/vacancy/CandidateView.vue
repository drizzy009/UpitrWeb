<template>
  <ul
    role="list"
    class="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
  >
    <li v-for="candidate in candidates" :key="candidate.email">
      <a href="#" class="block group">
        <div class="flex items-center px-4 py-5 sm:py-6 sm:px-0">
          <div class="flex items-center flex-1 min-w-0">
            <div class="flex-shrink-0">
              <UserCircleIcon
                v-if="candidate.photo === null"
                class="w-12 h-12 text-gray-400 rounded-full cursor-auto group-hover:opacity-75"
              ></UserCircleIcon>
              <img
                v-if="candidate.photo !== null"
                class="w-12 h-12 rounded-full group-hover:opacity-75"
                :src="candidate.photo"
                alt=""
              />
            </div>
            <div class="flex-1 min-w-0 px-4 md:grid md:grid-cols-4 md:gap-1">
              <div>
                <p class="text-sm font-medium text-indigo-600 truncate">
                  {{ candidate.firstname }} {{ candidate.lastname }}
                </p>
                <p class="flex items-center mt-2 text-sm text-gray-500">
                  <MailIcon
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span class="truncate">{{ candidate.email }}</span>
                </p>
              </div>
              <div class="hidden md:block">
                <div>
                  <p class="text-sm text-gray-900">
                    {{candidate.job_function.name}} in
                  </p>
                  <p class="mt-2 text-sm text-gray-900">
                    {{candidate.industry.name}} with {{candidate.years_of_experience}} experience
                  </p>
                </div>
              </div>
              <div class="hidden md:block">
                <div>
                  <p class="text-sm text-gray-900">
                    {{candidate.gender_id === 0 ? 'Female': 'Male'}}
                  </p>
                  <p class="mt-2 text-sm text-gray-900">
                    {{FormatAge(candidate.dob)}} years old
                  </p>
                </div>
              </div>
              <div class="hidden md:block">
                <div>
                  <p class="text-sm text-gray-900">
                    Applied on
                    {{ " " }}
                    {{formatAppDate(candidate.created_at)}}
                  </p>
                  <p class="flex items-center mt-2 text-sm text-gray-500">
                    {{candidate.city.name}}, {{candidate.city.region.name}}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <a :href="`/candidate/detail/${candidate.id}`">
              <ChevronRightIcon
                class="w-5 h-5 text-gray-400 group-hover:text-gray-700"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </a>
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
import { FormatAge, FormatLongDate2 } from '../../util/Formatter';
defineProps({
  candidates: Array,
});

function formatAppDate(dateValue) {
  return FormatLongDate2(dateValue);
}
</script>

<style></style>
