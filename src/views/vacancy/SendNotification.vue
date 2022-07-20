<template>
  <AppModal :showModal="showNotificationModal" :processing="savingNotification" @closeModal="closeNotification"
    @submit="saveNotification" title="Send Notification">
    <div class="grid grid-cols-6">
      <div class="col-span-6">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-700">Title</label>
        <FormInput :error="v$.title.$error" id="title" v-model="formData.title"></FormInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label for="description" class="block mb-2 text-sm font-medium text-gray-700">Description</label>
        <TextArea id="description" v-model="formData.description"></TextArea>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
const emits = defineEmits(["toggleNotification"]);
const props = defineProps({
  toggle: Boolean,
  applicants: Array
});

const toast = useToast();
// const departmentStore = useDepartments();
const savingNotification = ref(false);
const showNotificationModal = ref(false);
const formData = ref({
  title: "",
  description: "",
});

const rules = {
  title: { required },
  description: { required },
};

const v$ = useVuelidate(rules, formData);

watch(
  () => props.toggle,
  (newValue) => {
    showNotificationModal.value = newValue;
  }
);

function closeNotification() {
  showNotificationModal.value = false;
  emits("toggleNotification");
}

async function saveNotification() {
  const valid = await v$.value.$validate();
  if (valid) {
    // savingNotification.value = true;
    // DepartmentService.create(formData.value)
    //   .then(async () => {
    //     toast.success("Department successfully created");
    //     departmentStore.fetchAllDepartments();
    //     formData.value.title = "";
    //     formData.value.description = "";
    //     await v$.value.$reset();
    //   })
    //   .catch(() => { })
    //   .finally(() => {
    //     savingNotification.value = false;
    //   });
  }
}
</script>

<style>
</style>
