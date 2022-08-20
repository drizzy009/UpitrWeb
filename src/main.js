import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { vue3Debounce } from 'vue-debounce';
import { QuillEditor } from '@vueup/vue-quill';
import { VTooltip, Tooltip } from 'floating-vue';
import rate from 'vue-rate';
import Toast from 'vue-toastification';
import Editor from '@tinymce/tinymce-vue';
import Datepicker from '@vuepic/vue-datepicker';
import VueSweetalert2 from 'vue-sweetalert2';
import VueLoading from 'vue-loading-overlay';
import Multiselect from '@vueform/multiselect';
import CKEditor from '@ckeditor/ckeditor5-vue';
import vue3StarRatings from "vue3-star-ratings";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import SideBar from './components/layout/SideBar.vue';
import TextArea from './components/forms/TextArea.vue';
import TagInput from "./components/forms/TagInput.vue";
import FormInput from './components/forms/FormInput.vue';
import DateInput from './components/forms/DateInput.vue';
import AppButton from './components/forms/AppButton.vue';
import IconButton from './components/forms/IconButton.vue';
import NumberInput from './components/forms/NumberInput.vue';
import SelectInput from './components/forms/SelectInput.vue';
import AutoComplete from './components/forms/AutoComplete.vue';
import CancelButton from './components/forms/CancelButton.vue';
import AppModal from './components/commons/modal/AppModal.vue';
import PasswordInput from './components/forms/PasswordInput.vue';
import TextInputGroup from './components/forms/TextInputGroup.vue';
import SkeletonLoading from './components/layout/SkeletonLoading.vue';
import CoreService from  './service/core.service';
// import TokenService from './service/token.service';
import { useAppStore } from './stores/app';
import { useAuthentication } from './stores/authentication';

import 'floating-vue/dist/style.css'
import 'vue-rate/dist/vue-rate.css';
import "vue-toastification/dist/index.css";
import 'vue3-easy-data-table/dist/style.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import "@vueform/multiselect/themes/default.css";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'vue-loading-overlay/dist/vue-loading.css';


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

app.use(rate);
app.use(Toast, options);
app.use(pinia);
app.use(router);
app.use(CKEditor);
app.use(VueLoading, {
    color: 'blue'
});

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
app.component('AutoComplete', AutoComplete);
app.component('CancelButton', CancelButton);
app.component('PasswordInput', PasswordInput);
app.component('DataTable', Vue3EasyDataTable);
app.component('TextInputGroup', TextInputGroup);
app.component('SkeletonLoading', SkeletonLoading);
app.component("TagInput", TagInput);
app.component('HtmlEditor', Editor);
app.component('DatePicker', Datepicker);
app.component('QuillEditor', QuillEditor);
app.component('MultiSelect', Multiselect);
app.component('star-rating', vue3StarRatings);
app.component('VTooltip', Tooltip);

app.directive('debounce', vue3Debounce({ lock: true}));
app.directive('tooltip', VTooltip);
const appStore = useAppStore();
const { loginInfo } = useAuthentication();

router.beforeEach((to) =>
{
    if ("permission" in to.meta) {
        const userPermission = loginInfo.role.permissions.find(permission => permission.name === to.meta.permission);
        if (userPermission === undefined) {
            return { name: 'Unauthorise' }
        }
    }

    // if (!isAuthenticated) {
    //     return { name: 'Login' }
    // }

    if (to.meta?.pageTitle) {
        document.title = to.meta?.pageTitle;
        appStore.setPageTitle(to.meta?.pageTitle);
    }
    appStore.setPageName(to.name);
})

app.mount('#app');
