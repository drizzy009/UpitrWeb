<template>
  <select
    v-bind="$attr"
    class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  >
    <option v-for="item in items" v-bind:key="item.id" v-bind:value="item">
        {{ item.name }}
    </option>
  </select>
</template>

<script>
export default {
    name: 'SelectInput',
    props: ['items']
};
</script>

<style></style>
