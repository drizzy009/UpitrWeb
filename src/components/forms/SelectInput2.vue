<template>
   <div class="mt-1 relative rounded-md shadow-sm">
    <MultiSelect
      required
      searchable
      :v-model="modelValue"
      :options="items"
      :placeholder="placeholder"
      @change="$emit('update:modelValue', value)"
    ></MultiSelect>
    <div
      v-if="error"
      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
    >
      <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: Array,
  modelValue: [String, Number],
  error: Boolean,
  placeholder: String,
  inputClass: String,
  dropDownClass: String,
})

function changeValue(value){
  console.log(value)
}
</script>

<style></style>
