import { SystemFunction } from "libs/darker-engine";
import * as PIXI from "libs/pixi.mjs";
import { Utils } from "utils";
import { Component, Engine } from "engine";
import { System } from "system";

export const spriteSystem: SystemFunction<Component> = async () => {
  const onAdd = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { childOf } = entity.getComponent(Component.DISPLAY_OBJECT);
    const spriteComponent = entity.getComponent(Component.SPRITE);

    const parentContainer = Utils.render.getContainer(childOf);

    const texture = (
      await System.render.spritesheet.get(spriteComponent.spriteSheet)
    ).textures[spriteComponent.texture];
    const sprite = new PIXI.Sprite(texture);
    sprite.name = Utils.render.getDisplayObjectName(id);

    parentContainer.addChild(sprite);

    const { width, height } = sprite.getBounds();
    await entity.updateComponent(Component.DISPLAY_OBJECT_BOUNDS, {
      bounds: {
        width,
        height,
      },
    });
  };

  return {
    components: [Component.DISPLAY_OBJECT, Component.SPRITE],
    onAdd,
  };
};
