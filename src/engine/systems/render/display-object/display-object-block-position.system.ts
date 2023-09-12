import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectBlockPositionSystem: SystemFunction<
  Component
> = async () => {
  const onAdd = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);
    const { vector3d } = entity.getComponent(
      Component.DISPLAY_OBJECT_BLOCK_POSITION,
    );
    if (!vector3d) return;

    const isometricVector3d = Utils.vector.block.getVector3dFromBlockVector3d(
      vector3d,
    );
    await entity.updateComponent(Component.DISPLAY_OBJECT_ISOMETRIC_POSITION, {
      vector3d: isometricVector3d,
    });
  };

  const onUpdate = (id: number) => onAdd(id);

  return {
    components: [
      Component.DISPLAY_OBJECT,
      Component.DISPLAY_OBJECT_BLOCK_POSITION,
    ],
    onAdd,
    onUpdate,
  };
};
