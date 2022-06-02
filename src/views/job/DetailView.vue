<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="w-full shadow-lg rounded-lg border px-8 pt-8 pb-12 bg-white">
      <div class="mb-6">
        <div class="flex justify-between items-center">
          <!-- Back button -->
          <router-link
            class="inline-flex items-center py-1 px-2 bg-indigo-500 rounded-md border-slate-200 hover:border-slate-300 text-white"
            to="/jobs/all"
          >
            <svg
              class="fill-current text-white mr-2"
              width="7"
              height="12"
              viewBox="0 0 7 12"
            >
              <path d="M5.4.6 6.8 2l-4 4 4 4-1.4 1.4L0 6z" />
            </svg>
            <span>View Jobs</span>
          </router-link>
          <!-- Share -->
          <div class="flex items-center">
            <div class="text-slate-500  mr-4">Share:</div>
            <div class="flex items-center space-x-3">
              <button class="text-slate-400 hover:text-indigo-500">
                <span class="sr-only">Share on Twitter</span>
                <svg
                  class="w-4 h-4 text-slate-500 fill-current"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 3.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8Z" />
                </svg>
              </button>
              <button class="text-slate-400 hover:text-indigo-500">
                <span class="sr-only">Share on Facebook</span>
                <svg
                  class="w-4 h-4 text-slate-500 fill-current"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.023 16 6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023Z" />
                </svg>
              </button>
              <button class="text-slate-400 hover:text-indigo-500">
                <span class="sr-only">Share on Linkedin</span>
                <svg
                  class="w-4 h-4 text-slate-500 fill-current"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 1.146C0 .514.53 0 1.182 0h13.635C15.471 0 16 .513 16 1.146v13.708c0 .633-.53 1.146-1.183 1.146H1.182C.53 16 0 15.487 0 14.854V1.146ZM4.862 13.39V6.187H2.468v7.203h2.394ZM3.666 5.203c.834 0 1.354-.553 1.354-1.244-.016-.707-.52-1.245-1.338-1.245-.82 0-1.355.538-1.355 1.245 0 .691.52 1.244 1.323 1.244h.015Zm2.522 8.187h2.394V9.368c0-.215.015-.43.078-.584.173-.43.567-.876 1.229-.876.866 0 1.213.66 1.213 1.629v3.853h2.394V9.26c0-2.213-1.181-3.242-2.756-3.242-1.292 0-1.86.722-2.174 1.213h.016V6.187H6.188c.03.676 0 7.203 0 7.203Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <header class="mb-4 text-center">
        <!-- Title -->
        <h1 class="text-2xl md:text-4xl text-slate-800 font-bold">Depot Manager</h1>
      </header>

      <!-- Tags -->
      <div class="text-sm mb-4 text-center">
        <span class="bg-gray-200 text-xs py-1 text-gray-700 px-3 rounded-full"><i class="fa-solid fa-calendar-day mr-2"></i>Posted Jan 6, 2022</span>
        <span class="ml-3 bg-red-100 text-xs py-1 text-red-700 px-3 rounded-full"><i class="fa-solid fa-calendar-day mr-2"></i>Deadline Aug 6, 2022</span>
      </div>

      <!-- Tags -->
      <div class="text-sm mb-8 text-center">
        <span class="text-xs inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center mr-2 px-2.5 py-1"><i class="fa-solid fa-briefcase mr-2"></i>Full-time</span>
        <span class="text-xs inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center mr-2 px-2.5 py-1"><i class="fa-solid fa-briefcase mr-2"></i>Senior Manager</span>
        <span class="text-xs inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1"><i class="fa-solid fa-briefcase mr-2"></i>Senior Manager</span>
      </div>

      <hr class="my-6 border-t border-slate-200" />
      <div class="mt-12">
        <h2 class="text-2xl leading-snug text-slate-800 font-bold mb-2">Description</h2>
        <div class="space-y-6 mb-6">
            <h3 class="text-md leading-snug text-slate-500 font-bold">Overview</h3>
            <p>Rainoil is seeking to fill the position of Reservoir Management Director.</p>
            <p>The successful candidate must have a good knowledge of technical practices and principles within reservoir engineering including but not limited to reservoir performance analysis, optimization of fields, development planning, economic evaluation and reserves evaluation. </p>
            
        </div>
        <div class="space-y-6 mb-6">
            <h3 class="text-md leading-snug text-slate-500 font-bold">Responsibilities</h3>
            <ul class="list-disc pl-5">
                <li class="mb-2">Interpret reservoir data, plots and graphs, and apply models to characterize reservoir or field properties.</li>
                <li class="mb-2">Run well/project economic evaluations, field development planning, decline curve analysis</li>
                <li class="mb-2">Identify opportunities to optimize producing assets, improve recovery, increase production rate, reserve additions and develop reservoir performance predictions and well as prepare estimates of in-place hydrocarbon volumes</li>
                <li class="mb-2">Carry out reservoir surveillance, analysis, develop dynamic models and provide direction on subsurface engineering required for proper reservoir management of assets</li>
                <li class="mb-2">Work with partners and regulatory agencies to gain alignment on well locations, data acquisition</li>
            </ul>
        </div>
      </div>

      <hr class="my-6 border-t border-slate-200" />

      <div>
        <h2 class="text-xl leading-snug text-slate-800 font-bold mb-2">Requirements</h2>
        <div class="space-y-6 mb-6">
            <h3 class="text-md leading-snug text-slate-500 font-bold">Skills</h3>
            <ul class="list-disc pl-5">
                <li class="mb-2">Ability to use data modeling software and apply the principles of fluid dynamics, physics, and engineering to address technical problems.</li>
                <li class="mb-2">Strong interpersonal skills and the ability to interact with other geoscientists, project managers, and field workers as well as the engineering team.</li>
            </ul>
        </div>
        <div class="space-y-6 mb-6">
            <h3 class="text-md leading-snug text-slate-500 font-bold">Educational/ Experience Requirements</h3>
            <ul class="list-disc pl-5">
                <li class="mb-2">Minimum of Bachelor of Science (B.Sc.) degree in Petroleum Engineering or other relevant Engineering degree with a minimum of Second Class Upper division.</li>
                <li class="mb-2">A master’s degree or equivalent will be an added advantage. </li>
                <li class="mb-2">A minimum of Twenty (20) years post graduate and experience in Reservoir Engineering in the oil industry with an E & P Operator</li>
            </ul>
        </div>
      </div>

      <div class="mt-16 text-right">
        <router-link
            class="inline-flex items-center py-2 px-2 bg-indigo-500 rounded-md border-slate-200 hover:border-slate-300 text-white"
            to="/jobs/all"
          >
            <span>APPLY NOW<i class="fa-solid fa-paper-plane ml-2"></i></span>
          </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>