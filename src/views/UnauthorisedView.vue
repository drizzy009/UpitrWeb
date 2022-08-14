<template>
  <div class="flex min-h-full">
    <div class="relative flex-1 hidden w-0 lg:block">
      <img
        class="absolute inset-0 object-cover w-full h-full"
        src="@/assets/images/login-bg.jpg"
        alt="rain oil bg"
      />
    </div>
    <div
      class="flex flex-col justify-center flex-1 h-screen px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="w-full max-w-sm mx-auto lg:w-96">
        <div>
          <div class="flex items-center">
            <svg class="w-8 h-8 text-indigo-300 shrink-0" viewBox="0 0 24 24">
              <path
                class="text-indigo-200 fill-current"
                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
              ></path>
              <path
                class="text-indigo-400 fill-current"
                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
              ></path>
            </svg>
            <h2 class="ml-2 text-4xl font-bold text-indigo-500">
              recruit<span class="text-indigo-700">r</span>
            </h2>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Unauthorised</h2>
          <p>You are not authorize to view this page</p>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <div class="space-y-6">
              <div>
                <AppButton
                  @click="onBack"
                  label="Go Back"
                  class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function onBack() {
    router.back();
}

</script>