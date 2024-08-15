import type { Config } from "tailwindcss";
// We want each package to be responsible for its own content.
const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [require('@repo/tailwind-config')],
};
export default config;
