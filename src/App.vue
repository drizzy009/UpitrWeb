<script setup>
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import TokenService from "./service/token.service";
import { useDepartments } from "./stores/department";
import { useVacancies } from "./stores/vacancies";
import { useCandidates } from "./stores/candidate";
import { useMiscellaneous } from "./stores/miscellaneous";
import { useAuthentication } from "./stores/authentication";

const router = useRouter();
const vacancyStore = useVacancies();
const miscStore = useMiscellaneous();
const candidateStore = useCandidates();
const departmentStore = useDepartments();

const { isAuthenticated } = storeToRefs(useAuthentication());

function fetchRequiredData () {
    miscStore.fetchCountries();
    miscStore.fetchCurrencies();
    miscStore.fetchIndustries();
    miscStore.fetchDesignations();
    miscStore.fetchJobFunctions();
    miscStore.fetchQuestionTypes();
    miscStore.fetchEmploymentTypes();
    miscStore.fetchEducationLevels();
    miscStore.fetchExperienceLevels();
    miscStore.fetchDegreeClassification();

    vacancyStore.fetchAllVacancies();
    candidateStore.fetchAllCandidates();
    departmentStore.fetchAllDepartments();
}

onMounted(() => {
  try {
    const token = TokenService.getToken();
    if (isAuthenticated.value) {
      fetchRequiredData();
    }

    if (!isAuthenticated.value || token === null) {
      router.push({ name: 'Login' });
    }
  } catch (error) {
    // console.log(error);
  }
})

watch(() => isAuthenticated.value, (value) => {
  if (value) {
    fetchRequiredData();
  }
});
</script>

<template>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>
