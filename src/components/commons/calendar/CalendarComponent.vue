<template>
  <div>
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-16">
      <ol
        class="mt-4 text-sm leading-6 divide-y divide-gray-300 lg:col-span-12 xl:col-span-12"
      >
        <li
          v-for="(activity, index) in serverData.data"
          :key="activity.id"
          class="relative flex py-6 space-x-6 xl:static"
        >
          <div class="flex-auto">
            <h3 class="pr-10 font-semibold text-gray-900 xl:pr-0">
              {{ (index + 1) + (serverData.current_page - 1) * serverData.per_page }}.
              {{ activity.title }}
            </h3>
            <dl class="flex flex-col mt-2 text-gray-500 xl:flex-row">
              <div class="flex items-start space-x-3">
                <dt class="mt-0.5">
                  <span class="sr-only">Date</span>
                  <CalendarIcon
                    class="w-5 h-5 text-gray-400"
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
                  <LocationMarkerIcon
                    class="w-5 h-5 text-gray-400"
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
                class="flex items-center p-1 text-indigo-400 bg-indigo-100 rounded-full hover:text-gray-600"
              >
                <span class="sr-only">Open options</span>
                <DotsVerticalIcon class="w-5 h-5" aria-hidden="true" />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                        class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
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
                        class="w-5 h-5 mr-3 text-red-400 group-hover:text-red-500"
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
  LocationMarkerIcon,
  DotsVerticalIcon,
} from "@heroicons/vue/solid";
//import { ref } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { FormatLongDate2, FormatTime } from "../../../util/Formatter";
defineProps({
  serverData: Array,
});

const emit = defineEmits(['delete']);

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
