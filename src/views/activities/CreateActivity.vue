<template>
  <AppModal :processing="savingActivity" :showModal="showAddActivity" @closeModal="closeCreateActivity" @submit="saveActivity" title="Add Activity">
    <div class="grid grid-cols-6">
      <div class="col-span-6">
        <label
          for="activityTitle"
          class="block mb-2 text-sm font-medium text-gray-700"
        >Activity Title</label>
        <FormInput :error="v$.title.$error" id="activityTitle" v-model="formData.title"></FormInput>
      </div>
      <div class="col-span-6 mt-2 mb-2 md:mt-4">
        <div class="flex flex-row">
          <div class="w-1/2 mr-1">
            <label
              for="type"
              class="block text-sm font-medium text-gray-700"
            >Activity Type</label>
            <MultiSelect
              value="value"
              label="name"
              valueProp="value"
              v-model="formData.activity_type_id"
              :options="activityTypes"
              placeholder="Select...."
            />
          </div>
          <div class="w-1/2">
            <label
              for="relatedTo"
              class="block text-sm font-medium text-gray-700"
            >Importance</label>
            <MultiSelect
              id="activityImportance"
              value="value"
              label="name"
              valueProp="value"
              v-model="formData.importance_id"
              :options="activityImportance"
              placeholder="Select...."
            />
          </div>
        </div>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="relatedTo"
          class="block mb-2 text-sm font-medium text-gray-700"
        >Related To</label>
        <MultiSelect
          id="relatedTo"
          value="value"
          label="name"
          valueProp="value"
          placeholder="Select..."
          :options="activityRelations"
          v-model="formData.related_to_id"
        ></MultiSelect>
      </div>
      <div v-if="showVacancy" class="col-span-6 mt-2 md:mt-4">
        <label
          for="vacancy"
          class="block mb-2 text-sm font-medium text-gray-700"
        >Vacancy</label>
        <MultiSelect
          searchable
          id="vacancy"
          value="id"
          label="name"
          valueProp="id"
          placeholder="Select a vacancy"
          :options="vacancyList"
          v-model="formData.job_id"
        ></MultiSelect>
      </div>
      <div v-if="showCandidate" class="col-span-6 mt-2 md:mt-4">
        <label
          for="candidate"
          class="block mb-2 text-sm font-medium text-gray-700"
        >Candidate</label>
        <MultiSelect
          searchable
          id="candidate"
          value="id"
          label="name"
          valueProp="id"
          :loading="loadingCandidate"
          placeholder="Select a candidate"
          :options="candidateList"
          v-model="formData.job_applicant_id"
        ></MultiSelect>
      </div>
      <div class="col-span-6 mt-2 mb-2 md:mt-4">
        <div class="flex flex-row">
          <div class="w-1/2 mr-1">
            <label
              for="startDate"
              class="block text-sm font-medium text-gray-700"
            >Start Date & Time</label>
            <DatePicker v-model="formData.start"></DatePicker>
          </div>
          <div class="w-1/2">
            <label
              for="endDate"
              class="block text-sm font-medium text-gray-700"
            >End Date & Time</label>
            <DatePicker v-model="formData.end"></DatePicker>
          </div>
        </div>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="assignees"
          class="block mb-2 text-sm font-medium text-gray-700"
        >Assignees</label>
        <MultiSelect closeOnSelect="false" valueProp="id" value="id" label="label" mode="tags" searchable :options="options" v-model="formData.assignees"></MultiSelect>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="meetingUrl"
          class="block mb-2 text-sm font-medium text-gray-700"
        >Meeting URL</label>
        <FormInput id="url" v-model="formData.meeting_url"></FormInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="location"
          class="block mb-2 text-sm font-medium text-gray-700"
        >Location</label>
        <FormInput id="location" v-model="formData.location"></FormInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-700"
        >Description</label>
        <TextArea id="description" v-model="formData.description"></TextArea>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { ref, watch, inject, onMounted } from 'vue';
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import '@vuepic/vue-datepicker/dist/main.css';
import { useMiscellaneous } from "../../stores/miscellaneous";
import UserService from "../../service/user.service";
import VacancyService from "../../service/vacancies.service";
import ActivityService from "../../service/activity.service";
import CandidateService from "../../service/candidate.service";

const toast = useToast();
const swal = inject("$swal");

const {
  activityTypes,
  activityRelations,
  activityImportance
} = storeToRefs(useMiscellaneous());
const emits = defineEmits(['toggleActivity', 'loadActivity']);
const props = defineProps({
  toggle: Boolean,
});

const loadingCandidate = ref(false);
const showVacancy = ref(false);
const showCandidate = ref(false);
const savingActivity = ref(false);
const showAddActivity = ref(false);
const options = ref([]);
const vacancyList = ref([]);
const candidateList = ref([]);

const formData = ref({
  end: '',
  start: '',
  title: '',
  job_id: '',
  location: '',
  status_id: 0,
  assignees: [],
  description: '',
  meeting_url: '',
  related_to_id: '',
  importance_id: '',
  job_applicant_id: '',
  activity_type_id: '',
});

const rules = {
  title: { required },
  location: { required }
}

// const taskTypes = [
//   {
//     id: 1,
//     name: 'Call',
//     icon: PhoneIcon,
//   },
//   {
//     id: 2,
//     name: 'Meeting',
//     icon: UserGroupIcon,
//   },
//   {
//     id: 3,
//     name: 'Task',
//     icon: CalendarIcon,
//   },
//   {
//     id: 4,
//     name: 'Email',
//     icon: MailIcon,
//   },
//   {
//     id: 5,
//     name: 'Interview',
//     icon: UserCircleIcon,
//   }
// ]

// const selected = ref(taskTypes[0]);
// const date = ref();

const v$ = useVuelidate(rules, formData);

function showErrorMessage(errorMessage) {
  swal({
    title: "Invalid Data",
    text: errorMessage,
    icon: "error",
  });
}

function showErrorMessages(errors) {
  var errorMessage = "";
  Object.keys(errors).forEach((key) => {
    errorMessage += `${errors[key][0]}\n`;
  });

  swal({
    title: "Invalid Data",
    text: errorMessage,
    icon: "error",
  });
}

function getCandidates(id) {
  loadingCandidate.value = true;
  CandidateService.all(`vacancy=${id}`).then(result => {
    const { data } = result.data.data;
    if (data.length > 0) {
      candidateList.value = data.map((item) => {
        return { name: `${item.firstname} ${item.lastname}`, id: item.id }
      })
    }
  }).catch(() => {})
  .finally(() => {
    loadingCandidate.value = false;
  })
}

function clearForm() {
  Object.keys(formData.value).forEach((key) => {
    if (key === 'assignees') {
      formData.value[key] = [];
    } else {
      formData.value[key] = "";
    }
  })
}

function closeCreateActivity() {
  showAddActivity.value = false
  clearForm();
  emits('toggleActivity');
}

async function saveActivity() {
  savingActivity.value = true;
  formData.value.job_id = Number(formData.value.job_id);
  formData.value.importance_id = Number(formData.value.importance_id);
  formData.value.related_to_id = Number(formData.value.related_to_id);
  formData.value.job_applicant_id = Number(formData.value.job_applicant_id);
  formData.value.activity_type_id = Number(formData.value.activity_type_id);
  formData.value.status_id = 0;

  ActivityService.create(formData.value).then(() => {
    toast.success("Activity successfully created");
    emits('loadActivity');
    closeCreateActivity();
  }).catch(error => {
    const { data } = error;
    if (data.code === "062") {
      showErrorMessages(data.data);
    } else {
      showErrorMessage(data.message);
    }
  }).finally(() => {
    savingActivity.value = false;
  })
 // const valid = await v$.value.$validate();
}

watch(() => props.toggle, (newValue) => {
  showAddActivity.value = newValue;
});

watch(() => formData.value.related_to_id, (value) => {
  const id = Number(value);
  showVacancy.value = false;
  showCandidate.value = false;
  formData.value.job_applicant_id = "";
  if (id !== -1) {
    const relatedTo = activityRelations.value.find(item => item.value === id);
    if (relatedTo.name.includes('Vacancy')) showVacancy.value = true;
    if (relatedTo.name.includes('Candidate')) {
      showVacancy.value = true;
      showCandidate.value = true;
      formData.value.job_applicant_id = 0;
    }
  }
});

watch(() => formData.value.job_id, (value) => {
  const id = Number(value);
  if (id !== -1) {
    getCandidates(id);
  }
});

onMounted(() => {
  UserService.all().then(result => {
    const { data } = result.data.data;
    options.value = data.map((item) => {
      const newObject = Object.assign(item, { label: `${item.firstname} ${item.lastname}`})
      return newObject;
    });
  })

  VacancyService.all("page_size=50").then(result => {
    const { data } = result.data.data;
    if (data.length > 0) {
      vacancyList.value = data.map((item) => {
        return { name: item.title, id: item.id }
      })
    }
  })
})
</script>

<style>

</style>