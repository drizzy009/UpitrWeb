<template>
  <div class="mt-1 relative rounded-md shadow-sm">
    <select v-bind="attrs" :v-model="modelValue" @change="$emit('update:modelValue', $event.target.value)"
      class="select-input" :class="[!error ? 'select-input' : 'select-input-error']">
      <option value="-1">
        {{ placeholder }}
      </option>
      <option v-for="item in items" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
    </select>
    <div v-if="error" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();
defineProps({
  items: Array,
  modelValue: [String, Number],
  error: {
    type: Boolean,
    required: false,
    default: false
  },
  placeholder: {
    type: String,
    required: false
  }
})
</script>

<style>
</style>
