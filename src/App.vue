<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useMiscellaneous } from "./stores/miscellaneous";

const miscStore = useMiscellaneous();

onMounted(() => {
  try {
    miscStore.fetchCountries();
    miscStore.fetchCurrencies();
    miscStore.fetchIndustries();
    miscStore.fetchDesignations();
    miscStore.fetchJobFunctions();
    miscStore.fetchEmploymentTypes();
    miscStore.fetchEducationLevels();
    miscStore.fetchExperienceLevels();
  } catch (error) {
    // console.log(error);
  }
})
</script>

<template>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>
