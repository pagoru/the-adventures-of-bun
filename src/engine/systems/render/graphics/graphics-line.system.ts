import { SystemFunction } from "libs/darker-engine";
import * as PIXI from "libs/pixi.mjs";
import { Utils } from "utils";
import { Component, Engine } from "engine";

export const graphicsLineSystem: SystemFunction<Component> = async () => {
  const onAdd = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { childOf } = entity.getComponent(Component.DISPLAY_OBJECT);
    const { color } = entity.getComponent(Component.GRAPHICS);
    const { width, startPoint, endPoint } = entity.getComponent(
      Component.GRAPHICS_LINE,
    );

    const parentContainer = Utils.render.getContainer(childOf);

    const graphics = new PIXI.Graphics()
      .lineStyle(width, color)
      .moveTo(startPoint.x, startPoint.y)
      .lineTo(endPoint.x, endPoint.y);

    graphics.name = Utils.render.getDisplayObjectName(id);

    parentContainer.addChild(graphics);
  };

  return {
    components: [
      Component.DISPLAY_OBJECT,
      Component.GRAPHICS,
      Component.GRAPHICS_LINE,
    ],
    onAdd,
  };
};
