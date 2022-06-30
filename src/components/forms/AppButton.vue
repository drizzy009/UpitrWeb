<template>
  <button
    v-bind="$attr"
    class="
      inline-flex
      items-center
      px-4
      py-2
      shadow-sm
      text-sm
      font-medium
      rounded-sm
      text-white
      bg-indigo-600
      hover:bg-indigo-700
      border border-transparent
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    :disabled="processing"
    :class="processing ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <template v-if="processing">
      <div class="loading"><div></div><div></div><div></div><div></div></div>
      Processing...
    </template>
    <template v-if="!processing">
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