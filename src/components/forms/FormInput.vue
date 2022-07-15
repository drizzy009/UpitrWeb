<template>
  <!-- <input
    v-bind="$attrs"
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  /> -->
  <div class="relative mt-1 rounded-md shadow-sm">
    <input
      v-bind="$attrs"
      type="text"
      :class="[!error ? 'text-input' : 'text-input-error']"
      aria-invalid="true"
      aria-describedby="error"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div
      v-if="error"
      class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
    >
      <ExclamationCircleIcon class="w-5 h-5 text-red-500" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/solid';

defineProps({
  modelValue: [String, Number],
  error: Boolean,
});

</script>

<style></style>
