<template>
    <input
      v-bind="attrs"
      type="date"
      :class="[!error ? 'text-input' : 'text-input-error']"
      aria-invalid="true"
      aria-describedby="error"
      :value="modelValue"
      @input="updateValue"
    />
</template>

<script setup>
import { useAttrs } from "vue";
const attrs = useAttrs();
defineProps({
  modelValue: [Date, String],
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
