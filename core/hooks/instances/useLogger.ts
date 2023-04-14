import { Logger } from "lib/core";

export const useLogger = (name: string) => new Logger(name);
