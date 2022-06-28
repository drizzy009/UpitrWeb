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
            <h2 class="text-indigo-500 text-4xl font-bold ml-2">recruit<span class="text-indigo-700">r</span></h2>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <div class="space-y-6">
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input type="email" v-model="loginDetail.email" name="email" id="email" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md" placeholder="Email" />
              </div>
              <div class="space-y-1">
                <div class="mt-1">
                  <password-input v-model="loginDetail.password" id="password" placeholder="Password">
                  </password-input>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    for="remember-me"
                    class="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div class="text-sm">
                  <router-link to="/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </router-link>
                </div>
              </div>

              <div>
                <button
                  @click="onLogin"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {{ authenticating ? "Authenticating..." : "Sign in"}}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
// import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { MailIcon } from "@heroicons/vue/solid";
import { useAuthentication } from "../../stores/authentication";
import AuthService from "../../service/authentication.service";

const loginDetail = ref({
  email: '',
  password: '',
  remember_me: false
})

const rules = {
  email: { required },
  password: { required },
}

const toast = useToast();
const router = useRouter();
// const { error, successful, authenticating, errorMessage } = storeToRefs(useAuthentication());
const { setLoginInfo } = useAuthentication();
const v$ = useVuelidate(rules, loginDetail);

const error = ref(false);
const errorMessage = ref('');
const successful = ref(false);
const authenticating = ref(false);
watch(() => successful.value, (value) => {
  if (value) {
    toast.success("Login successful");
    router.push({ name: 'Dashboard' });
  }
});

watch(() => error.value, (value) => {
  if (value) {
    toast.error(errorMessage.value);
  }
});

async function onLogin() {
  const valid = await v$.value.$validate();
  if (valid) {
    AuthService.signIn(loginDetail.value).then(result => {
        const { data } = result.data;
        setLoginInfo(data);
        successful.value = true;
    }).catch((errorData) => {
        errorMessage.value = errorData.data.message
        error.value = true;
    }).finally(() => {
        authenticating.value = false;
    })
  }

  if (!valid) {
    toast.error('Enter username and password');
  }
}
</script>
