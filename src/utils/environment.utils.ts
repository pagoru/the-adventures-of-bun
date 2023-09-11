import { Environment } from "libs/enums";

export const environmentUtils = () => {
  //@ts-ignore
  const get = (environment: Environment): string => window.__env__[environment];

  return {
    get,
  };
};
