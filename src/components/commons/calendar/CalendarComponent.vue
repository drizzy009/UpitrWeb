<template>
  <div>
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-16">
      <ol
        class="mt-4 divide-y divide-gray-300 text-sm leading-6 lg:col-span-12 xl:col-span-12"
      >
        <li
          v-for="activity in activities"
          :key="activity.id"
          class="relative flex space-x-6 py-6 xl:static"
        >
          <!-- <img
            :src="activity.meeting_url"
            alt=""
            class="h-14 w-14 flex-none rounded-full"
          /> -->
          <div class="flex-auto">
            <h3 class="pr-10 font-semibold text-gray-900 xl:pr-0">
              {{ activity.title }}
            </h3>
            <dl class="mt-2 flex flex-col text-gray-500 xl:flex-row">
              <div class="flex items-start space-x-3">
                <dt class="mt-0.5">
                  <span class="sr-only">Date</span>
                  <CalendarIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  {{ FormatActivityDate(activity.start) }} at
                  {{ FormatActivityTime(activity.start) }}
                </dd>
              </div>
              <div
                class="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5"
              >
                <dt class="mt-0.5">
                  <span class="sr-only">Location</span>
                  <VideoCameraIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>{{ activity.location }}</dd>
              </div>
            </dl>
          </div>
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="bg-indigo-100 rounded-full flex items-center text-indigo-400 p-1 hover:text-gray-600"
              >
                <span class="sr-only">Open options</span>
                <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right z-20 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              >
                <!-- <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a
                      @click="editActivity(department)"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'group flex items-center px-4 py-2 text-sm cursor-pointer',
                      ]"
                    >
                      <PencilAltIcon
                        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      Edit
                    </a>
                  </MenuItem>
                </div> -->
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a
                      @click="deleteActivity(activity.id)"
                      :class="[
                        active ? 'bg-red-100 text-red-900' : 'text-red-700',
                        'group flex items-center px-4 py-2 text-sm cursor-pointer',
                      ]"
                    >
                      <TrashIcon
                        class="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500"
                        aria-hidden="true"
                      />
                      Delete
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import {
  TrashIcon,
  CalendarIcon,
  VideoCameraIcon,
  // PencilAltIcon,
  DotsVerticalIcon,
} from "@heroicons/vue/solid";
import { ref } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { FormatLongDate2, FormatTime } from "../../../util/Formatter";
defineProps({
  activities: Array,
});

const emit = defineEmits(['delete']);
const meetings = ref([
  {
    id: 1,
    date: "January 10th, 2022",
    time: "5:00 PM",
    datetime: "2022-01-10T17:00",
    name: "Customer Success Cohort Meetings",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    location: "Zoom",
  },
  {
    id: 1,
    date: "January 10th, 2022",
    time: "5:00 PM",
    datetime: "2022-01-10T17:00",
    name: "Customer Success Cohort Meetings",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    location: "Zoom",
  },
  {
    id: 1,
    date: "January 10th, 2022",
    time: "5:00 PM",
    datetime: "2022-01-10T17:00",
    name: "Customer Success Cohort Meetings",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    location: "Zoom",
  },
  {
    id: 1,
    date: "January 10th, 2022",
    time: "5:00 PM",
    datetime: "2022-01-10T17:00",
    name: "Customer Success Cohort Meetings",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    location: "Zoom",
  },
]);
const days = ref([
  { date: "2021-12-27" },
  { date: "2021-12-28" },
  { date: "2021-12-29" },
  { date: "2021-12-30" },
  { date: "2021-12-31" },
  { date: "2022-01-01", isCurrentMonth: true },
  { date: "2022-01-02", isCurrentMonth: true },
  { date: "2022-01-03", isCurrentMonth: true },
  { date: "2022-01-04", isCurrentMonth: true },
  { date: "2022-01-05", isCurrentMonth: true },
  { date: "2022-01-06", isCurrentMonth: true },
  { date: "2022-01-07", isCurrentMonth: true },
  { date: "2022-01-08", isCurrentMonth: true },
  { date: "2022-01-09", isCurrentMonth: true },
  { date: "2022-01-10", isCurrentMonth: true },
  { date: "2022-01-11", isCurrentMonth: true },
  { date: "2022-01-12", isCurrentMonth: true, isToday: true },
  { date: "2022-01-13", isCurrentMonth: true },
  { date: "2022-01-14", isCurrentMonth: true },
  { date: "2022-01-15", isCurrentMonth: true },
  { date: "2022-01-16", isCurrentMonth: true },
  { date: "2022-01-17", isCurrentMonth: true },
  { date: "2022-01-18", isCurrentMonth: true },
  { date: "2022-01-19", isCurrentMonth: true },
  { date: "2022-01-20", isCurrentMonth: true },
  { date: "2022-01-21", isCurrentMonth: true },
  { date: "2022-01-22", isCurrentMonth: true, isSelected: true },
  { date: "2022-01-23", isCurrentMonth: true },
  { date: "2022-01-24", isCurrentMonth: true },
  { date: "2022-01-25", isCurrentMonth: true },
  { date: "2022-01-26", isCurrentMonth: true },
  { date: "2022-01-27", isCurrentMonth: true },
  { date: "2022-01-28", isCurrentMonth: true },
  { date: "2022-01-29", isCurrentMonth: true },
  { date: "2022-01-30", isCurrentMonth: true },
  { date: "2022-01-31", isCurrentMonth: true },
  { date: "2022-02-01" },
  { date: "2022-02-02" },
  { date: "2022-02-03" },
  { date: "2022-02-04" },
  { date: "2022-02-05" },
  { date: "2022-02-06" },
]);

function FormatActivityDate(dateValue) {
  return FormatLongDate2(dateValue);
}

function FormatActivityTime(dateValue) {
  return FormatTime(dateValue);
}

function deleteActivity(id) {
  emit('delete', id);
}
</script>
