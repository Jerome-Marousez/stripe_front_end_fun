import { createApp } from 'vue'
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";

const vueQueryPluginOptions = {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    },
}
const app = createApp(App)

app.use(VueQueryPlugin, vueQueryPluginOptions )

app.mount('#app')
