import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectChunkPositionSystem: SystemFunction<
  Component
> = async () => {
  const onAdd = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);
    const { vector2d } = entity.getComponent(
      Component.DISPLAY_OBJECT_CHUNK_POSITION,
    );
    if (!vector2d) return;

    const isometricVector3d = Utils.vector.chunk.getVector3dFromChunkVector2d(
      vector2d,
    );
    await entity.updateComponent(Component.DISPLAY_OBJECT_ISOMETRIC_POSITION, {
      vector3d: isometricVector3d,
    });
  };

  const onUpdate = (id: number) => onAdd(id);

  return {
    components: [
      Component.DISPLAY_OBJECT,
      Component.DISPLAY_OBJECT_CHUNK_POSITION,
    ],
    onAdd,
    onUpdate,
  };
};
