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
              recruit<span class="text-slate-800">r</span>
            </h2>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Set Password
          </h2>
          <p class="text-sm text-gray-500">
            Provide a new password to access your account
          </p>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <form action="#" method="POST" class="space-y-6">
              <div>
                <div class="relative mt-1 rounded-md shadow-sm">
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                  >
                    <MailIcon
                      class="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    v-model="formData.email"
                    type="email"
                    name="email"
                    id="email"
                    class="block w-full pl-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Email"
                    disabled="true"
                  />
                </div>
              </div>
              <div>
                <div class="mt-1">
                  <PasswordInput
                    id="newPassword"
                    name="newPassword"
                    placeholder="Current Password"
                    v-model="formData.current_password"
                  />
                </div>
              </div>
              <div>
                <div class="mt-1">
                  <PasswordInput
                    id="newPassword"
                    name="newPassword"
                    placeholder="New Password"
                    v-tooltip="
                      'Required 8 minimum characters, numbers and special character'
                    "
                    v-model="formData.password"
                  />
                </div>
              </div>
              <div>
                <div class="mt-1">
                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    v-tooltip="
                      'Required 8 minimum characters, numbers and special character'
                    "
                    v-model="formData.password_confirmation"
                  />
                </div>
              </div>
              <div>
                <AppButton
                  type="button"
                  @click="sendResetPassword"
                  :processing="processing"
                  :disabled="v$.$invalid"
                  class="flex justify-center w-full"
                >
                  Reset Password
                </AppButton>
              </div>
              <div class="flex items-center justify-between">
                <div class="text-sm">
                  <router-link
                    to="/login"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                  >
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
import { ref, inject, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers, alphaNum, minLength } from "@vuelidate/validators";
import { MailIcon } from "@heroicons/vue/solid";
import AuthService from "../../service/authentication.service";
import { useAuthentication } from "../../stores/authentication";

const toast = useToast();
const router = useRouter();
const swal = inject("$swal");

const { newUserEmail } = storeToRefs(useAuthentication());

const processing = ref(false);

const formData = ref({
  email: "",
  password: "",
  current_password: "",
  password_confirmation: "",
});

const rules = {
  email: { required, email},
  current_password: {required},
  password: {
    minLength: minLength(8),
    required: helpers.withMessage("New password required", required, alphaNum),
  },
  password_confirmation: {
    minLength: minLength(8),
    required: helpers.withMessage(
      "Confirm password required",
      required,
      alphaNum
    ),
  },
};

const v$ = useVuelidate(rules, formData);

function showErrorMessage(errorMessage) {
  toast.error(errorMessage);
}

function showErrorMessages(errors) {
  var errorMessage = "";
  Object.keys(errors).forEach((key) => {
    errorMessage += `${errors[key][0]}\n`;
  });

  toast.error(errorMessage);
}

function sendResetPassword() {
  processing.value = true;

  AuthService.setPassword(formData.value)
    .then(() => {
      swal({
        title: "Success",
        text: "Password successfully reset, you will be redirected to the login page",
        icon: "success",
      });

      router.push({ name: 'Login' });
    })
    .catch((error) => {
      const { data } = error;
      if (data.code === "062") {
        showErrorMessages(data.data);
      } else {
        showErrorMessage(data.message);
      }
    })
    .finally(() => {
      processing.value = false;
    });
}

onMounted(() => {
  formData.value.email = newUserEmail.value;
})
</script>
