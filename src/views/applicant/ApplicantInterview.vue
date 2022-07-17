<template>
  <AppModal
    :showModal="showInterview"
    @closeModal="closeInterview"
    title="Applicant Interview"
  >
    <div class="border-t border-gray-200">
      <dl
        v-for="section in interviewSection.interview_sections"
        :key="section.id"
      >
        <div class="px-4 py-1 bg-white border-b border-gray-200 sm:px-6">
          <div
            class="flex flex-wrap items-center justify-between -ml-4 sm:flex-nowrap"
          >
            <div class="ml-4">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ section.title }}
              </h3>
            </div>
            <div class="flex-shrink-0 ml-4">
              <star-rating starSize="20" v-model="section.rating" />
            </div>
          </div>
          <div
            v-for="question in section.interview_questions"
            :key="question.id"
            class="flex flex-col w-full"
          >
            <div class="py-2">
              <!-- <h5 class="text-sm">{{question.title}}</h5> -->
              <p class="text-xs text-gray-700">
                {{ question.question }}
              </p>
            </div>
          </div>
        </div>
      </dl>
    </div>
    <div class="grid grid-cols-6">
      <div class="col-span-6">
        <label
          for="feedback"
          class="block mb-2 text-sm font-medium text-gray-700"
          >Feedback</label
        >
        <TextArea id="description" v-model="feedback"></TextArea>
      </div>
    </div>
  </AppModal>
</template>
<script setup>
import { ref, watch, inject, onMounted } from "vue";
import moment from "moment";
// import { FormatLongDate } from "../../util/Formatter";
import InterviewService from "../../service/interview.service";
import AppModal from "../../components/commons/modal/AppModal.vue";

const emits = defineEmits(["toggleInterview"]);
const props = defineProps({
  toggle: Boolean,
  interviewId: String,
  applicantId: String,
});

const feedback = ref("");
const swal = inject("$swal");
const results = ref(null);
const processing = ref(false);
const showInterview = ref(false);
const interviewSection = ref([]);

watch(
  () => props.toggle,
  (newValue) => {
    showInterview.value = newValue;
  }
);

function submitInterview() {
  processing.value = true;
  const sectionRating = [];
  interviewSection.value.interview_sections.forEach((section) => {
    sectionRating.push({
      rating: section.rating || 0,
      interview_section_id: Number(section.id),
    });
  });

  const endTime = moment().utc(); //.format('MM-DD-YYYY h:mm:ss a');
  const startTime = moment().add(-30, "minutes").utc(); //.format('MM-DD-YYYY h:mm:ss a');
  const payload = {
    applicant_id: Number(props.applicantId),
    interview_id: Number(props.interviewId),
    feedback: feedback.value,
    start_time: startTime,
    end_time: endTime,
    feedbacks: sectionRating,
  };

  InterviewService.saveInterviewFeedback(payload)
    .then(() => {
      swal({
        title: "Success",
        text: "Interview feedback successfully saved",
        icon: "success",
      });
    })
    .catch((err) => {
      swal({
        title: "Error",
        text: err.data.data,
        icon: "error",
      });
    })
    .finally(() => {
      processing.value = false;
    });
}

function closeInterview() {
  showInterview.value = false;
  emits("toggleInterview");
}

function getInterviews() {
  InterviewService.getVacancyInterview(Number(props.interviewId)).then(
    (response) => {
      interviewSection.value = response.data.data;
    }
  );
}

onMounted(() => {
  getInterviews();
});
</script>
