import type { Config } from "tailwindcss";

export default {
  content: ["./resources/js/**/*.tsx", "./resources/css/**/*.css"],

  theme: {
    extend: {
      colors: {
        primary: "#0d6efd",
        secondary: "#6c757d",
        accent: "#f59e42",
        danger: "#dc3545",
        success: "#198754",
        warning: "#ffc107",
        info: "#0dcaf0",
        muted: "#f8f9fa",
      },
    },
  },
  plugins: [],
} as Config;
