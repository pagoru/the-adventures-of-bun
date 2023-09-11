import { SystemFunction } from "libs/darker-engine";
import * as PIXI from "libs/pixi.mjs";
import { Utils } from "utils";
import { Component, Engine } from "engine";

export const graphicsPolygonSystem: SystemFunction<Component> = async () => {
  const onAdd = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);
    const { childOf } = entity.getComponent(Component.DISPLAY_OBJECT);
    const { color } = entity.getComponent(Component.GRAPHICS);
    const { polygon } = entity.getComponent(Component.GRAPHICS_POLYGON);

    const name = Utils.render.getDisplayObjectName(entityId);
    const parentContainer = Utils.render.getContainer(childOf);

    const graphics = (parentContainer.getChildByName(name) as PIXI.Graphics) ||
      new PIXI.Graphics();
    graphics.clear();
    graphics.beginFill(color).drawPolygon(polygon).endFill();
    graphics.name = name;

    parentContainer.addChild(graphics);
  };

  const onUpdate = async (entityId: number, component: Component) => {
    if (component !== Component.GRAPHICS_POLYGON) return;
    await onAdd(entityId);
  };

  return {
    components: [
      Component.DISPLAY_OBJECT,
      Component.GRAPHICS,
      Component.GRAPHICS_POLYGON,
    ],
    onAdd,
    onUpdate,
  };
};
