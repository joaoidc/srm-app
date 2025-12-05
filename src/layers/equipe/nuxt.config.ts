import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  hooks: {
    "pages:extend"(pages) {
      pages.push({
        name: "equipe",
        path: "/equipe",
        file: resolve(currentDir, "pages/index.vue"),
      });
    },
  },
});
