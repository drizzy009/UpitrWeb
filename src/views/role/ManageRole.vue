<template>
  <main class="flex-1 pb-8">
     <!-- Page header -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:max-w-9xl lg:mx-auto lg:px-8">
        <div
          class="py-3 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"
        >
          <div class="flex-1 min-w-0">
            <!-- <form class="flex w-full md:ml-0" action="#" method="GET">
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
                  placeholder="Search Roles"
                  type="text"
                  v-model="keyword"
                />
              </div>
            </form> -->
          </div>
          <div class="flex mt-6 space-x-3 md:mt-0 md:ml-4">
            <a
              href="/role/new"
              v-tooltip="'Add new role'"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <PlusCircleIcon
                class="flex-shrink-0 w-5 h-5 text-indigo"
                aria-hidden="true"
              />
              New Role
            </a>

            <!-- <button
              type="button"
              @click="open = true"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <FilterIcon
                class="flex-shrink-0 w-5 h-5 text-indigo"
                aria-hidden="true"
              />
            </button> -->

            <IconButton
              type="button"
              @click="downloadRole"
              :processing="downloading"
              v-tooltip="'Download to excel'"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <DownloadIcon
                class="flex-shrink-0 w-5 h-5 text-indigo"
                aria-hidden="true"
              />
            </IconButton>

            <button
              type="button"
              @click="refreshData"
              v-tooltip="'Refresh page'"
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
    <template v-if="processing">
      <SkeletonLoading v-for="n in 2" :key="n"></SkeletonLoading>
    </template>
    <div class="px-4 mx-auto mt-6 max-w-9xl sm:px-6 lg:px-6">
      <div class="flex flex-col mt-2">
        <div
          class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-0 text-left text-sm font-semibold text-gray-900 sm:pl-4"
                >
                  Sno
                </th>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Name
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody v-if="roles.length > 0 && !processing" class="bg-white divide-y divide-gray-200">
              <tr v-for="(role, index) in roles" :key="role.id">
                <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <div class="text-gray-900">
                    <span class="inline-flex px-2 text-xs font-semibold">{{ (index + 1) }}</span>
                  </div>
                </td>
                <td class="py-4 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-6">
                  <div class="flex items-center">
                    <div class="">
                      <div class="font-medium text-gray-900 capitalize">
                        {{ role.name }}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  class="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6"
                >
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
                        <div class="py-1">
                          <MenuItem v-slot="{ active }">
                            <a
                              :href="`/role/edit/${role.id}`"
                              :class="[
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
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
                        </div>
                        <div class="py-1">
                          <MenuItem v-slot="{ active }">
                            <a
                              @click="deleteRole(role.id)"
                              :class="[
                                active
                                  ? 'bg-red-100 text-red-900'
                                  : 'text-red-700',
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
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <!-- <nav
            class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
            aria-label="Pagination"
          >
            <div class="hidden sm:block">
              <p class="text-sm text-gray-700">
                Showing
                {{ " " }}
                <span class="font-medium">1</span>
                {{ " " }}
                to
                {{ " " }}
                <span class="font-medium">10</span>
                {{ " " }}
                of
                {{ " " }}
                <span class="font-medium">20</span>
                {{ " " }}
                results
              </p>
            </div>
            <div class="flex justify-between flex-1 sm:justify-end">
              <a
                href="#"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Next
              </a>
            </div>
          </nav> -->
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, inject, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { utils, writeFile } from 'xlsx';
import { useToast } from "vue-toastification";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  PlusCircleIcon,
  RefreshIcon,
  DownloadIcon,
  PencilAltIcon,
  TrashIcon,
  DotsVerticalIcon,
} from "@heroicons/vue/solid";
import { useRole } from "../../stores/role";
import RoleService from "../../service/role.service";
import moment from "moment";

const roleStore = useRole();
const { roles } = storeToRefs(useRole());

const toast = useToast();
const swal = inject('$swal');

const processing = ref(false);
const downloading = ref(false);

function downloadRole() {
  downloading.value = true;
  let sno = 0;
  const exportData = roles.value.map(role => {
    return {
      SN: ++sno,
      Name: role.name,
    }
  });

  const time = moment().unix();
  const sheet = utils.json_to_sheet(exportData);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, sheet, 'roles');
  writeFile(workbook, `role_list_${time}.xlsx`);
  downloading.value = false;
}

function deleteRole(id) {
  swal({
    title: "Confirm Delete",
    text: "Are you sure you want to delete this role",
    icon: "question",
    showCancelButton: true,
    cancelButtonText: "No",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      RoleService.delete(id).then(() => {
        toast("Role successfully deleted");
        refreshData();
      }).catch(() => {})
    }
  });
}

function refreshData() {
  // keyword.value = "";
  roleStore.fetchAllPermissions();
  roleStore.fetchAllRoles();
}

onMounted(() => {
  refreshData();
})
</script>
