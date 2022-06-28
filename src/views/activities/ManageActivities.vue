<template>
  <main class="flex-1 pb-8">
    <!-- Page header -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
        <div class="py-3 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div class="flex-1 min-w-0">
            <form
              class="w-full flex md:ml-0"
              action="#"
              method="GET"
            >
              <label
                for="search-field"
                class="sr-only"
              >Search</label>
              <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <SearchIcon
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search-field"
                  name="search-field"
                  class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Search Activities"
                  type="search"
                />
              </div>
            </form>

            <!-- Profile -->
          </div>
          <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
            <button
              type="button"
              @click="toggleAddActivity"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <PlusCircleIcon
                class="flex-shrink-0 h-5 w-5 text-indigo"
                aria-hidden="true"
              />
            </button>

            <!-- <button
              type="button"
              @click="open = true"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <FilterIcon
                class="flex-shrink-0 h-5 w-5 text-indigo"
                aria-hidden="true"
              />
            </button> -->

            <button
              type="button"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <DownloadIcon
                class="flex-shrink-0 h-5 w-5 text-indigo"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-200 hover:bg-green-200"
            >
              <RefreshIcon
                class="flex-shrink-0 h-5 w-5 text-green"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 mt-6 lg:px-6">
      <div class="bg-white shadow sm:rounded-lg p-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Calendar</h3>
            <p class="max-w-2xl text-sm text-gray-500 pb-3">Manage your upcoming events</p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
            >Sync Calendar</button>
          </div>
        </div>
        <div class="mt-0 w-auto mx-auto">
          <calendar-component></calendar-component>
        </div>
      </div>
    </div>
    <CreateActivity
      :toggle="openAddActivity"
      @toggleActivity="toggleAddActivity"
    ></CreateActivity>
  </main>
</template>
<script setup>
import CalendarComponent from "../../components/commons/calendar/CalendarComponent.vue";
import {
  PlusCircleIcon,
  RefreshIcon,
  DownloadIcon,
  SearchIcon,
} from "@heroicons/vue/solid";
import { ref } from "vue";
import CreateActivity from "./CreateActivity.vue";
const openAddActivity = ref(false);

// const open = ref(true);

function toggleAddActivity() {
  openAddActivity.value = !openAddActivity.value;
}
</script>
