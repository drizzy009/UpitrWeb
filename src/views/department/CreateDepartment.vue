<template>
  <AppModal
    :showModal="showAddDepartment"
    :processing="savingDepartment"
    @closeModal="closeCreateDepartment"
    @submit="saveDepartment"
    title="Create Department"
  >
    <div class="grid grid-cols-6">
      <div class="col-span-6">
        <label
          for="departmentName"
          class="block mb-2 text-sm font-medium text-gray-700"
          >Department Name</label
        >
        <FormInput
          :error="v$.name.$error"
          id="departmentName"
          v-model="formData.name"
        ></FormInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-700"
          >Description</label
        >
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
import { useDepartments } from "../../stores/department";
import DepartmentService from "../../service/department.service";
const emits = defineEmits(["toggleDepartment"]);
const props = defineProps({
  toggle: Boolean,
});

const toast = useToast();
const departmentStore = useDepartments();
const savingDepartment = ref(false);
const showAddDepartment = ref(false);
const formData = ref({
  name: "",
  description: "",
});

const rules = {
  name: { required },
  description: { required },
};

const v$ = useVuelidate(rules, formData);

watch(
  () => props.toggle,
  (newValue) => {
    showAddDepartment.value = newValue;
  }
);

function closeCreateDepartment() {
  showAddDepartment.value = false;
  emits("toggleDepartment");
}

async function saveDepartment() {
  const valid = await v$.value.$validate();
  if (valid) {
    savingDepartment.value = true;
    DepartmentService.create(formData.value)
      .then(() => {
        toast.success("Department successfully created");
        departmentStore.fetchAllDepartments();
        formData.value.name = "";
        formData.value.description = "";
        v$.value.$reset();
      })
      .catch(() => {})
      .finally(() => {
        savingDepartment.value = false;
      });
  }
}
</script>

<style></style>
