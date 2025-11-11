export const STREAM_API_KEY = "nrkm9yx3hw4c";

export const STREAM_OPTIONS = {
  timeout: 6000,
  logger: (logLevel: string, message: string, extraData?: Record<string, unknown>) => {
    if (logLevel === "error" || logLevel === "warn") {
      console[logLevel]("[Stream]", message, extraData);
    }
  },
};
