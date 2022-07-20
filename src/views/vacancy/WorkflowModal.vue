<template>
  <AppModal :showModal="showWorkflowModal" :processing="savingWorkflowStage" @closeModal="closeWorkflowModal"
    @submit="saveWorkflowStage" title="Change Applicant(s) Workflow Stage">
    <div class="grid grid-cols-6">
      <div class="col-span-6 mb-3">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-700">Workflow Stages</label>
        <MultiSelect
          searchable
          value="order"
          label="name"
          valueProp="order"
          placeholder="Select a stage"
          v-model="formData.job_workflow_stage_id"
          :options="workflowStages"
        ></MultiSelect>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import ApplicantService from "../../service/applicant.service";

const emits = defineEmits(["toggleWorkflowModal"]);
const props = defineProps({
  toggle: Boolean,
  workflowStages: Array,
  applicants: Array,
});

const toast = useToast();
// const departmentStore = useDepartments();
const savingWorkflowStage = ref(false);
const showWorkflowModal = ref(false);
const formData = ref({
  job_workflow_stage_id: 0,
  applicants: null,
})

watch(
  () => props.toggle,
  (newValue) => {
    showWorkflowModal.value = newValue;
  }
);

function closeWorkflowModal() {
  showWorkflowModal.value = false;
  emits("toggleWorkflowModal", { loadApplicants: false });
}

async function saveWorkflowStage() {
  savingWorkflowStage.value = true;
  formData.value.applicants = props.applicants;
  ApplicantService.changeWorkflowStageBulk(formData.value)
    .then(async () => {
      toast.success("Workflow stage successfuly changed");
      formData.value.applicants = [];
      formData.value.job_workflow_stage_id = 0;
      emits("toggleWorkflowModal", { loadApplicants: true });
    })
    .catch(() => { })
    .finally(() => {
      savingWorkflowStage.value = false;
    });
}
</script>

<style>
</style>
