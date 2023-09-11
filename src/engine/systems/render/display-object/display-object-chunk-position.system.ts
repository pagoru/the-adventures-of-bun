import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectChunkPositionSystem: SystemFunction<
  Component
> = async () => {
  const onAdd = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);
    const { vector3d } = entity.getComponent(
      Component.DISPLAY_OBJECT_ISOMETRIC_POSITION,
    );
    if (!vector3d) return;

    const vector2d = Utils.vector.isometric.getVector2dFromVector3d(vector3d);
    await entity.updateComponent(Component.DISPLAY_OBJECT_POSITION, {
      vector2d,
    });

    await entity.updateComponent(Component.DISPLAY_OBJECT_ZINDEX, {
      zIndex: Utils.vector.isometric.getZIndex(vector3d),
    });
  };

  const onUpdate = (id: number) => onAdd(id);

  return {
    components: [
      Component.DISPLAY_OBJECT,
      Component.DISPLAY_OBJECT_ISOMETRIC_POSITION,
    ],
    onAdd,
    onUpdate,
  };
};
