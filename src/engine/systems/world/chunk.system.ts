import { SystemFunction } from "libs/darker-engine";
import { blockEntity, Component, Engine } from "engine";
import { Block } from "libs/enums";

export const chunkSystem: SystemFunction<Component> = async () => {
  const onAdd = async (entityId: number) => {
    const blockList = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        for (let z = 0; z < 8; z++) {
          blockList.push(blockEntity({
            childOf: entityId,
            type: Block.DIRT,
            vector3d: {
              x: x,
              y: (y * 4),
              z: z,
            },
          }));
        }
      }
    }
    await Engine.addEntity(
      ...blockList,
    );
  };

  return {
    components: [
      Component.DISPLAY_OBJECT,
      Component.PARTICLE_CONTAINER,
      Component.CHUNK,
      Component.DISPLAY_OBJECT_CHUNK_POSITION,
    ],
    onAdd,
  };
};
