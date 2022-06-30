<template>
  <AppModal :showModal="showAddDepartment" @closeModal="closeCreateDepartment" @submit="saveDepartment" title="Create Department">
    <div class="grid grid-cols-6">
      <div class="col-span-6">
        <label
          for="departmentName"
          class="block text-sm font-medium text-gray-700 mb-2"
        >Department Name</label>
        <FormInput :error="v$.name.$error" id="departmentName" v-model="formData.name"></FormInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 mb-2"
        >Description</label>
        <TextArea id="description" v-model="formData.description"></TextArea>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="location"
          class="block text-sm font-medium text-gray-700 mb-2"
        >Location</label>
        <SelectInput
          v-model="formData.locationId"
          :error="v$.locationId.$error"
          placeholder="Select Location"
          :items="[
            { name: 'Lagos', id: 1 },
            { name: 'Ogun', id: 2 },
            { name: 'Rivers', id: 3 },
            { name: 'Oyo', id: 4 },
            { name: 'Enugu', id: 5 },
            { name: 'Kano', id: 5 },
            { name: 'Kaduna', id: 5 },
          ]"
          id="location"
        ></SelectInput>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { ref, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
const emits = defineEmits(['toggleDepartment']);
const props = defineProps({
  toggle: Boolean,
});

const showAddDepartment = ref(false);
const formData = ref({
  name: '',
  description: '',
  locationId: '',
});

const rules = {
  name: { required },
  locationId: { required }
}

const v$ = useVuelidate(rules, formData);

watch(() => props.toggle, (newValue) => {
  showAddDepartment.value = newValue;
});

function closeCreateDepartment() {
  showAddDepartment.value = false
  emits('toggleDepartment');
}

async function saveDepartment() {
  const valid = await v$.value.$validate();
}

</script>

<style>

</style>