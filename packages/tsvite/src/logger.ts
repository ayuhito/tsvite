import colors from "picocolors";

export type LogType = "error" | "warn" | "info";
export type LogLevel = LogType | "silent";
export interface Logger {
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
}

export const createLogger = (logLevel: LogLevel) => {
  if (logLevel === "silent") return {};
  const logger: Logger = {
    info(msg) {
      console.log(colors.bold(msg));
    },
    warn(msg) {
      console.warn(colors.bold(msg));
    },
    error(msg) {
      console.error(colors.bold(msg));
    },
  };

  return logger;
};
