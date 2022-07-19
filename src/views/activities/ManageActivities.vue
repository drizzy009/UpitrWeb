<template>
  <main class="flex-1 pb-8">
    <!-- Page header -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:max-w-9xl lg:mx-auto lg:px-8">
        <div
          class="py-3 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"
        >
          <div class="flex-1 min-w-0">
            <form class="flex w-full md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div
                class="relative w-full text-gray-400 focus-within:text-gray-600"
              >
                <div
                  class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <SearchIcon class="w-5 h-5" aria-hidden="true" />
                </div>
                <input
                  v-debounce:500ms="onSearchChange"
                  id="search-field"
                  name="search-field"
                  class="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Search Activities"
                  type="text"
                  v-model="keyword"
                />
              </div>
            </form>

            <!-- Profile -->
          </div>
          <div class="flex mt-6 space-x-3 md:mt-0 md:ml-4">
            <IconButton
              type="button"
              @click="toggleAddActivity"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <PlusCircleIcon
                class="flex-shrink-0 w-5 h-5 text-indigo"
                aria-hidden="true"
              />
              New Activities
            </IconButton>

            <IconButton
              type="button"
              @click="downloadActivities"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <DownloadIcon
                class="flex-shrink-0 w-5 h-5 text-indigo"
                aria-hidden="true"
              />
            </IconButton>

            <button
              type="button"
              @click="onRefreshClicked"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-200 hover:bg-green-200"
            >
              <RefreshIcon
                class="flex-shrink-0 w-5 h-5 text-green"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 mx-auto mt-6 max-w-9xl sm:px-6 lg:px-6">
      <div class="px-8 bg-white shadow sm:rounded-lg">
        <div v-if="loading">
          <SkeletonLoading v-for="n in 5" :key="n"></SkeletonLoading>
        </div>
        <div v-if="!loading" class="w-full mx-auto mt-0">
          <div v-if="serverResponse.data.length === 0">
            <h4 class="text-center">No activities found</h4>
          </div>
          <calendar-component
            @delete="deleteActivity"
            :serverData="serverResponse"
          ></calendar-component>
          <!-- Pagination -->
          <nav
            class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
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
            <div class="flex justify-between flex-1 sm:justify-end">
              <div v-for="link in serverResponse.links" :key="link">
                <AppButton
                  @click="navigateTo(link.url)"
                  :disabled="link.url === null || processing"
                  :class="
                    link.active
                      ? 'bg-indigo-700 text-white hover:bg-gray-50 hover:text-gray-700'
                      : 'text-gray-700 bg-white'
                  "
                  class="relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50"
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
import { utils, writeFile } from 'xlsx';
import {
  SearchIcon,
  RefreshIcon,
  DownloadIcon,
  PlusCircleIcon,
} from "@heroicons/vue/solid";
import { useToast } from "vue-toastification";
import CreateActivity from "./CreateActivity.vue";
import ActivityService from "../../service/activity.service";
import CalendarComponent from "../../components/commons/calendar/CalendarComponent.vue";
import { GetUnixTime, FormatLongDate } from "../../util/Formatter";

const toast = useToast();
const swal = inject("$swal");
const $loading = inject("$loading");

const keyword = ref("");
const loading = ref(false);
const processing = ref(false);
const openAddActivity = ref(false);
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

function downloadActivities() {
  const loader = $loading.show();
  ActivityService.all(`page_size=${serverResponse.value.total}`)
    .then((result) => {
      const { data } = result.data.data;
      let sno = 0;

      const exportData = data.map(activity => {
        return {
          SN: ++sno,
          Title: activity.title,
          Location: activity.location,
          Description: activity.description,
          From: FormatLongDate(activity.start),
          To: FormatLongDate(activity.end),
          "Related To": activity.job.title,
          "Activity Type": activity.activity_type,
          Status: activity.status,
        }
      });

      const time = GetUnixTime();
      const sheet = utils.json_to_sheet(exportData);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, sheet, 'Activities');
      writeFile(workbook, `activities_list_${time}.xlsx`);
    })
    .catch(() => {})
    .finally(() => {
      loader.hide();
    });
}

function onRefreshClicked () {
  keyword.value = "";
  getActivities();
}

function onSearchChange(value) {
  if (value.length > 3) {
    getActivities(`keyword=${value}`);
  }
}

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
