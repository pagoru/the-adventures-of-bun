import { SystemFunction } from "libs/darker-engine";
import { Component } from "engine";

export const _templateSystem: SystemFunction<Component> = async () => {
  const onAdd = async (entityId: number) => {};

  return {
    components: [],
    onAdd,
  };
};
