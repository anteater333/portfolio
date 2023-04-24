import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testEnvironmentOptions: { browsers: ["chrome", "firefox", "safari"] },
  moduleNameMapper: {
    "\\.(css|less|svg)$": "identity-obj-proxy",
    "\\.(png|svg|pdf|jpg|jpeg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
export default config;
