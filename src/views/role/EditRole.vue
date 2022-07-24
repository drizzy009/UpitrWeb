<template>
  <main class="flex-1">
    <div class="px-4 mx-auto mt-6 max-w-7xl sm:px-6 lg:px-6">
      <div class="px-4 sm:px-6 md:px-0">
        <div
          class="flex flex-col justify-center min-h-full py-12 bg-white sm:px-6 lg:px-8"
        >
            <div class="px-4 py-2 shadow sm:rounded-lg sm:px-10">
              <form class="space-y-6 sm:mx-auto sm:w-full sm:max-w-lg">
                <div>
                  <label
                    for="roleName"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Role Name
                  </label>
                  <div class="mt-1">
                    <FormInput
                      v-model="roleName"
                      id="roleName"
                      name="roleName"
                    />
                  </div>
                </div>
                <div class="text-right">
                  <AppButton
                    :processing="processing"
                    @click="saveRoles"
                    type="button"
                  >
                    Submit
                  </AppButton>
                </div>
              </form>

              <div class="flex flex-wrap mt-6 lg:w-full">
                <div
                  class="w-full p-4 mx-auto my-4 lg:w-1/4 md:1/3"
                  v-for="(permission, index) in permissionLists"
                  :key="permission.id"
                >
                  <div class="w-full">
                     <label
                        class="text-base font-medium text-gray-900 capitalize"
                      >
                        <span class="pr-2">{{ index + 1 }}.</span>
                        {{ permission.name }}</label
                      >
                      <fieldset class="mt-4">
                        <div class="space-y-4">
                          <div
                            :key="option"
                            class="flex items-center"
                            v-for="option in permission.permissions"
                          >
                            <input
                              type="checkbox"
                              :id="option.id"
                              :name="option.name"
                              :checked="option.checked"
                              v-model="option.checked"
                              class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <label
                              :for="option.id"
                              class="block ml-3 text-sm font-medium text-gray-700"
                            >
                              {{ option.name }}
                            </label>
                          </div>
                        </div>
                      </fieldset>
                  </div>
                </div>
              </div>
              <div class="mt-6">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                </div>
              </div>
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
import { useRole } from "../../stores/role";
import RoleService from "../../service/role.service";

const props = defineProps({
  id: String
});

const $loading = inject("$loading");

const toast = useToast();
const roleStore = useRole();
const { permissions } = storeToRefs(useRole());

const roleName = ref("");
const processing = ref(false);
const permissionLists = ref(permissions);
const rolePermissions = ref([]);

function saveRoles() {
  processing.value = true;
  const payload = {
    name: roleName.value,
    permissions: [],
  };

  permissionLists.value.forEach((item) => {
    item.permissions.forEach((permission) => {
      if (permission.checked) payload.permissions.push(permission.id);
    });
  });

  if (payload.name === "" || payload.permissions.length === 0) {
    toast.warning("Role name and Permissions are required");
    processing.value = false;
    return;
  }

  RoleService.update(Number(props.id), payload)
    .then(() => {
      toast.success("Role successfully saved");
      roleStore.fetchAllRoles();
      // roleStore.fetchAllPermissions();
    })
    .catch((error) => {
      if (error.code === "062") {
        toast.error("Role name already exist");
      } else {
        toast.error("Something went wrong, please try again later");
      }
    })
    .finally(() => {
      processing.value = false;
    });
}

onMounted(() => {
  const loader = $loading.show();
  RoleService.single(Number(props.id)).then(response => {
    const { data } = response.data;
    roleName.value = data.name;
    rolePermissions.value = data.permissions;
    rolePermissions.value.forEach(permission => {
      const groupIndex = permissionLists.value.findIndex(p => p.id === permission.group_id);
      const permissionIndex = permissionLists.value[groupIndex].permissions.findIndex(p => p.id === permission.id);
      permissionLists.value[groupIndex].permissions[permissionIndex].checked = true;
    })
  }).catch(() => {})
  .finally(() => {
    loader.hide();
  })
})
</script>
