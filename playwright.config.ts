import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: "http://127.0.0.1:3456",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run build && npm run start -- -p 3456",
    url: "http://127.0.0.1:3456",
    reuseExistingServer: false,
    timeout: 180000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
