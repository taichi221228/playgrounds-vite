import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";

const basic = (): Plugin => ({
  name: "basic",

  transform: (code, id) => {
    if (id.endsWith(".sample.js")) {
      let result = "";

      [...Array(100).keys()].forEach((i) => (result += `console.log(${i});`));

      result += code;

      return { code: result };
    }
  },
});

const virtualModule = (): Plugin => {
  const ID = "virtual:module";

  return {
    name: "virtual-module",

    resolveId: (id) => {
      if (id === ID) return ID;
    },

    load: (id) => {
      if (id === ID) return "export const message = \"Hello virtual module!\"";
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), basic()],
});
