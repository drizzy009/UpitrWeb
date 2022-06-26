import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import CKEditor from '@ckeditor/ckeditor5-vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import SideBar from './components/layout/SideBar.vue';
import TextArea from './components/forms/TextArea.vue';
import FormInput from './components/forms/FormInput.vue';
import TextInputGroup from './components/forms/TextInputGroup.vue';
import PasswordInput from './components/forms/PasswordInput.vue';
import AppButton from './components/forms/AppButton.vue';
import IconButton from './components/forms/IconButton.vue';
import AutoComplete from './components/forms/AutoComplete.vue';
import SelectInput from './components/forms/SelectInput.vue';
import CancelButton from './components/forms/CancelButton.vue';
import AppModal from './components/commons/modal/AppModal.vue';
import CoreService from  './service/core.service';
import TokenService from './service/token.service';
import { useAppStore } from './stores/app';
import "vue-toastification/dist/index.css";

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

app.component('SideBar', SideBar);
app.component('TextArea', TextArea);
app.component('FormInput', FormInput);
app.component('AppButton', AppButton);
app.component('IconButton', IconButton);
app.component('SelectInput', SelectInput);
app.component('AutoComplete', AutoComplete);
app.component('CancelButton', CancelButton);
app.component('PasswordInput', PasswordInput);
app.component('TextInputGroup', TextInputGroup);
// eslint-disable-next-line vue/multi-word-component-names
app.component('AppModal', AppModal);
app.use(Toast, options);

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
