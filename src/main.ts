import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "./assets/main.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#39434F",
          secondary: "#1885F3",
          accent: "#00BFAE",
          error: "#FF5252",
          info: "#FFC542",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
        fonts: {
          body: "Poppins, sans-serif",
          headline: "Poppins, sans-serif",
        },
      },
    },
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount("#app");
