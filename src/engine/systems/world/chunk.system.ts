import { SystemFunction } from "libs/darker-engine";
import { blockEntity, Component, Engine } from "engine";
import { Utils } from "utils";
import { CHUNK_SIZE } from "libs/consts";
import { Block } from "libs/enums";

export const chunkSystem: SystemFunction<Component> = async () => {
  const onAdd = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);
    const { vector2d } = entity.getComponent(
      Component.DISPLAY_OBJECT_CHUNK_POSITION,
    );

    const chunkName = `${vector2d.x}_${vector2d.y}`;

    const data = await fetch(`/assets/map/${chunkName}.chunk`).then((data) =>
      data.text()
    );

    const lineData = data.replace('\r', '').split("\n");
    const chunkData = Utils.array.getNew(lineData.length / (CHUNK_SIZE + 1))
      .map((y) =>
        Utils.array.transpose(Utils.array.getNew(CHUNK_SIZE).map((z) =>
          lineData[(y * (CHUNK_SIZE + 1)) + z + 1].split(",").map((num) =>
            parseInt(num)
          )
        ))
      );

    const blockList = [];
    for (let y = 0; y < 8; y++) {
      const yData = chunkData[y];
      if (!yData) continue;

      for (let z = 0; z < 8; z++) {
        const zData = yData[z];
        if (!zData) continue;

        for (let x = 0; x < 8; x++) {
          const currentBlockType = zData[x];
          if (currentBlockType === undefined || !Block[currentBlockType]) continue;

          blockList.push(blockEntity({
            childOf: entityId,
            type: currentBlockType as Block,
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
