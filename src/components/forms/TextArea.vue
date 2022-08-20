<template>
  <textarea
    v-bind="attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
  ></textarea>
</template>

<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();
defineProps({
  modelValue: String
})

</script>

<style></style>
