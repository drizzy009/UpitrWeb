<template>
  <main class="flex-1">
    <div class="px-4 mx-auto mt-2 max-w-7xl sm:px-6 lg:px-6">
      <div class="px-4 sm:px-6 md:px-0">
        <div
          class="flex flex-col justify-center min-h-full py-8 bg-white sm:px-6 lg:px-8"
        >
            <div class="px-4 py-4 shadow sm:rounded-lg sm:px-10">
              <form class="space-y-6 sm:mx-auto sm:w-full sm:max-w-lg">
                <div>
                  <label
                    for="username"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div class="mt-1">
                    <FormInput
                      v-model="formData.username"
                      id="username"
                      name="username"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="designation"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Designation
                  </label>
                  <div class="mt-1">
                    <MultiSelect
                      required
                      searchable
                      id="designation"
                      value="id"
                      label="name"
                      valueProp="id"
                      v-model="formData.designation_id"
                      :options="designations"
                      placeholder="Select designation"
                    >
                    </MultiSelect>
                  </div>
                </div>
                <div>
                  <label
                    for="firstname"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Firstname
                  </label>
                  <div class="mt-1">
                    <FormInput
                      v-model="formData.firstname"
                      id="firstname"
                      name="firstname"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="lastname"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Lastname
                  </label>
                  <div class="mt-1">
                    <FormInput
                      v-model="formData.lastname"
                      id="lastname"
                      name="lastname"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div class="mt-1">
                    <FormInput
                      v-model="formData.email"
                      id="email"
                      name="email"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="department"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <div class="mt-1">
                    <MultiSelect
                      required
                      searchable
                      id="department"
                      value="id"
                      label="name"
                      valueProp="id"
                      v-model="formData.department_id"
                      :options="departments.data"
                      placeholder="Select department"
                    >
                    </MultiSelect>
                  </div>
                </div>
                <div>
                  <label
                    for="role"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <div class="mt-1">
                    <MultiSelect
                      required
                      searchable
                      id="role"
                      value="id"
                      label="name"
                      valueProp="id"
                      v-model="formData.role_id"
                      :options="roles"
                      placeholder="Select role"
                    >
                    </MultiSelect>
                  </div>
                </div>
                <div class="text-right">
                  <AppButton
                    :processing="processing"
                    :disabled="v$.$invalid"
                    @click="saveRoles"
                    type="button"
                  >
                    Submit
                  </AppButton>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { minValue, required } from "@vuelidate/validators";
import { useRole } from "../../stores/role";
import { useDepartments } from "../../stores/department";
import { useMiscellaneous } from "../../stores/miscellaneous";
import UserService from "../../service/user.service";

const props = defineProps({
  id: String
});

const $loading = inject("$loading");

const toast = useToast();
const { departments } = storeToRefs(useDepartments());
const { designations } = storeToRefs(useMiscellaneous());
const { roles } = storeToRefs(useRole());

const processing = ref(false);
const formData = ref({
  email: "",
  lastname: "",
  username: "",
  firstname: "",
  role_id: 0,
  department_id: 0,
  designation_id: 0,
})

const rules = {
  email: { required },
  lastname: { required },
  firstname: { required },
  username: { required },
  role_id: { required, minValue: minValue(1) },
  department_id: { required, minValue: minValue(1) },
  designation_id: { required, minValue: minValue(1) },
};

const v$ = useVuelidate(rules, formData);

function saveRoles() {
  processing.value = true;

  UserService.create(formData.value)
    .then(() => {
      toast.success("User successfully created");
      Object.keys(formData.value).forEach((key) => {
        formData.value[key] = "";
      });

      formData.value.department_id = 0;
      formData.value.designation_id = 0;
      formData.value.role_id = 0;
      v$.value.$reset();
    })
    .catch((error) => {
      if (error.code === "062") {
        toast.error("User name already exist");
      } else {
        toast.error(error.data.message);
      }
    })
    .finally(() => {
      processing.value = false;
    });
}

onMounted(() => {
  const loader = $loading.show();
  UserService.single(Number(props.id)).then(response => {
    console.log(response);
  }).catch(() => {})
  .finally(() => {
    loader.hide();
  })
})
</script>
