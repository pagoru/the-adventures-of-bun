import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectIsometricPivotSystem: SystemFunction<
  Component
> = async () => {
  const onAdd = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { vector3d } = entity.getComponent(
      Component.DISPLAY_OBJECT_ISOMETRIC_PIVOT,
    );
    if (!vector3d) return;

    const vector2d = Utils.vector.isometric.getVector2dFromVector3d(vector3d);
    await entity.updateComponent(Component.DISPLAY_OBJECT_PIVOT, { vector2d });
  };

  const onUpdate = (id: number) => onAdd(id);

  return {
    components: [
      Component.DISPLAY_OBJECT,
      Component.DISPLAY_OBJECT_ISOMETRIC_PIVOT,
    ],
    onAdd,
    onUpdate,
  };
};
