<template>
  <div class="relative mt-1 rounded-md shadow-sm">
    <input
      v-bind="attrs"
      type="text"
      :class="[!error ? 'text-input' : 'text-input-error']"
      aria-invalid="true"
      aria-describedby="error"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>

<script setup>
import { useAttrs } from "vue";
// import { ExclamationCircleIcon } from '@heroicons/vue/solid';

const attrs = useAttrs();
defineProps({
  modelValue: [String, Number],
  error: {
    type: Boolean,
    required: false,
    default: false
  },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
}

</script>

<style></style>
