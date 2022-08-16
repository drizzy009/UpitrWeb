<template>
  <button
    v-bind="$attr"
    class="inline-flex items-center px-4 py-2 text-sm font-medium bg-indigo-200 text-indigo-700 border border-transparent rounded-sm shadow-sm hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
    :disabled="processing"
    :class="processing ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <template v-if="processing">
      <div class="loading"><div></div><div></div><div></div><div></div></div>
      Processing...
    </template>
    <template v-if="!processing">
      <slot></slot>
      {{$attrs.label}}
    </template>
  </button>
</template>

<script setup>
defineProps({
  processing: Boolean,
});
</script>

<style>
</style>