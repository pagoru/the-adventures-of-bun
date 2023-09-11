import { SystemFunction } from "libs/darker-engine";
import { Component } from "engine/components";

export const sandboxSystem: SystemFunction<Component> = async () => {
  const onLoad = async () => {};

  return {
    components: [],
    onLoad,
  };
};
