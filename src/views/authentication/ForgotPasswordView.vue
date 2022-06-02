<template>
  <div class="min-h-full flex">
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="@/assets/images/login-bg.jpg"
        alt="rain oil bg"
      />
    </div>
    <div
      class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-screen"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <div class="flex items-center">
           <svg class="shrink-0 h-8 w-8 text-indigo-300" viewBox="0 0 24 24"><path class="fill-current text-indigo-200" d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"></path><path class="fill-current text-indigo-400" d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"></path></svg>
            <h2 class="text-indigo-500 text-4xl font-bold ml-2">recruit<span class="text-slate-800">r</span></h2>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
          <p class="text-sm text-gray-500">Enter your registered email address and we will send you a password reset link</p>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <form action="#" method="POST" class="space-y-6">
              <div>
                <div class="mt-1">
                  <text-input id="email" type="email" placeholder="Email address" leading-icon="fa-solid fa-envelope">
                  </text-input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Password Reset Link
                </button>
              </div>
              <div class="flex items-center justify-between">
                <div class="text-sm">
                  <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Back to login
                  </router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

</script>
