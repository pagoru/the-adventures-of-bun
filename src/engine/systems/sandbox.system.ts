import { SystemFunction } from "libs/darker-engine";
import { Component } from "engine/components";
import { Engine } from "engine/main";
import { chunkEntity, containerEntity, Entity } from "engine/entities";

export const sandboxSystem: SystemFunction<Component> = async () => {
  const onLoad = async () => {
    const [stage] = Engine.getEntityListByType(Entity.STAGE);

    const [gameContainer] = await Engine.addEntity(containerEntity({
      childOf: stage.id,
    }));
    await gameContainer.updateComponent(Component.DISPLAY_OBJECT_ZINDEX, {
      zIndex: 10,
    });

    await Engine.addEntity(
      chunkEntity({
        childOf: gameContainer.id,
        vector3d: {
          x: 0,
          y: 0,
          z: 0,
        },
      }),
      chunkEntity({
        childOf: gameContainer.id,
        vector3d: {
          x: 1,
          y: 0,
          z: 1,
        },
      }),
    );
  };

  return {
    components: [],
    onLoad,
  };
};
