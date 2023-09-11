import { SystemFunction } from "libs/darker-engine";
import * as PIXI from "libs/pixi.mjs";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const containerSystem: SystemFunction<Component> = async () => {
  const onAdd = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { childOf } = entity.getComponent(Component.DISPLAY_OBJECT);

    const parentContainer = Utils.render.getContainer(childOf);

    const container = new PIXI.Container();
    container.name = Utils.render.getDisplayObjectName(id);

    parentContainer.addChild(container);
  };

  return {
    components: [Component.DISPLAY_OBJECT, Component.CONTAINER],
    onAdd,
  };
};
