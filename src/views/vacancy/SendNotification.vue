<template>
  <AppModal
    :showModal="showNotificationModal"
    :processing="sendingNotification"
    @closeModal="closeNotification"
    @submit="sendNotification"
    title="Send Notification"
  >
    <div class="grid grid-cols-6">
      <div class="col-span-6">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-700"
          >Title</label
        >
        <FormInput
          :error="v$.title.$error"
          id="title"
          v-model="formData.title"
        ></FormInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-700"
          >Description</label
        >
        <TextArea id="description" v-model="formData.description"></TextArea>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useMiscellaneous } from "../../stores/miscellaneous";
import { useAuthentication } from "../../stores/authentication";
import MessageService from "../../service/message.service";

const emits = defineEmits(["toggleNotification"]);
const props = defineProps({
  toggle: Boolean,
  applicants: Array,
});

const toast = useToast();
const { userTypes } = storeToRefs(useMiscellaneous());
const { loginInfo } = storeToRefs(useAuthentication());

const sendingNotification = ref(false);
const showNotificationModal = ref(false);

const formData = ref({
  title: "",
  description: "",
});

const rules = {
  title: { required },
  description: { required },
};

const v$ = useVuelidate(rules, formData);

watch(
  () => props.toggle,
  (newValue) => {
    showNotificationModal.value = newValue;
  }
);

function closeNotification() {
  showNotificationModal.value = false;
  emits("toggleNotification");
}

async function sendNotification() {
  const valid = await v$.value.$validate();
  if (valid) {
    sendingNotification.value = true;
    props.applicants.forEach((id) => {
      const payload = {
        from_user_type_id: userTypes.value.find(
          (type) => type.name !== "Candidate"
        ).value,
        to_user_type_id: userTypes.value.find(
          (type) => type.name === "Candidate"
        ).value,
        subject: formData.value.title,
        body: formData.value.description,
        user_id: loginInfo.value.id,
        candidate_id: id,
        reply_to_id: loginInfo.value.id,
      };

      MessageService.create(payload);
    });

    sendingNotification.value = false;
    toast.success("Notification was successfully sent");
    closeNotification();
    return;
  }

  toast.warning("Enter title and description");
}
</script>

<style></style>
