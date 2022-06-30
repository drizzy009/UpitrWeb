<template>
  <ul
    role="list"
    class="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
  >
    <li v-for="candidate in candidates" :key="candidate.email">
      <a href="#" class="group block">
        <div class="flex items-center py-5 px-4 sm:py-6 sm:px-0">
          <div class="min-w-0 flex-1 flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-12 w-12 rounded-full group-hover:opacity-75"
                :src="candidate.photo"
                alt=""
              />
            </div>
            <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <p class="text-sm font-medium text-indigo-600 truncate">
                  {{ candidate.firstname }} {{ candidate.lastname }}
                </p>
                <p class="mt-2 flex items-center text-sm text-gray-500">
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
                    Applied on
                    {{ " " }}
                    <time :datetime="candidate.created_at">{{
                      candidate.created_at
                    }}</time>
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500">
                    <CheckCircleIcon
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                    {{ candidate.status }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <a href="/candidate/detail">
              <ChevronRightIcon
                class="h-5 w-5 text-gray-400 group-hover:text-gray-700"
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
  CheckCircleIcon,
  ChevronRightIcon,
} from "@heroicons/vue/solid";
defineProps({
  candidates: Array,
});
</script>

<style></style>
