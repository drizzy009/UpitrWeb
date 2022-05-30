<template>
  <input
    v-bind="$attr"
    type="text"
    class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
  />
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "FormInput",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    let innerValue = ref("");
    watch(props.value, (currentValue) => {
      innerValue = currentValue;
    })
    watch(innerValue, (currentValue) => {
      emit('input', currentValue);
    })
    return {
      innerValue,
    };
  },
};
</script>

<style></style>
