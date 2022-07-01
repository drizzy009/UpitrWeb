<template>
  <table class="min-w-full divide-y divide-gray-300">
    <thead class="bg-gray-50">
      <tr>
        <th
          scope="col"
          class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
        >
          SN
        </th>
        <th
          scope="col"
          class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
        >
          Vacancy
        </th>
        <th
          scope="col"
          class="px-3 py-3 text-left text-sm font-semibold text-gray-900"
        >
          Type
        </th>
        <th
          scope="col"
          class="px-3 py-3 text-left text-sm font-semibold text-gray-900"
        >
          Location
        </th>
        <th
          scope="col"
          class="px-3 py-3 text-left text-sm font-semibold text-gray-900"
        >
          Due Date
        </th>
        <th
          scope="col"
          class="px-3 py-3 text-left text-sm font-semibold text-gray-900"
        >
          Status
        </th>
        <th
          scope="col"
          class="px-3 py-3 text-left text-sm font-semibold text-gray-900"
        >
          Level
        </th>
        <th
          scope="col"
          class="relative py-3 pl-3 pr-4 sm:pr-6"
        >
          <span class="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr
        v-for="job in jobs"
        :key="job.id"
      >
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:pl-6">
          {{ job.id }}
        </td>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div class="flex items-center">
            <div class="h-10 w-10 flex-shrink-0">
              <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-200">
                <span class="text-xl font-medium leading-none text-indigo-700">{{ job.position[0] }}</span>
              </span>
            </div>
            <div class="ml-4">
              <div class="font-medium text-gray-900">
                {{ job.position }}
              </div>
              <div class="text-gray-500">{{ job.department }}</div>
            </div>
          </div>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div class="text-gray-900">
            <span class="inline-flex rounded-full bg-indigo-100 px-2 text-xs font-semibold leading-5 text-indigo-800">{{ job.type }}</span>
          </div>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <LocationMarkerIcon
              class="flex-shrink-0 mr-1 w-4 text-gray-400"
              aria-hidden="true"
            />{{ job.location }}
          </div>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <CalendarIcon
              class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <p>
              Closing in
              {{ " " }}
              <time :datetime="job.duedate">{{ job.deadline }}</time>
            </p>
          </div>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {{ job.level }}
        </td>
        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <Menu
            as="div"
            class="relative inline-block text-left"
          >
            <div>
              <MenuButton class="bg-indigo-100 rounded-full flex items-center text-indigo-400 p-1 hover:text-gray-600">
                <span class="sr-only">Open options</span>
                <DotsVerticalIcon
                  class="h-5 w-5"
                  aria-hidden="true"
                />
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
              <MenuItems class="origin-top-right z-20 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'group flex items-center px-4 py-2 text-sm',
                            ]"
                  >
                    <PencilAltIcon
                      class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Edit
                  </a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <a
                    href="/vacancy/detail"
                    :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'group flex items-center px-4 py-2 text-sm',
                            ]"
                  >
                    <ClipboardListIcon
                      class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Details
                  </a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'group flex items-center px-4 py-2 text-sm',
                            ]"
                  >
                    <DuplicateIcon
                      class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Duplicate
                  </a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                              active
                                ? 'bg-red-100 text-red-900'
                                : 'text-red-700',
                              'group flex items-center px-4 py-2 text-sm',
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
        </td>
      </tr>
    </tbody>
  </table>
  <nav
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
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
    <div class="flex-1 flex justify-between sm:justify-end">
      <a
        href="#"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Previous
      </a>
      <a
        href="#"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Next
      </a>
    </div>
  </nav>

</template>


        


