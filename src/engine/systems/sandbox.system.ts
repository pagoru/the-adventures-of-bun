import { SystemFunction } from "libs/darker-engine";
import { Component } from "engine/components";
import { Engine } from "engine/main";
import { Entity, textEntity } from "engine/entities";

export const sandboxSystem: SystemFunction<Component> = async () => {
  const onLoad = async () => {
    const [stage] = Engine.getEntityListByType(Entity.STAGE);

    const [text, text2] = await Engine.addEntity(
      textEntity({
        childOf: stage.id,
        color: [0xFF00FF, 1],
        text: "abcdefghijklmnopqrstuvwxyz0123456789",
      }),
      textEntity({
        childOf: stage.id,
        text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      }),
    );
    await text.updateComponent(Component.DISPLAY_OBJECT_POSITION, {
      vector2d: {
        x: -100,
        y: 0,
      },
    });
    await text2.updateComponent(Component.DISPLAY_OBJECT_POSITION, {
      vector2d: {
        x: -100,
        y: 10,
      },
    });
  };

  return {
    components: [],
    onLoad,
  };
};
