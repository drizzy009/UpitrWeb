import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { vue3Debounce } from 'vue-debounce';
import Toast from 'vue-toastification';
import Editor from '@tinymce/tinymce-vue';
import VueSweetalert2 from 'vue-sweetalert2';
import Multiselect from '@vueform/multiselect';
import { QuillEditor } from '@vueup/vue-quill';
import CKEditor from '@ckeditor/ckeditor5-vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import SideBar from './components/layout/SideBar.vue';
import TextArea from './components/forms/TextArea.vue';
import DateInput from './components/forms/DateInput.vue';
import FormInput from './components/forms/FormInput.vue';
import NumberInput from './components/forms/NumberInput.vue';
import TextInputGroup from './components/forms/TextInputGroup.vue';
import PasswordInput from './components/forms/PasswordInput.vue';
import AppButton from './components/forms/AppButton.vue';
import IconButton from './components/forms/IconButton.vue';
import AutoComplete from './components/forms/AutoComplete.vue';
import SelectInput from './components/forms/SelectInput.vue';
import SelectInput2 from './components/forms/SelectInput2.vue';
import CancelButton from './components/forms/CancelButton.vue';
import AppModal from './components/commons/modal/AppModal.vue';
import SkeletonLoading from './components/layout/SkeletonLoading.vue';
import CoreService from  './service/core.service';
// import TokenService from './service/token.service';
import TagInput from "./components/forms/TagInput.vue";
import { useAppStore } from './stores/app';

import 'sweetalert2/dist/sweetalert2.min.css';
import "vue-toastification/dist/index.css";
import 'vue3-easy-data-table/dist/style.css';
import "@vueform/multiselect/themes/default.css";
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const options = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
};

import App from './App.vue';
import router from './router';
CoreService.init();

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(CKEditor);
app.use(VueSweetalert2);

app.component('SideBar', SideBar);
app.component('TextArea', TextArea);
app.component('AppModal', AppModal);
app.component('FormInput', FormInput);
app.component('DateInput', DateInput);
app.component('AppButton', AppButton);
app.component('IconButton', IconButton);
app.component('SelectInput', SelectInput);
app.component('NumberInput', NumberInput);
app.component('SelectInput2', SelectInput2);
app.component('AutoComplete', AutoComplete);
app.component('CancelButton', CancelButton);
app.component('PasswordInput', PasswordInput);
app.component('DataTable', Vue3EasyDataTable);
app.component('TextInputGroup', TextInputGroup);
app.component('SkeletonLoading', SkeletonLoading);
app.component('MultiSelect', Multiselect);
app.component("TagInput", TagInput);
app.component('HtmlEditor', Editor);
app.component('QuillEditor', QuillEditor)
app.use(Toast, options);
app.directive('debounce', vue3Debounce({ lock: true}));
const appStore = useAppStore();

router.beforeEach((to) =>
{
    if (to.meta?.pageTitle) {
        document.title = to.meta?.pageTitle;
        appStore.setPageTitle(to.meta?.pageTitle);
    }
    appStore.setPageName(to.name);
})

app.mount('#app');
