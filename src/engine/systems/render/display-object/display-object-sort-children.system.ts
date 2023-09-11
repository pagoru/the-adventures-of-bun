import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectSortChildrenSystem: SystemFunction<
  Component
> = async () => {
  const onAdd = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { sortChildren } = entity.getComponent(
      Component.DISPLAY_OBJECT_SORT_CHILDREN,
    );
    if (sortChildren === undefined) return;

    const currentDisplayObject = Utils.render.getContainer(id);
    currentDisplayObject.sortableChildren = sortChildren;
  };

  const onUpdate = (id: number) => onAdd(id);

  return {
    components: [
      Component.DISPLAY_OBJECT,
      Component.DISPLAY_OBJECT_SORT_CHILDREN,
    ],
    onAdd,
    onUpdate,
  };
};
