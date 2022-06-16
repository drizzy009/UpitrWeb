<template>
  <AppModal :showModal="showAddActivity" @closeModal="closeCreateActivity" @submit="saveActivity" title="Add Activity">
    <div class="grid grid-cols-6">
      <div class="col-span-6">
        <label
          for="activityTitle"
          class="block text-sm font-medium text-gray-700 mb-2"
        >Activity Title</label>
        <FormInput :error="v$.title.$error" id="activityTitle" v-model="formData.title"></FormInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <Listbox as="div" v-model="selected">
          <ListboxLabel class="block text-sm font-medium text-gray-700"> Task Category </ListboxLabel>
          <div class="mt-1 relative">
            <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span class="flex items-center">
                <component
                  :is="selected.icon"
                  class="flex-shrink-0 h-4 w-4 rounded-full"
                  aria-hidden="true"
                />
                <span class="ml-3 block truncate">{{ selected.name }}</span>
              </span>
              <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="taskType in taskTypes" :key="taskType.id" :value="taskType" v-slot="{ active, selected }">
                  <li :class="[active ? 'text-white bg-indigo-600 cursor-pointer' : 'text-gray-900', 'select-none relative py-2 pl-3 pr-9']">
                    <div class="flex items-center">
                      <component
                        :is="taskType.icon"
                        :class="['flex-shrink-0 h-4 w-4 rounded-full', active ? 'text-white': 'text-indigo-600']"
                        aria-hidden="true"
                      />
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                        {{ taskType.name }}
                      </span>
                    </div>

                    <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="relatedTo"
          class="block text-sm font-medium text-gray-700 mb-2"
        >Related To</label>
        <FormInput id="relatedTo" v-model="formData.relatedTo"></FormInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="attendees"
          class="block text-sm font-medium text-gray-700 mb-2"
        >Attendees</label>
        <FormInput id="attendees" v-model="formData.attendees"></FormInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="location"
          class="block text-sm font-medium text-gray-700 mb-2"
        >Location</label>
        <SelectInput
          v-model="formData.locationId"
          :error="v$.locationId.$error"
          :items="[
            { name: 'Lagos', id: 1 },
            { name: 'Ogun', id: 2 },
            { name: 'Rivers', id: 3 },
            { name: 'Oyo', id: 4 },
            { name: 'Enugu', id: 5 },
            { name: 'Kano', id: 5 },
            { name: 'Kaduna', id: 5 },
          ]"
          id="location"
        ></SelectInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 mb-2"
        >Description</label>
        <TextArea id="description" v-model="formData.description"></TextArea>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { ref, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, SelectorIcon, PhoneIcon, UserGroupIcon, CalendarIcon, MailIcon, UserCircleIcon } from '@heroicons/vue/solid'
import { required } from '@vuelidate/validators';
const emits = defineEmits(['toggleActivity']);
const props = defineProps({
  toggle: Boolean,
});

const showAddActivity = ref(false);

const formData = ref({
  title: '',
  attendees: '',
  relatedTo: '',
  description: '',
  locationId: '',
});

const rules = {
  title: { required },
  locationId: { required }
}

const taskTypes = [
  {
    id: 1,
    name: 'Call',
    icon: PhoneIcon,
  },
  {
    id: 2,
    name: 'Meeting',
    icon: UserGroupIcon,
  },
  {
    id: 3,
    name: 'Task',
    icon: CalendarIcon,
  },
  {
    id: 4,
    name: 'Email',
    icon: MailIcon,
  },
  {
    id: 5,
    name: 'Interview',
    icon: UserCircleIcon,
  }
]

const selected = ref(taskTypes[0]);

const v$ = useVuelidate(rules, formData);

watch(() => props.toggle, (newValue) => {
  showAddActivity.value = newValue;
});

function closeCreateActivity() {
  showAddActivity.value = false
  emits('toggleActivity');
}

async function saveActivity() {
  const valid = await v$.value.$validate();
}

</script>

<style>

</style>