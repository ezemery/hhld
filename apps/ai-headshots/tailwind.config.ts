import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
// We want each package to be responsible for its own content.
const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [sharedConfig],
};
export default config;
