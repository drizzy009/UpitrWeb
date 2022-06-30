<script setup>
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useDepartments } from "./stores/department";
import { useMiscellaneous } from "./stores/miscellaneous";
import { useAuthentication } from "./stores/authentication";

const router = useRouter();
const miscStore = useMiscellaneous();
const useDepartmentStore = useDepartments();

const { isAuthenticated } = storeToRefs(useAuthentication());

onMounted(() => {
  try {
    miscStore.fetchCountries();
    miscStore.fetchCurrencies();
    miscStore.fetchIndustries();
    miscStore.fetchDesignations();
    miscStore.fetchJobFunctions();
    miscStore.fetchQuestionTypes();
    miscStore.fetchEmploymentTypes();
    miscStore.fetchEducationLevels();
    miscStore.fetchExperienceLevels();

    if (isAuthenticated.value) {
      useDepartmentStore.reset();
      useDepartmentStore.fetchAllDepartments();
    }

    if (!isAuthenticated.value) {
      router.push({ name: 'Login'})
    }
  } catch (error) {
    // console.log(error);
  }
})

watch(() => isAuthenticated.value, (value) => {
  if (value) {
    useDepartmentStore.reset();
    useDepartmentStore.fetchAllDepartments();
  }
});
</script>

<template>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>
