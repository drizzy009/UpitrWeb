<template>
  <main class="flex-1 pb-8">
    <!-- Page header -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
        <div
          class="py-3 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"
        >
          <div class="flex-1 min-w-0">
            <form class="w-full flex md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div
                class="relative w-full text-gray-400 focus-within:text-gray-600"
              >
                <div
                  class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <SearchIcon class="h-5 w-5" aria-hidden="true" />
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
              @click="getActivities"
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
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Calendar
            </h3>
            <p class="max-w-2xl text-sm text-gray-500 pb-3">
              Manage your upcoming events
            </p>
          </div>
        </div>
        <div v-if="loading">
          <SkeletonLoading v-for="n in 5" :key="n"></SkeletonLoading>
        </div>
        <div v-if="!loading" class="mt-0 w-full mx-auto">
          <div v-if="serverResponse.data.length === 0">
            <h4 class="text-center">No activities found</h4>
          </div>
          <calendar-component
            @delete="deleteActivity"
            :activities="serverResponse.data"
          ></calendar-component>
          <!-- Pagination -->
          <nav
            class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
            aria-label="Pagination"
          >
            <div class="hidden sm:block">
              <p class="text-sm text-gray-700">
                Showing
                {{ " " }}
                <span class="font-medium">{{ serverResponse.from }}</span>
                {{ " " }}
                to
                {{ " " }}
                <span class="font-medium">{{ serverResponse.to }}</span>
                {{ " " }}
                of
                {{ " " }}
                <span class="font-medium">{{ serverResponse.total }}</span>
                {{ " " }}
                results
              </p>
            </div>
            <div class="flex-1 flex justify-between sm:justify-end">
              <div v-for="link in serverResponse.links" :key="link">
                <AppButton
                  @click="navigateTo(link.url)"
                  :disabled="link.url === null || processing"
                  :class="
                    link.active
                      ? 'bg-indigo-700 text-white hover:bg-gray-50 hover:text-gray-700'
                      : 'text-gray-700 bg-white'
                  "
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50"
                >
                  {{ formatLabel(link.label) }}
                </AppButton>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <CreateActivity
      :toggle="openAddActivity"
      @toggleActivity="toggleAddActivity"
      @loadActivity="getActivities"
    ></CreateActivity>
  </main>
</template>
<script setup>
import { ref, inject, onMounted } from "vue";
import {
  PlusCircleIcon,
  RefreshIcon,
  DownloadIcon,
  SearchIcon,
} from "@heroicons/vue/solid";
import { useToast } from "vue-toastification";
import CreateActivity from "./CreateActivity.vue";
import ActivityService from "../../service/activity.service";
import CalendarComponent from "../../components/commons/calendar/CalendarComponent.vue";
const openAddActivity = ref(false);

const toast = useToast();
const swal = inject("$swal");
const loading = ref(false);
const processing = ref(false);
const serverResponse = ref({
  to: 0,
  from: 0,
  total: 0,
  data: [],
  links: [],
  per_page: 0,
  last_page: 0,
  current_page: 0,
  prev_page_url: null,
  next_page_url: null,
  last_page_url: null,
  first_page_url: null,
});

function toggleAddActivity() {
  openAddActivity.value = !openAddActivity.value;
}

function formatLabel(label) {
  if (label.includes("Prev")) {
    return `<< Previous`;
  }

  if (label.includes("Next")) {
    return "Next >>";
  }

  return label;
}

function navigateTo(url) {
  processing.value = true;
  // serverResponse.value.data = [];
  ActivityService.get(url)
    .then((result) => {
      serverResponse.value = result.data.data;
    })
    .catch(() => {})
    .finally(() => {
      processing.value = false;
    });
}

function getActivities(slug = "") {
  loading.value = true;
  ActivityService.all(slug)
    .then((result) => {
      const { data } = result.data;
      serverResponse.value = data;
    })
    .catch(() => {})
    .finally(() => {
      loading.value = false;
    });
}

function deleteActivity(id) {
  swal({
    title: "Confirm Delete",
    text: "Are you sure you want to delete this activity",
    icon: "question",
    showCancelButton: true,
    cancelButtonText: "No",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      ActivityService.delete(id)
        .then(() => {
          toast("Activity successfully deleted");
          getActivities();
        })
        .catch(() => {});
    }
  });
}

onMounted(() => {
  getActivities();
});
</script>
