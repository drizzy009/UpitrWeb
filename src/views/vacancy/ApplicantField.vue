<template>
    <RadioGroup v-model="selected" class="mt-2">
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
            <RadioGroupOption as="template" v-for="option in options" :key="option.optionName" :value="option"
                v-slot="{ active, checked }">
                <div @click="optionClicked(option)" :class="[
                    'cursor-pointer focus:outline-none',
                    active
                        ? 'ring-2 ring-offset-2 ring-green-500'
                        : '',
                    checked
                        ? 'bg-green-400 border-transparent text-white hover:bg-green-500'
                        : 'bg-[#E1E6EB] border-gray-200 text-gray-900 hover:bg-gray-50',
                    'border rounded-full py-1 px-1 flex items-center justify-center text-sm font-medium sm:flex-1',
                ]">
                    <RadioGroupLabel as="span">
                        {{ option.optionName }}
                    </RadioGroupLabel>
                </div>
            </RadioGroupOption>
        </div>
    </RadioGroup>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

const props = defineProps({
    items: Array,
    itemKey: String
});

const emits = defineEmits(["selectedOption"]);

const selected = ref(null);
const options = ref(props.items);

function optionClicked(option) {
    const itemIndex = options.value.findIndex(item => item.optionName === option.optionName);
    option.checked = true;
    options.value.forEach(item => {
        item.checked = false;
    });

    options.value[itemIndex].checked = true;
    const field = {
        key: props.itemKey,
        options: options.value
    }
    emits("selectedOption", field);
}

onMounted(() => {
    if (props.items.length > 0) {
        // console.log(props.options);
        const checkedIndex = props.items.findIndex(item => item.checked === true);
        selected.value = props.items[checkedIndex];
    }
}) 
</script>