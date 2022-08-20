<template>
  <button
    v-bind="attrs"
    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-sm shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    :disabled="processing || disabled"
    :class="processing || disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <template v-if="processing">
      <div class="loading"><div></div><div></div><div></div><div></div></div>
      {{loadingText !== undefined ? loadingText : 'Processing...'}}
    </template>
    <template v-if="!processing">
      <slot></slot>
      {{$attrs.label}}
    </template>
  </button>
</template>

<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();
defineProps({
  loadingText: String,
  processing: Boolean,
  disabled: Boolean,
});
</script>

<style>
</style>