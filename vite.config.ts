import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";

const myPlugin = (): Plugin => ({
  name: "my-plugin",

  transform: (code, id) => {
    if (id.endsWith(".sample.js")) {
      let result = "";

      [...Array(100).keys()].forEach((i) => (result += `console.log(${i});`));

      result += code;

      return { code: result };
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), myPlugin()],
});
