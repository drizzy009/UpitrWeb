import { createApp } from 'vue';
import { createPinia } from 'pinia';
import CKEditor from '@ckeditor/ckeditor5-vue';
import TextArea from './components/forms/TextArea.vue';
import FormInput from './components/forms/FormInput.vue';
import AppButton from './components/forms/AppButton.vue';
import IconButton from './components/forms/IconButton.vue';
import AutoComplete from './components/forms/AutoComplete.vue';
import SelectInput from './components/forms/SelectInput.vue';
import CancelButton from './components/forms/CancelButton.vue';
import { useAppStore } from './stores/app';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CKEditor);

app.component('TextArea', TextArea)
app.component('FormInput', FormInput)
app.component('AppButton', AppButton)
app.component('IconButton', IconButton)
app.component('SelectInput', SelectInput)
app.component('AutoComplete', AutoComplete)
app.component('CancelButton', CancelButton)

const appStore = useAppStore();

router.beforeEach((to) =>
{
    if (to.meta?.pageTitle) {
        document.title = to.meta?.pageTitle;
        appStore.setPageTitle(to.meta?.pageTitle);
    }
})
app.mount('#app')
