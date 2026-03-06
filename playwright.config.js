import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["list"],
  ],

  use: {
    baseURL: "http://localhost:5173/PunkSchoolYPSA/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    // Give animated scenes time to settle
    actionTimeout: 10_000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Dev server auto-start during test runs */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173/PunkSchoolYPSA/",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },

  /* Snapshot directory */
  snapshotDir: "./tests/snapshots",
  snapshotPathTemplate: "{snapshotDir}/{testFilePath}/{arg}{ext}",
});
